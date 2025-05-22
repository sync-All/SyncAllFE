const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Flutterwave = require("flutterwave-node-v3");
const { BadRequestError } = require("../../utils/CustomError");
const SyncUser = require('../../models/usermodel').syncUser
require("dotenv").config();

router.post(
  "/transaction_status",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asyncHandler(async (req, res, next) => {
    const flw = new Flutterwave(process.env.FLW_PK, process.env.FLW_SK);
    const { trxref } = req.body;
    flw.Transaction.verify({ id: trxref })
      .then((response) => {
        if (response.data.status === "successful") {
          console.log({ response });
          res.status(200).send({ success: true });
        } else {
          res.status(422).send({ success: false, message: "unsuccessful" });
        }
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestError("Looks Like Something went wrong");
      });
  })
);

router.post(`/fl_webhook`,async (req,res,next)=>{
  try {
    const secretHash = process.env.FLW_SH;
    const signature = req.headers["verif-hash"];
    if (!signature || (signature !== secretHash)) {
      res.status(401).end()
    }
    const payload = req.body;
    // {
    //   id: 9046694,
    //   txRef: 'tx_ref_1746106549876',
    //   flwRef: 'FLW-MOCK-a2e2a2a7f17dfe03aa766658e4862476',
    //   orderRef: 'URF_1746106585265_6535835',
    //   paymentPlan: 68767,
    //   paymentPage: null,
    //   createdAt: '2025-05-01T13:36:25.000Z',
    //   amount: 20,
    //   charged_amount: 20,
    //   status: 'successful',
    //   IP: '54.75.161.64',
    //   currency: 'USD',
    //   appfee: 0.76,
    //   merchantfee: 0,
    //   merchantbearsfee: 1,
    //   charge_type: 'normal',
    //   customer: {
    //     id: 3068591,
    //     phone: 'N/A',
    //     fullName: 'deee ',
    //     customertoken: null,
    //     email: 'olabisi200023@gmail.com',
    //     createdAt: '2025-05-01T13:08:34.000Z',       
    //     updatedAt: '2025-05-01T13:08:34.000Z',       
    //     deletedAt: null,
    //     AccountId: 2537141
    //   },
    //   entity: {
    //     card6: '553188',
    //     card_last4: '2950',
    //     card_country_iso: 'NG',
    //     createdAt: '2020-04-24T15:19:22.000Z'        
    //   },
    //   'event.type': 'CARD_TRANSACTION'
    // }
    if(payload.status === 'successful'){
      const duplicate = await SyncUser.findOne({email : payload.customer.email}).where('prod_id').equals(payload.paymentPlan).exec()
      if(!duplicate){
        const charge_date = new Date(payload.createdAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        const next_billing_date = new Date(charge_date).setMonth(new Date(charge_date).getMonth() + 1)
        const formattedNext = new Date(next_billing_date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        await SyncUser.findOneAndUpdate({email : payload.customer.email},
          {$set : 
            {
              "billing.prod_id" : payload.paymentPlan,
              "billing.sub_id" : payload.txRef, 
              "billing.next_billing_date" : formattedNext, 
              "billing.last_charge_date" : charge_date,
              "billing.amount" : `$${payload.amount}`,
              "billing.last4card_digits" : payload.entity.card_last4 || "N/A"
            }
          }
        ).exec()
      }
    }else if(payload.data && payload.data.status === 'deactivated'){
      await SyncUser.findOneAndUpdate({email : payload.data.customer.email},{$set : {"billing.prod_id" : "free","billing.sub_id" : "", "billing.next_billing_date" : ""}}).exec()
    }
    console.log(payload);
    res.status(200).end()
  } catch (error) {
    console.log(error)
  }
  
})

// 6605476

// // to return every subscription

// {
//     id: 35326,
//     amount: 20,
//     customer: [Object],
//     plan: 68767,
//     status: 'active',
//     created_at: '2024-09-11T22:17:02.000Z'
//   },
//   {
//     id: 35325,
//     amount: 20,
//     customer: [Object],
//     plan: 68767,
//     status: 'active',
//     created_at: '2024-09-11T21:56:32.000Z'
//   },
//   {
//     id: 35324,
//     amount: 20,
//     customer: [Object],
//     plan: 68767,
//     status: 'active',
//     created_at: '2024-09-11T21:53:33.000Z'
//   },
//   {
//     id: 35323,
//     amount: 20,
//     customer: [Object],
//     plan: 68767,
//     status: 'active',
//     created_at: '2024-09-11T21:51:44.000Z'
//   }

module.exports = router;
