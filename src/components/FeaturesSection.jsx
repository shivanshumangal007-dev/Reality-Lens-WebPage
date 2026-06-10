import React from 'react'
import MagicBento from './MagicBento'



const CardsSection = () => {
  return (
    <div className='bg-transparent h-screen w-screen text-white'>
        <MagicBento 
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
    </div>
  )
}

export default CardsSection
