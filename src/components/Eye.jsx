import { useEffect, useRef } from "react";
import gsap from "gsap";

const Eye = ({ side, emotion = "normal", isTorch = false, isOut = false }) => {
  const eyeRef = useRef(null);
  const irisRef = useRef(null);
  const pupilRef = useRef(null);
  const eyelidRef = useRef(null);

  const SIZE = 40;

  const IRIS_SIZE = SIZE * 0.6;
  const HIGHLIGHT_SIZE = SIZE * 0.1;
  const BORDER_WIDTH = SIZE * 0.025;
  const EYELID_HEIGHT = SIZE * 0.625;
  const EYELID_OVERFLOW = SIZE * 0.1;

  const states = {
    happy: {
      irisGradient:
        "radial-gradient(circle,#15803d 20%,#4ade80 50%,#15803d 80%,#14532d 90%)",
      pupilScale: 0.58,
      eyelidOffset: -SIZE * 0.62,
      eyelidFollow: 0,
      eyelidRotate: 0,
    },

    normal: {
      irisGradient:
        "radial-gradient(circle,#005E5E 20%,#02cece 50%,#005E5E 80%,#004343 90%)",
      pupilScale: 0.5,
      eyelidOffset: -SIZE * 0.44,
      eyelidFollow: 0,
      eyelidRotate: 0,
    },

    suspicious: {
      irisGradient:
        "radial-gradient(circle,#7A6500 20%,#FFD700 50%,#B8860B 80%,#7A6500 90%)",
      pupilScale: 0.42,
      eyelidOffset: -SIZE * 0.18,
      eyelidFollow: 1,
      eyelidRotate: 0,
    },

    angry: {
      irisGradient:
        "radial-gradient(circle,#5C0000 20%,#FF3B3B 50%,#8B0000 80%,#5C0000 90%)",
      pupilScale: 0.33,
      eyelidOffset: -SIZE * 0.18,
      eyelidFollow: 1,
      eyelidRotate: side === "left" ? -15 : 15,
    },
  };

  const config = states[emotion];

  useEffect(() => {
    const iris = irisRef.current;
    const pupil = pupilRef.current;

    if (!iris || !pupil) {
      console.log("Iris or pupil ref missing in setup");
      return;
    }

    iris.style.background = isTorch ? "radial-gradient(circle,#9d00ff 20%,#d08bff 50%,#590099 80%,#2d004d 90%)" : config.irisGradient;

    gsap.set(iris, { xPercent: -50, yPercent: -50 });
    gsap.set(pupil, {
      width: IRIS_SIZE * (isTorch ? 0.8 : config.pupilScale),
      height: IRIS_SIZE * (isTorch ? 0.8 : config.pupilScale),
    });
    console.log("Eye setup complete");
  }, [config, IRIS_SIZE, isTorch]);

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Easter Eggs (Click, DblClick) and Tracking
  useEffect(() => {
    const handleDoubleClick = () => {
      if (!eyeRef.current || !irisRef.current) return;
      gsap.killTweensOf(eyeRef.current);
      
      const tl = gsap.timeline();
      for(let i=0; i<6; i++) {
        tl.to(eyeRef.current, {
          x: () => Math.random() * 40 - 20,
          y: () => Math.random() * 40 - 20,
          skewX: () => Math.random() * 30 - 15,
          scale: () => Math.random() * 0.4 + 0.8,
          filter: `hue-rotate(${Math.random() * 360}deg) contrast(300%)`,
          duration: 0.05,
          ease: "none"
        });
      }
      tl.to(eyeRef.current, {
        x: 0, y: 0, skewX: 0, scale: isTorch ? 1.2 : 1, filter: "none", duration: 0.1
      });
    };

    const handleClick = () => {
      if (!pupilRef.current) return;
      gsap.killTweensOf(pupilRef.current, "scale");
      gsap.fromTo(pupilRef.current, 
        { scale: 0.2 }, 
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
    };

    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("click", handleClick);
    };
  }, [isTorch]);

  // Blinking Easter Egg
  useEffect(() => {
    let timeout;
    const blink = () => {
      if (eyelidRef.current && !isTorch) {
        const currentConfig = configRef.current;
        gsap.to(eyelidRef.current, {
           y: 0, 
           duration: 0.1,
           yoyo: true,
           repeat: 1,
           onComplete: () => {
               gsap.to(eyelidRef.current, { y: currentConfig.eyelidOffset, duration: 0.1 });
           }
        });
      }
      timeout = setTimeout(blink, Math.random() * 5000 + 2000);
    };
    timeout = setTimeout(blink, 2000);
    return () => clearTimeout(timeout);
  }, [isTorch]);

  useEffect(() => {
    let hoverElement = null;
    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateEyePosition = (targetX, targetY) => {
      const eye = eyeRef.current;
      const iris = irisRef.current;
      const pupil = pupilRef.current;
      const eyelid = eyelidRef.current;

      if (!eye || !iris || !pupil || !eyelid) return;

      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = targetX - centerX;
      const dy = targetY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const proximityRadius = 1200;

      const irisLimit = SIZE * 0.5;
      const pupilLimit = SIZE * 0.25;

      const currentConfig = configRef.current;

      if (distance < proximityRadius && !isTorch && !isOut) {
        const angle = Math.atan2(dy, dx);
        const strength = Math.min(distance / proximityRadius, 1);

        const irisx = Math.cos(angle) * irisLimit * strength;
        const irisy = Math.sin(angle) * irisLimit * strength;

        const pupilx = Math.cos(angle) * pupilLimit * strength;
        const pupily = Math.sin(angle) * pupilLimit * strength;

        const eyelidY = currentConfig.eyelidOffset + irisy * currentConfig.eyelidFollow;

        gsap.to(eyelid, {
          y: eyelidY,
          rotate: currentConfig.eyelidRotate,
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.to(iris, {
          x: irisx,
          y: irisy,
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.to(pupil, {
          x: pupilx,
          y: pupily,
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.to(eye, {
          scale: 1.05,
          duration: 0.4,
        });
      } else {
        gsap.to(iris, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
        gsap.to(pupil, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
        gsap.to(eyelid, { y: isTorch ? -SIZE : currentConfig.eyelidOffset, duration: 0.5 });
        gsap.to(eye, { scale: isTorch ? 1.2 : 1, duration: 0.5 });
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hoverElement) {
        updateEyePosition(mouseX, mouseY);
      }
    };

    const trackElement = () => {
      if (hoverElement) {
        const rect = hoverElement.getBoundingClientRect();
        updateEyePosition(rect.left + rect.width / 2, rect.top + rect.height / 2);
        rafId = requestAnimationFrame(trackElement);
      }
    };

    const handleEyeHover = (e) => {
      hoverElement = e.detail.element;
      if (rafId) cancelAnimationFrame(rafId);
      trackElement();
    };

    const handleEyeLeave = () => {
      hoverElement = null;
      if (rafId) cancelAnimationFrame(rafId);
      updateEyePosition(mouseX, mouseY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("eye-hover", handleEyeHover);
    window.addEventListener("eye-leave", handleEyeLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("eye-hover", handleEyeHover);
      window.removeEventListener("eye-leave", handleEyeLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [SIZE, isTorch, isOut]);

  return (
    <div>
      <div
        ref={eyeRef}
        className={`relative overflow-hidden rounded-full border-2 transition-all duration-300 ${
          isOut 
            ? 'border-cyan-200 bg-cyan-900 shadow-[0_0_80px_30px_rgba(0,255,255,0.8)]'
            : isTorch 
              ? 'border-purple-400 bg-[#06141c]' 
              : 'border-cyan-600 bg-[#06141c] shadow-[0_0_15px_rgba(0,255,255,0.3)]'
        }`}
        style={{
          width: SIZE,
          height: SIZE,
        }}
      >
        {/* Tech Crosshair lines */}
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-500/20 -translate-x-1/2 z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/20 -translate-y-1/2 z-10 pointer-events-none" />

        {/* Eyelid */}
        <div
          ref={eyelidRef}
          className="absolute top-0 z-30 bg-[#02080c] border-b border-cyan-800/50"
          style={{
            left: -EYELID_OVERFLOW,
            width: SIZE + EYELID_OVERFLOW * 2,
            height: EYELID_HEIGHT,
          }}
        />

        {/* Iris */}
        <div
          ref={irisRef}
          className="absolute left-1/2 top-1/2 z-20 flex items-center justify-center overflow-hidden rounded-full"
          style={{
            width: IRIS_SIZE,
            height: IRIS_SIZE,
            border: `${BORDER_WIDTH}px solid ${isTorch ? '#d08bff' : '#001a1a'}`,
            boxShadow: isTorch ? 'inset 0 0 10px rgba(255,255,255,0.5)' : 'none'
          }}
        >
          <div 
            ref={pupilRef} 
            className={`rounded-full transition-colors duration-300 ${isTorch ? 'bg-white' : 'bg-[#000a0a]'}`} 
            style={{
              boxShadow: isTorch ? '0 0 20px 10px rgba(132,0,255,0.8), 0 0 40px 20px rgba(132,0,255,0.5)' : 'none'
            }}
          />

          <div
            className="absolute rounded-full bg-white opacity-90 blur-[1px]"
            style={{
              width: HIGHLIGHT_SIZE,
              height: HIGHLIGHT_SIZE,
              top: IRIS_SIZE * 0.25,
              right: IRIS_SIZE * 0.12,
            }}
          />
        </div>

        <div
          className="absolute left-0 top-0 w-full bg-cyan-900/10 blur-md pointer-events-none"
          style={{
            height: SIZE * 0.05,
          }}
        />
      </div>
    </div>
  );
};

export default Eye;
