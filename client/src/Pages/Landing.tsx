import {Navbar} from "../components"
import { Authentic, PartnersPerks } from "../components/LandingPageComponents"

const Landing = () => {
  return (
    <div className="bg-black px-3 md:px-10 lg:px-14">
      <Navbar/>
      <Authentic/>
      <PartnersPerks />
    </div>
  )
}

export default Landing
