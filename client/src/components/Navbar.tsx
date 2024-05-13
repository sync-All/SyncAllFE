import { useContext } from "react"
import syncLogo from "../assets/logo.svg"
import {PrimaryButton} from "../components"
import ModalContext from "../Context/ModatContext"
const Navbar = () => {
  const values = useContext(ModalContext)
  return (
    <div className=" flex justify-between items-center py-4 px-3 md:px-10 lg:px-14" >
      <div>
        <img src={syncLogo} alt="" />
      </div>
      <div>
        <PrimaryButton text="Join the waitlist" onClick={values?.openModal} />
      </div>
    </div>
  )
}

export default Navbar
