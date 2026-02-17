import Navbar from '@/components/partials/Navbar'
import Hero from '@/components/landing/Hero'
import MovieGrid from '@/components/landing/MovieGrid'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MovieGrid />
    </main>
  )
}

export default page
