import React from 'react'
import Eye from './Eye'
import Posts from './Posts';

const EyeSection = () => {

    const emotion = "angry";

  return (
    <div className='h-screen w-screen bg-black flex align-center justify-center'>
        <div>
            <Posts/>
        </div>
        {/* <div className='flex items-center gap-2'>
            <Eye side="right" emotion={emotion}/>
            <Eye side="left" emotion={emotion}/>

        </div> */}
    </div>
  )
}

export default EyeSection