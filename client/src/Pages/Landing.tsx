import {Footer, Navbar} from "../components"
import { Authentic, PartnersPerks, Customers, Play, Modal, SearchMusic } from "../components/LandingPageComponents"
import  { ModalProvider } from "../Context/ModatContext"

const Landing = () => {

  
  return (
    <div className="bg-black ">
      <ModalProvider>
      <Navbar />
      <Authentic/>
      <Play/>
      <PartnersPerks />
      <SearchMusic/>
      <Customers/>
      <Footer/>
      <Modal />
      </ModalProvider>
    </div>
  )
}

export default Landing
