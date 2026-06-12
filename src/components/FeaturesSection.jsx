import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagicBento from './MagicBento'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const FeaturesSection = () => {
  const sectionRef = useRef(null)

    useGSAP(()=>{
      const tl = gsap.timeline({
        scrollTrigger:{
          trigger: ".FeatureHead",
          start: 'top 70%',
        }
      })
      tl.from(".FeatureHead",{
        opacity:0,
        yPercent: 50,
        ease: 'power1.inOut',
        duration: 1,
      })
      tl.from(".FeatureBody",{
        opacity:0,
        yPercent: 50,
        ease: 'power1.inOut',
        duration: 1,
      },"-=0.3")
  

      tl.fromTo(
        '.animate-item',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 1,
        }
      )
    },"-=0.3")

  return (
    <div
      id="Features"
      ref={sectionRef}
      className="bg-transparent relative w-screen flex flex-col gap-12 justify-center items-center text-white mt-20"
    > 
      <div className='realtive z-30 sm:h-32 sm:gap-2 md:h-48 lg: h-96  border-y-2 border-cyan-500 gap-4 w-screen bg-black flex flex-col justify-center items-center'>
          <h2 className="FeatureHead text-2xl md:text-4xl lg:text-6xl font-heading text-white">
            Why Reality Lens?
          </h2>
          <p className='FeatureBody font-body md:text-md lg:text-lg text-cyan-400'>Explore Features</p>
      </div>
      <img className=" absolute z-0 sm:w-[200vw] top-8  md:w-screen opacity-10 overflow-x-hidden" src="./images/FeaturesGrad.png"/>
      

      <div className="animate-item">
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={32}
          glowColor="0, 255, 255"
          disableAnimations={false}
        />
      </div>
    </div>
  )
}

export default FeaturesSection