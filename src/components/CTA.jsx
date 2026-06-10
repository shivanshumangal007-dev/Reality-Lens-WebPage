import React from 'react'
import DarkVeil from './DarkVeilBG.jsx';

const CTA = () => {
  return (
    <div className='w-screen h-screen'>

        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <DarkVeil
        hueShift={40}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
        />
        </div>
    </div>
  )
}

export default CTA