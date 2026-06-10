import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagicBento from './MagicBento'

gsap.registerPlugin(ScrollTrigger)

const FeaturesSection = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="bg-transparent relative w-screen flex flex-col gap-12 justify-center items-center text-white"
    >
      <img className="absolute sm:w-[200vw] -top-24 md:w-screen opacity-30 overflow-x-hidden" src="./images/FeaturesGrad.png"/>
      <h2 className="animate-item mt-24 text-2xl md:text-4xl lg:text-6xl font-heading">
        Why Reality Lens?
      </h2>

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