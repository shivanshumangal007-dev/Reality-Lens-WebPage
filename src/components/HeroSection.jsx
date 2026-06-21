import Button from "../components/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";


import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const HeroSection = ({ isImageLoaded, setIsImageLoaded }) => {
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




	useGSAP(() => {
    if(isImageLoaded){
      const tl = gsap.timeline();
			tl.from("#bg", {
				opacity: 0,
				duration: 0.5,
				ease: "power1.inOut",
				delay: 0.1,
			});
			tl.from("#navline", {
				opacity: 0,
				scale: 0,
				duration: 1,
				ease: "power4.Out",
				delay: 0.5,
			});
			tl.from(
				"#navbar",
				{
					opacity: 0,
					duration: 1,
					ease: "power1.inOut",
				},
				"-=0.5",
			);

			const headHeroSplit = new SplitText("#headHero", { type: "words" });
			const paraHeroSplit = new SplitText("#paraHero", { type: "lines" });

			tl.from(
				headHeroSplit.words,
				{
					opacity: 0,
					yPercent: 10,
					duration: 1,
					ease: "power1.inOut",
					stagger: 0.1,
				},
				"-=0.5",
			);

			tl.from(
				paraHeroSplit.lines,
				{
					opacity: 0,
					yPercent: 10,
					duration: 1,
					ease: "power1.inOut",
					stagger: 0.1,
				},
				"-=0.5",
			);

			tl.from(
				"#buttons",
				{
					opacity: 0,
					duration: 1,
				},
				"-=0.5",
			);
    }
	}, [isImageLoaded]);

	return (
		<section
			id='HeroSection'
			className='relative h-[125vh] w-screen overflow-visible bg-transparent
      '
		>
			<img
				id='bg'
				onLoad={() => {
					setIsImageLoaded(true);
					console.log("Image loaded");
				}}
				src='/images/NewHeroBG.png'
				className={`absolute -top-20 w-full h-[calc(100%+5rem)] object-cover ${isImageLoaded ? "opacity-70" : "opacity-0"}`}
				alt='background'
			/>

			<nav
				id='navbar'
				className={`relative z-20 h-20 flex justify-between items-center px-8 md:px-12 bg-black/25 backdrop-blur-md ${isImageLoaded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			>
				<a
					href='#'
					className='flex items-center gap-2'
				>
					<img
						className='h-10 w-10'
						src='/images/Logo.png'
						alt='Reality Lens'
					/>
					<h1 className='text-white font-bold text-lg md:text-2xl'>
						Reality Lens
					</h1>
				</a>

				<div className='flex items-center gap-6 text-gray-400'>
					<div className='hidden md:flex gap-6'>
						<a
							href='https://github.com/hannuverma/RealityLens.git'
							className='text-xl  hover:text-white'
						>
							GitHub
						</a>
						<a
							href='#Features'
							className='text-xl  hover:text-white'
						>
							Features
						</a>
						<a
							href='#HowItWorks'
							onClick={(e) => {
								e.preventDefault();
								const element = document.querySelector('#HowItWorks');
								if (element && window.lenis) {
									window.lenis.scrollTo(element, { offset: 400 });
								} else {
									element?.scrollIntoView();
								}
							}}
							className='text-xl  hover:text-white'
						>
							How It Works
						</a>
					</div>
					<Button
						type='Solid'
						text='Download Now'
						onClick={handleDownload}
						onMouseEnter={(e) => window.dispatchEvent(new CustomEvent('eye-hover', { detail: { element: e.currentTarget, emotion: 'happy' } }))}
						onMouseLeave={() => window.dispatchEvent(new CustomEvent('eye-leave'))}
					/>
				</div>
			</nav>
			<div
				id='navline'
				className={`relative z-20 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-200 to-transparent ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
			></div>

			{platform === "mac" && (
					<div className="
							absolute
							right-4 bottom-64
							mt-4

							z-50

							w-[90vw]
							max-w-[760px]

							rounded-2xl
							border border-cyan-400/30
							bg-black/80
							backdrop-blur-md
							p-4

							shadow-[0_0_30px_rgba(34,211,238,0.25)]
							text-left
						"
  					>	
						<p className="mb-3 text-white font-medium text-lg border-b border-cyan-500/30 pb-2">
							macOS Installation Instructions
						</p>
						<p className="text-cyan-300/90 text-sm md:text-base mb-3 font-medium">
							Note: After downloading the .dmg file, follow these steps:
						</p>
						<ol className="text-gray-300 space-y-2.5 text-sm md:text-base list-decimal pl-5 marker:text-cyan-400 mb-4">
							<li>Open the downloaded <span className="text-white">.dmg</span> file.</li>
							<li>Drag <code className="text-cyan-300 font-mono bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/50">RealityLens.app</code> into the Applications folder.</li>
							<li>Launch RealityLens from Applications and sign in.</li>
						</ol>
						<p className="text-cyan-300/90 text-sm md:text-base mb-2 font-medium">
							Required Permissions:
						</p>
						<ul className="text-gray-300 space-y-1.5 text-sm md:text-base list-disc pl-5 marker:text-cyan-400">
							<li>To ensure all features work correctly, please grant the following permissions in System Settings:</li>
							<li><span className="text-white">Privacy &amp; Security</span> &gt; <span className="text-white">Accessibility</span> &gt; toggle RealityLens.</li>
							<li><span className="text-white">Privacy &amp; Security</span> &gt; <span className="text-white">Screen Recording</span> &gt; toggle RealityLens.</li>
						</ul>
						<p className="text-cyan-300/90 text-sm md:text-base mt-4 mb-2 font-medium">
							"App is damaged" error?
						</p>
						<p className="text-gray-300 text-sm md:text-base pl-5 mb-2">
							If macOS says the app is damaged, open Terminal and run:<br/>
							<code className="text-cyan-300 font-mono bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/50 mt-2 inline-block">xattr -cr /Applications/RealityLens.app</code>
						</p>
					</div>
				)}

			<div
				className={`relative z-30 text-white flex flex-col gap-6 h-[80vh] px-8  justify-center items-center text-center
                     md:px-12 md:justify-end md:w-[50vw] md:items-start md:text-left ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
			>
				<h1
					id='headHero'
					className='text-4xl md:text-5xl lg:text-6xl font-bold leading-[1] pointer-events-none'
					style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
				>
					Can You <span className='text-cyan-300'>Trust</span> What You See
					Online?
				</h1>
				<p
					id='paraHero'
					className='text-sm text-center md:text-lg md:text-left w-[80vw] md:w-[50vw] pointer-events-none'
					style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
				>
					Instantly verify screenshots, deepfakes, and manipulated stats with
					<span className='text-cyan-300 font-bold'> Reality-Lens.</span> <br />
					A native Windows tool{" "}
					<span className='text-cyan-300 font-bold'>
						{" "}
						Works Anywhere with just One Click.
					</span>
				</p>
				<div
					id='buttons'
					className='flex flex-col items-center gap-3 sm:flex-row md:w-[40vw] md:[&>*:first-child]:flex-[1] md:[&>*:last-child]:flex-[3] sm:[&>*]:w-auto'
				>	
				<div className=" hover:cursor-pointer px-2 h-12 w-[40vw] rounded-full text-white font-semibold bg-grey-800 border border-cyan-300/20
                 hover:border-cyan-100 hover:shadow-[0_0_32px_rgba(0,213,255,0.6)] transition-all duration-300
                 shadow-[inset_0_4px_10px_rgba(0,255,255,0.6),inset_0_-4px_10px_rgba(0,255,255,0.4)]
                 text-sm md:text-lg md:w-80 md:px-6 md:w-full/3 flex items-center justify-center">

					<select
						name='OS'
						id=''
						value={platform}
						onChange={(e) => setPlatform(e.target.value)}
						className='w-full text-sm md:text-lg outline-none'
					>
						<option
							className='bg-black text-white'
							value='windows(cloud)'
						>
							Windows
						</option>
						<option
							className='bg-black text-white'
							value='mac'
						>
							MacOS
						</option>
						<option
							className='bg-black text-white'
							value='linux'
						>
							Linux
						</option>
						<option
							className='bg-black text-white'
							value='Mobile App'
						>
							Mobile App
						</option>
					</select>
				</div>
					<Button
						type='Solid'
						onClick={handleDownload}
						onMouseEnter={(e) => window.dispatchEvent(new CustomEvent('eye-hover', { detail: { element: e.currentTarget, emotion: 'happy' } }))}
						onMouseLeave={() => window.dispatchEvent(new CustomEvent('eye-leave'))}
						className=' hover:cursor-pointer px-2  max-h-12 h-[10vw] w-[40vw] rounded-full text-white  bg-cyan-800 border border-cyan-300/20
                 hover:border-cyan-100 hover:shadow-[0_0_32px_rgba(0,213,255,0.6)] transition-all duration-300
                 shadow-[inset_0_4px_10px_rgba(0,0,0,0.6),inset_0_-4px_10px_rgba(0,255,255,0.4)]
                 text-sm md:text-lg md:w-80 md:px-6 leading-tight md:2full/3'
					>
						Download for {platform.charAt(0).toUpperCase() + platform.slice(1)}
					</Button>
				</div>
				
			</div>
		</section>
	);
};

export default HeroSection;
