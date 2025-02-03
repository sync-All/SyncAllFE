import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { customerSaid } from "../../constants";
// import PrimaryButton from "../Button";
// import { useContext } from "react";
// import ModalContext from "../../Context/ModatContext";


const Customers = () => {
  // const values = useContext(ModalContext)
  return (
    <div className="px-3 md:px-10 lg:px-14 py-12 md:py-20 lg:py-32">
      <div className="bg-black2 px-6 py-9 md:px-20 md:py-14 
            lg:px-[clamp(170px,13.6vw,196px)]  lg:py-[84px] rounded-xl lg:rounded-[20px]">
            <h2 className="text-grey-100 font-gitSans text-3xl md:text-5xl 
                lg:text-[clamp(56px,4.44vw,64px)] pb-10 md:pb-14 lg:pb-20">
                What customers say
            </h2>
            <div className="flex">
                <h4 className="text-[#999896] font-Utile-medium drop-shadow-sm text-xs mt-10 mr-5 lg:mr-20 cursor-pointer prev">
                    Previous
                </h4>
                    <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                    }}
                    >
                       {
                        customerSaid.map(saying =>(
                            <SwiperSlide className="text-white">
                            <h1 className="drop-shadow-sm font-Utile-light text-sm md:text-base lg:text-[clamp(24px,2.5vw,36px)] lg:leading-10 prev ">
                            {saying.comment}
                            </h1>
                            {/* <p className="text-sm lg:text-base font-Utile-bold drop-shadow-sm pt-3 lg:pt-4 pb-1">
                            {saying.author}
                            </p>
                            <p className="text-sm font-Utile-light drop-shadow-sm">
                            {saying.position}
                            </p> */}
                        </SwiperSlide>
                        ))
                       }
                    </Swiper>
                    <h4 className="text-[#999896] font-Utile-medium drop-shadow-sm text-xs mt-10 ml-5 lg:ml-20 cursor-pointer next"> Next</h4>
            </div>
      </div>
      <div className="bg-syncbg mt-5 bg-[#161616]  px-6 py-9 md:px-20 md:py-14 lg:px-[clamp(170px,13.6vw,196px)]  lg:py-[84px] rounded-xl lg:rounded-[20px] lg:flex items-center gap-28">
      <h2 className="text-grey-100 font-gitSans text-3xl md:text-5xl 
                lg:text-[clamp(56px,4.44vw,64px)] pb-10 md:pb-14 lg:pb-0">
                Stop settling for generic, <br /> Embrace the authentic.
        </h2>

        {/* <PrimaryButton text="Join the waitlist" onClick={values.openModal}/> */}
      </div>
    </div>
  )
}

export default Customers
