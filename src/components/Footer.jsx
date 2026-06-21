import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";


const Footer = () => {        

  const [platform, setPlatform] = useState("windows(cloud)");

  const downloadLink =
    platform === "windows(cloud)"
      ? import.meta.env.VITE_DOWNLOAD_LINK_WINDOWS
      : platform === "mac"
        ? import.meta.env.VITE_DOWNLOAD_LINK_MAC
        : platform === "linux"
          ? import.meta.env.VITE_DOWNLOAD_LINK_LINUX
          : import.meta.env.VITE_DOWNLOAD_LINK_ANDROID;

  const handleDownload = () => {
    window.location.href = downloadLink;
  };


    return (
        <section className="py-10 text-white bg-gray-600/30 sm:pt-16 lg:pt-24 pointer-events-auto">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-4 lg:pr-8">
                <img className="sm:w-[40vw] md:w-[20vw] " src="./images/LogoFull.png" alt="" />

                <p className="text-base leading-relaxed text-white mt-7">Reality Lens verifies information against reliable sources to help you determine whether a claim is true, false, or misleading. </p>

                <ul className="flex items-center space-x-3 mt-9">
                   

                    <li>
                        <a href="https://github.com/hannuverma/RealityLens.git" target="_blank" rel="noopener noreferrer" title="" className="flex items-center gap-2 justify-center text-white transition-all duration-200 bg-cyan-800 rounded-full w-full h-full p-3 hover:bg-cyan-600 focus:bg-cyan-600">
                                <FaGithub size={20} />

                            <p className='font-body md:text-md lg:text-lg text-white'>GitHub Repository</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="" className="gap-2 flex items-center justify-center text-white transition-all duration-200 bg-cyan-800 rounded-full w-full h-full p-3 hover:bg-cyan-600 focus:bg-cyan-600">
                                <FaDownload size={18} />

                            <button 
                                onClick={handleDownload}
                                onMouseEnter={(e) => window.dispatchEvent(new CustomEvent('eye-hover', { detail: { element: e.currentTarget, emotion: 'happy' } }))}
                                onMouseLeave={() => window.dispatchEvent(new CustomEvent('eye-leave'))}
                            >
                                <p className='font-body md:text-md lg:text-lg text-white'>Download Now</p>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest  text-gray-400 uppercase">Quick Links</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base  transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Top </a>
                    </li>

                    <li>
                        <a href="#Features" title="" className="flex text-base transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Features </a>
                    </li>

                    <li>
                        <a 
                            href="#HowItWorks" 
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.querySelector('#HowItWorks');
                                if (element && window.lenis) {
                                    window.lenis.scrollTo(element, { offset: 400 });
                                } else {
                                    element?.scrollIntoView();
                                }
                            }}
                            title="" 
                            className="flex text-base  transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"
                        > 
                            How It Works 
                        </a>
                    </li>

                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Made with Love by : </p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="https://www.linkedin.com/in/shivanshu-mangal-8a601b378/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BrHSFpVKsTWKvPtA6GrdNJA%3D%3D" target="_blank" rel="noopener noreferrer" title="" className="flex text-base transition-all duration-200 hover:text-cyan-600  "> Shivanshu Mangal </a>
                    </li>

                    <li>
                        <a href="https://www.linkedin.com/in/hannu-verma-b6930b2b7/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BzYLjXisdRSCpzrQhxieaRQ%3D%3D" target="_blank" rel="noopener noreferrer" title="" className="flex text-base transition-all duration-200 hover:text-cyan-600 "> Hannu Verma </a>
                    </li>

                    <li>
                        <a href="https://www.linkedin.com/in/reyansh-bhardwaj-6b2b59384/overlay/contact-info/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B4CGl8xxwSp2wm%2BqjMyia6w%3D%3D" target="_blank" rel="noopener noreferrer" title="" className="flex text-base transition-all duration-200 hover:text-cyan-600 "> Reyansh Bhardwaj </a>
                    </li>

                    <li>
                        <a href="https://www.linkedin.com/in/shreyansh-kumar-1319ba381/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRJWq1uG0Qe6UQKVqqyKj4w%3D%3D" target="_blank" rel="noopener noreferrer" title="" className="flex text-base transition-all duration-200 hover:text-cyan-600 "> Shreyansh Kumar </a>
                    </li>
                </ul>
            </div>

            {/* <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>

                <form action="#" method="POST" className="mt-6">
                    <div>
                        <label for="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">Subscribe</button>
                </form>
            </div> */}
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-400">© 2026 RealityLens AI. All rights reserved.</p>
    </div>
</section>

    )
}
export default Footer;
