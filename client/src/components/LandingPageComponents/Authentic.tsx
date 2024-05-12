import {PrimaryButton} from "../../components"

const Authentic = () => {
  return (
    <div className="py-12 md:py-16 lg:py-[109px] flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-7xl lg:text-[clamp(90px,8.225vw,120px)] text-grey-100 text-center font-gitSans lg:leading-[100%] pb-8 md:pb-11 lg:pb-16 font-normal ">
      Authentic african music,<br />effortless licensing.
      </h1>
      <PrimaryButton text="Join the waitlist" />
    </div>
  )
}

export default Authentic
