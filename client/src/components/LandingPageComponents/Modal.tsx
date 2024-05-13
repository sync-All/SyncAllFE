import ReactModal from "react-modal"
import { useContext, useState } from "react"
import ModalContext from "../../Context/ModatContext"
import sync from "../../assets/sync.svg"
import { Formik, ErrorMessage, Field, Form } from "formik"
import * as Yup from "yup"
import PrimaryButton from "../Button"
import axios from "axios";
import checkMark from "../../assets/Verified Check.svg"


const Modal = () => {
    const values = useContext(ModalContext)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const mediaMatch = window.matchMedia('(min-width: 1024px)');
    ReactModal.setAppElement('#root');
   
  return (<div>
    <ReactModal
    isOpen={values.modalIsOpen}
    onRequestClose={values.closeModal}
    style={{
        content :{
            width : '80%',
            // maxWidth : '760px',
            padding: mediaMatch.matches ? 'clamp(90px,7.803vw,102px) clamp(150px,12.7vw,183px)' : '25px 10px'  ,
            marginTop : 'auto',
            marginLeft : 'auto',
            marginRight : 'auto',
            marginBottom : 'auto',
            height : 'fit-content',
            borderRadius : '15px',
            backgroundColor : '#FFF8E7',
            zIndex : 300

        },
        overlay:{
            zIndex : 300,
            backgroundColor : "rgba(0,0,0,0.5)"
        }
    }}
    >
       {
        !success ? (<>
         <div className="flex justify-center">
            <img src={sync} alt="" />
        </div>

        <div className="flex flex-col items-center text-center">
            <h1 className="font-gitSans leading-[65px] md:leading-[90px] lg:leading-[120px] text-[#013131] font-normal text-3xl md:text-5xl lg:text-[clamp(70px,5.5vw,80px)]">
                Join the Syncall Waitlist
            </h1>
            <p className="font-Utile-light lg:leading-10 text-base md:text-lg lg:text-[32px] text-[#000]">
            Get ready to unlock the power of African music synchronization! Join our waitlist to gain early access to our platform and be part of a community that celebrates creativity, authenticity, and fair play. Don't miss out – sign up now!
            </p>
            <Formik
                initialValues={{email : ""}}
                validationSchema={Yup.object({
                    email : Yup.string().email("Please ensure to input a valid email").required("Field is required")
                })}
                onSubmit={async (values,{resetForm}) => {
                    setLoading(true)
                    await axios.post("https://syncallfe.onrender.com/api/waitlist",{
                        email : values.email
                    })
                    .then(result =>{
                        if(result.data.success){
                            setSuccess(true)
                            resetForm()
                        }else{
                            setSuccess(false)
                            setErrorMsg(result.data.error)
                        }
                    }
                    )
                    setLoading(false)
                }}
                
                >
                    <Form className="w-full pt-4">
                    <div className="flex flex-col lg:flex-row items-center  gap-[18px]">
                        <div className="w-[70%]">
    
                        <Field className="p-4 w-[100%] outline-yellow" name="email" placeholder="Enter your email address" type="email" />
                        </div>
                        <PrimaryButton text="Join the Waitlist" disabled={loading}/>
                    </div>
                    <ErrorMessage name="email">
                            {msg => <div className="text-red-400 italic text-sm py-3">{msg}</div>}
                    </ErrorMessage>
                    <h1 className="text-red-400 italic text-sm py-3">
                    {errorMsg}
                    </h1>
                    
                    {
                        loading && <div role="status" className="flex justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    }
    
                    </Form>
    
                </Formik> 
        </div>
        </>) : (<div className="flex flex-col items-center gap-6">
        <div>
            <img src={checkMark} alt="" />
        </div>
        <h3 className="text-center text-2xl md:text-4xl lg:leading-[56px] lg:text-[56px] text-[#013131] font-Utile-bold">
        You’ve been added <br /> to the waitlist
        </h3>
        <PrimaryButton text="Back to Home" onClick={values.closeModal}/> 
        </div>)
       }
    </ReactModal>
  </div>
    

  )
}

export default Modal


