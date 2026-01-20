import HeroBanner from "../Components/HeroBanner"
import ContactUs from "../Components/ContactUs"
import Featured from "../Components/Featured"
import Statistics from "../Components/Statistics"
import Services from "../Components/Services"
import Testimonials from "../Components/Testimonials"
import FAQ from "../Components/FAQ"
import Newsletter from "../Components/Newsletter"
import CallToAction from "../Components/CallToAction"
import HowItWorks from "../Components/HowItWorks"
import BloodTypes from "../Components/BloodTypes"
import RecentRequests from "../Components/RecentRequests"

const Home = () => {
  return (
    <div>
      <title>Hemio - Save Lives Through Blood Donation</title>
      <HeroBanner/>
      <Statistics/>
      <Services/>
      <HowItWorks/>
      <Featured/>
      <BloodTypes/>
      <RecentRequests/>
      <Testimonials/>
      <FAQ/>
      <CallToAction/>
      <Newsletter/>
      <ContactUs/>
    </div>
  )
}

export default Home