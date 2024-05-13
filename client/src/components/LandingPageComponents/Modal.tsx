import ReactModal from "react-modal"
import { useContext, useEffect } from "react"
import ModalContext from "../../Context/ModatContext"
import sync from "../../assets/sync.svg"
import { Formik, ErrorMessage, Field, Form } from "formik"
import * as Yup from "yup"
import PrimaryButton from "../Button"
import MailchimpSubscribe from "react-mailchimp-subscribe";


const Modal = () => {
    const values = useContext(ModalContext)

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
            onSubmit={async (values) => {
                const validate = {
                    EMAIL : values.email
                }
            }}
            
            >
                <Form className="w-full pt-4">
                <div className="flex flex-col lg:flex-row items-center gap-[18px]">
                    <div className="w-[70%]">

                    <Field className="p-4 w-[100%]" name="email" placeholder="Enter your email address" type="email" />
                    <ErrorMessage name="email">
                        {msg => <div className="text-red-400 italic text-sm py-3">{msg}</div>}
                    </ErrorMessage>
                    </div>
                    <PrimaryButton text="Join the Waitlist"/>
                </div>
                </Form>

            </Formik>


            
        </div>
    </ReactModal>
  </div>
    

  )
}

export default Modal


const Formy = ({status, message, subscribe })=>{
    useEffect(()=>{
        console.log(status)
        console.log(message)
    },[status, message])
    return(<>
    
            {
                status == "sending" && (
                    <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
            </div>
                )
            }
            {
                status == "error" && (
                    <div 
            className="error"
            dangerouslySetInnerHTML={{ __html: message }}
          />
                )
            }
                       
    </>)
}
