import {Footer, Navbar} from "../components"
import { Authentic,PartnersPerks, Customers, Play } from "../components/LandingPageComponents"

const Landing = () => {
  return (
    <div className="bg-black ">
      <Navbar/>
      <Authentic/>
      <Play/>
      <PartnersPerks />
      <Customers/>
      <Footer/>
    </div>
  )
}

export default Landing
