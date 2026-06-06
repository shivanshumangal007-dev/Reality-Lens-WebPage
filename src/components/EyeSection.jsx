import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Eye from "./Eye";
import Posts from "./Posts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const EyeSection = () => {
    const [emotion, setEmotion] = useState("normal");
  const orbitRef = useRef(null);
  const containerRef = useRef(null);

    const hoverTimeout = useRef(); 
    
    useGSAP(()=>{
        const tl = gsap.timeline();

        tl.from("#posts",{
            opacity:0,
            duration:2,
            scale:2,
        })
    })

  const images = [
    "./images/Posts/fake/1.jpg",
    "./images/Posts/sus/1.jpg",
    "./images/Posts/fake/2.jpg",
    "./images/Posts/true/1.jpg",
    "./images/Posts/sus/2.jpg",
    "./images/Posts/sus/3.jpg",
    "./images/Posts/fake/3.jpg",
    "./images/Posts/true/2.jpg",
  ];


 const [radius, setRadius] = useState(0);

    useEffect(() => {
    const updateRadius = () => {
        setRadius(Math.min(window.innerWidth * 0.42, 500));
    };

    updateRadius(); // initial

    window.addEventListener("resize", updateRadius);

    return () =>
        window.removeEventListener("resize", updateRadius);
    }, []);

  useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        const posts = gsap.utils.toArray(".orbit-post");

        posts.forEach((post) => {
        const x = Number(post.dataset.x);
        const y = Number(post.dataset.y);

        gsap.from(post, {
            x: 2*x,
            y: 2*y,
            scale: 2,
            opacity: 0,
            rotation: 0,

            duration: 1,
            ease: "expo.out",
        });
        });

        gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 180,
        repeat: -1,
        ease: "none",
        });

        gsap.to(".orbit-post", {
        rotation: -360,
        duration: 180,
        repeat: -1,
        ease: "none",
        });
    }, containerRef);

    return () => ctx.revert();
    }, []);


  return (
    <div className="relative h-screen w-screen flex  justify-center ">


        <div className=" z-50 absolute top-[56%] flex flex-col justify-center items-center gap-4 ">
            <h1 id="headHero"
            className="text-xl md:text-3xl font-black leading-tight text-white text-center"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' , fontFamily:"Bricolage Grotesque" }}
            >
            Every Post tells a Story. Not every story tells <span className='text-cyan-300'>The Truth.</span></h1>
            <p id="paraHero"
            className="text-sm w-[50vw] md:text-lg text-white text-center"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,1)', fontFamily: "Sora" }}
            >
            RealityLens analyzes online content and assigns a <span className='text-cyan-300'>Reality Score, confidence rating, supporting evidence, and clear explanations</span>—helping you understand what can be trusted, what needs verification, and what may be misleading.
            </p>
        </div>

        <section 
        ref={containerRef} 
        className="relative h-screen w-screen overflow-hidden bg-black"
        >
            <img id="bg" src="/images/eyeSectionBG.jpg" className=" z-0 absolute inset-0 w-full h-full object-cover" alt="background Eye Sectio" />
            <img id="bg" src="/images/Gradients/EyeSection/top-left.png" className=" z-10 absolute inset-0 w-[26vw] h-[40vw] max-h-[36vw] object-cover pointer-events-none" alt="Gradient top-left" />
            <img id="bg" src="/images/Gradients/EyeSection/right-bot.png" className=" z-10 absolute w-[26vw] h-[40vw] max-h-[36vw] bottom-0 right-0 object-cover pointer-events-none" alt="Gradient bottom-right" />
            <img id="bg" src="/images/Gradients/EyeSection/center.png" className=" z-10 absolute w-screen h-screen  object-contain pointer-events-none" alt="Gradient bottom-right" />

            

        {/* Orbit Ring */}
        <div id="ring"
            className=" pointer-events-none z-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-800/60"
            style={{
                width: radius * 2,
                height: radius * 2,
            }}
        />

        {/* Orbiting Posts */}
        <div id="posts"
            ref={orbitRef}
            className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 opacity-30 md:opacity-50 lg:opacity-100"
            >
            {images.map((image, i) => {
                const angle = (360 / images.length) * i;
                const rad = (angle * Math.PI) / 180;

                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                const getEmotion = () => {
                    if (image.includes("/fake/")) return "angry";
                    if (image.includes("/sus/")) return "suspicious";
                    if (image.includes("/true/")) return "happy";
                    return "normal";
                };

                return (
                    <div
                    key={i}
                    className="orbit-post absolute hover:shadow-[0_0_32px_rgba(0,213,255,0.6)]
                    transition-all
                    duration-300"
                    data-x={x}
                    data-y={y}
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: "translate(-50%, -50%)",
                    }}
                        onMouseEnter={() => {
                            clearTimeout(hoverTimeout.current);
                            setEmotion(getEmotion());
                            }}
                        onMouseLeave={() => {
                            hoverTimeout.current = setTimeout(() => {
                                setEmotion("normal");
                            }, 150);
                        }}
                    >
                    <div className="post-content">
                        <Posts image={image} />
                    </div>
                    </div>
                );
                })}
    </div>

        <div
            className=" absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-20 flex"
            >
            
            {/* <Eye side="right" emotion={emotion} /> */}
            <Eye side="left" emotion={emotion} />
        </div>
        </section>
    </div>
  );
};

export default EyeSection;
