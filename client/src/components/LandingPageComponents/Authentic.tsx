import {PrimaryButton} from "../../components"

const Authentic = () => {
  return (
    <div className="py-12 md:py-16 lg:py-[109px] flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-7xl lg:text-[clamp(90px,8.333vw,120px)] text-grey-100 text-center font-formular-medium lg:leading-[100%] pb-8 md:pb-11 lg:pb-16">
      Authentic african music, effortless licensing.
      </h1>
      <PrimaryButton text="Join the waitlist" />
    </div>
  )
}

export default Authentic
