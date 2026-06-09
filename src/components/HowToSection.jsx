import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'

const HowToSection = () => {
    const sectionRef = useRef(null);

    useGSAP

  return (
    <section ref={sectionRef} className='h-screen w-screen bg-black text-white'>
        <h1 id="title">1. Got a suspicious Post?</h1>
        <img id="Xwindow"/>
        <div id="keys">

        </div>
        <div id="rectangle">

        </div>
        <img id="Loading"/>
        <img id="Verdict"/>
    </section>
  )
}

export default HowToSection