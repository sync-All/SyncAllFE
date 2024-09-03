const { default: mongoose } = require("mongoose")
require('dotenv').config()

const mongoString = process.env.MONGO_CONNECT_STRING
const mongoTestString = process.env.MONGO_TEST_CONNECT_STRING

process.env.NODE_ENV = '';

async function main(){
    await mongoose.connect( process.env.NODE_ENV == 'test' ? mongoTestString :  mongoString)
}

beforeAll(async () => {
    await main().then(()=> console.log('Connected to Database'))
    .catch((err)=> console.log(err))
});

afterAll(async()=>{
    await mongoose.connection.close()
})




