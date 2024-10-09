const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const Flutterwave = require("flutterwave-node-v3");
const { BadRequestError } = require("../../utils/CustomError");
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
          // Inform the customer their payment was unsuccessful
        }
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestError("Looks Like Something went wrong");
      });
  })
);

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
