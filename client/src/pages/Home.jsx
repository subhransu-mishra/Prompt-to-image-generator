import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import HowWorks from '../components/HowWorks'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import Footer from '../components/footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <HowWorks />
      
      <Testimonials/>
      <Description/>
      <Footer/>
    </div>
  )
}

export default Home