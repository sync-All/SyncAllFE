import syncLogo from "../assets/logo.svg"
import {PrimaryButton} from "../components"
const Navbar = () => {
  return (
    <div className=" flex justify-between items-center py-4">
      <div>
        <img src={syncLogo} alt="" />
      </div>
      <div>
        <PrimaryButton text="Join the waitlist"/>
      </div>
    </div>
  )
}

export default Navbar
