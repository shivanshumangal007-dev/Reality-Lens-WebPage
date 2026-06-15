import { useEffect, useRef } from "react";
import gsap from "gsap";

const Eye = ({ side, emotion = "normal" }) => {
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

    iris.style.background = config.irisGradient;

    gsap.set(pupil, {
      width: IRIS_SIZE * config.pupilScale,
      height: IRIS_SIZE * config.pupilScale,
    });
    console.log("Eye setup complete");
  }, [config, IRIS_SIZE]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eye = eyeRef.current;
      const iris = irisRef.current;
      const pupil = pupilRef.current;
      const eyelid = eyelidRef.current;

      // console.log("🎯 Mouse move fired", {
      //   hasEye: !!eye,
      //   hasIris: !!iris,
      //   hasPupil: !!pupil,
      //   hasEyelid: !!eyelid,
      //   clientX: e.clientX,
      //   clientY: e.clientY,
      // });

      if (!eye || !iris || !pupil || !eyelid) {
        console.log("❌ Missing refs!");
        return;
      }

      const rect = eye.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const proximityRadius = 1200;

      const irisLimit = SIZE * 0.5;
      const pupilLimit = SIZE * 0.25;

      if (distance < proximityRadius) {
        const angle = Math.atan2(dy, dx);
        const strength = Math.min(distance / proximityRadius, 1);

        const irisx = Math.cos(angle) * irisLimit * strength;
        const irisy = Math.sin(angle) * irisLimit * strength;

        const pupilx = Math.cos(angle) * pupilLimit * strength;
        const pupily = Math.sin(angle) * pupilLimit * strength;

        const eyelidY = config.eyelidOffset + irisy * config.eyelidFollow;

        gsap.to(eyelid, {
          y: eyelidY,
          rotate: config.eyelidRotate,
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
        gsap.to(iris, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1,0.4)",
        });

        gsap.to(pupil, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1,0.4)",
        });

        gsap.to(eyelid, {
          y: config.eyelidOffset,
          duration: 0.5,
        });

        gsap.to(eye, {
          scale: 1,
          duration: 0.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [config, SIZE]);

  return (
    <div>
      <div
        ref={eyeRef}
        className="relative overflow-hidden rounded-full border-2 border-black bg-gray-400"
        style={{
          width: SIZE,
          height: SIZE,
        }}
      >
        {/* Eyelid */}
        <div
          ref={eyelidRef}
          className="absolute top-0 z-30 bg-black"
          style={{
            left: -EYELID_OVERFLOW,
            width: SIZE + EYELID_OVERFLOW * 2,
            height: EYELID_HEIGHT,
          }}
        />

        {/* Iris */}
        <div
          ref={irisRef}
          className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full"
          style={{
            width: IRIS_SIZE,
            height: IRIS_SIZE,
            border: `${BORDER_WIDTH}px solid black`,
          }}
        >
          <div ref={pupilRef} className="rounded-full bg-black" />

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
          className="absolute left-0 top-0 w-full bg-black/10 blur-md"
          style={{
            height: SIZE * 0.05,
          }}
        />
      </div>
    </div>
  );
};

export default Eye;
