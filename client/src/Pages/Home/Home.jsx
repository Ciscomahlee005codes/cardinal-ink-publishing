import React from 'react'
import "./Home.css"
import Hero from '../../Components/Hero/Hero'
import ChooseUs from '../../Components/ChooseUs/ChooseUs'
import TrendingBooks from '../../Components/TrendingBooks/TrendingBooks'
import SecondHero from '../../Components/SecondHero/SecondHero'
import CTA from '../../Components/CTA/CTA'
import Testimonials from '../../Components/Testimonials/Testimonials'
import FAQ from '../../Components/FAQ/FAQ'

const Home = () => {
  return (
    <div>
      <Hero />
      <ChooseUs />
      <TrendingBooks />
      <SecondHero />
      <CTA />
      <Testimonials />
      <FAQ />
    </div>
  )
}

export default Home
