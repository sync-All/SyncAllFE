import {Footer, Navbar} from "../components"
import { Authentic, Customers, Play } from "../components/LandingPageComponents"

const Landing = () => {
  return (
    <div className="bg-black ">
      <Navbar/>
      <Authentic/>
      <Play/>
      <Customers/>
      <Footer/>
    </div>
  )
}

export default Landing
