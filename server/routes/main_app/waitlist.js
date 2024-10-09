const router = require('express').Router()
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

require('dotenv').config()

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });

  listId = process.env.LIST_ID 
  const subscribingUser = {
    email: "deemajor230600@gmail.com"
  };

  



  

router.post('/api/waitlist',(req,res,next)=> {
    const userEmail = req.body.email
    async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: userEmail,
                status: "subscribed",
              });

              if(response.id){
                res.json({success : "Successful"})
              }
        }catch(err){
            let errorMsg = err.response.text.split(",")[2].slice(10).split(". ")[0]
            res.json({error : errorMsg})
        }
        
      }
      
      run();
})

module.exports = router