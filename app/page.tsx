import Navbar from '@/components/partials/Navbar'
import Hero from '@/components/landing/Hero'
import MovieGrid from '@/components/landing/MovieGrid'
import React from 'react'
import Footer from '@/components/partials/Footer'
import InitialMovieGrid from '@/components/landing/TopMoviegrid'
import VpnWarningBanner from '@/components/landing/Warning'
import UpcomingMovieGrid from '@/components/landing/UpcomingMoviesgrid'

const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <InitialMovieGrid/>
      <VpnWarningBanner/>
      <MovieGrid />
      <UpcomingMovieGrid/>
      <Footer/>
    </main>
  )
}

export default page
