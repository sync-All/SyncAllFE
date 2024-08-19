import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Payment = () => {
    const {prodId} = useParams()
    const token = localStorage.getItem('token')
    useEffect(()=>{
      const fetchInitialStripeInfo = async()=>{
        const response = await axios.get(`http://localhost:3000/api/v1/create-subcription/?prodId=${prodId}`,{
          headers : {
            Authorization : token
          }
        })

        console.log(response)
      }

      fetchInitialStripeInfo()

    },[prodId,token])
  return (
    <div>
      Got here successfully
    </div>
  )
}

export default Payment
