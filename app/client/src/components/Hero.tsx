"use client";

import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { ContainerTextFlip } from "./ui/container-text-flip";
import Services from "./Services";
import { Spotlight } from "./ui/Spotlight";
export default function SikatlyHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial animations when component mounts
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        featuresRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.1 },
        "-=0.2"
      );

    // Subtle floating animation for the background pattern
    gsap.to(".bg-pattern", {
      y: 15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle pulsing animation for the gradient background
    gsap.to(".gradient-bg", {
      backgroundPosition: "100% 100%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const features = [
    {
      icon: <FontAwesomeIcon icon={faYoutube} className="h-5 w-5 text-white" />,
      label: "YouTube",
    },
    {
      icon: <FontAwesomeIcon icon={faTiktok} className="h-5 w-5 text-white" />,
      label: "Tiktok",
    },
    {
      icon: (
        <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-white" />
      ),
      label: "Instagram",
    },
    {
      icon: (
        <FontAwesomeIcon icon={faFacebook} className="h-5 w-5 text-white" />
      ),
      label: "Facebook",
    },
  ];

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-black/[0.96] via-gray-800 to-gray-900 gradient-bg "
      style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
    >
      <Spotlight />
      {/* Background elements */}
      <div className="absolute inset-0 bg-pattern opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500 blur-3xl opacity-20"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <div className="lg:w-1/2 max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
              <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-slate-200">
                AI-Powered Content Creation
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-7xl font-bold  mb-6 leading-tight relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans "
            >
              Automate Your Content{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <ContainerTextFlip
                  words={["Better", "Modern", "Creation", "Awesome"]}
                />
              </span>{" "}
              Workflow
            </h1>

            <p ref={subtitleRef} className="text-lg text-slate-300 mb-8">
              Let AI agents handle your content production. Create YouTube
              scripts, generate thumbnails, produce voiceovers, and schedule
              uploads—all from one intuitive dashboard.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                className="
    transition-colors duration-200 
    group inline-flex items-center 
    outline-none relative justify-center 
    tracking-tight leading-none 
    focus:outline-white focus:outline-1 focus:outline-offset-4 
    h-12 text-15 px-8 rounded-full
    relative shadow-[0px_2px_4px_0px_rgba(0,0,0,0.5)] 
    group font-medium btn-hover
  "
                href="/contact"
              >
                {/* Outer gradient border */}
                <span
                  className="
    absolute -inset-px rounded-full 
    bg-[linear-gradient(180deg,#7b61ff_0%,#4f46e5_50%,#1e1b4b_100%)]
  "
                ></span>

                {/* Glow effect */}
                <span
                  className="
    absolute -top-[5px] bottom-0.5 left-1/2 w-[91%] -translate-x-1/2 
    bg-btn-glowing mix-blend-screen blur-[1px] 
    transition-transform duration-300 ease-in-out 
    group-hover:translate-y-[-2px]
  "
                ></span>

                {/* Black background */}
                <span className="absolute inset-0 rounded-full bg-black"></span>

                {/* Default inner glow */}
                <span
                  className="
    absolute inset-0 rounded-full bg-btn-glowing-inset 
    opacity-100 transition-opacity duration-300 ease-in-out 
    group-hover:opacity-0
  "
                ></span>

                {/* Hover inner glow */}
                <span
                  className="
    absolute inset-0 rounded-full bg-btn-glowing-inset-hover 
    opacity-0 transition-opacity duration-300 ease-in-out 
    group-hover:opacity-100
  "
                ></span>

                {/* Neon glow effect at the top that appears on hover */}
                <span className="neon-glow"></span>

                {/* Shine/ray effect that activates on hover */}
                <span className="shine-effect"></span>

                {/* Button text with gradient */}
                <span
                  className="
    relative z-20 
    bg-[linear-gradient(180deg,#b8b4ff_33.33%,#7b61ff_116.67%)] 
    bg-clip-text text-white
  "
                >
                  <span>Start With Free</span>
                </span>
              </a>
              <button className="group px-8 h-12 rounded-full flex items-center justify-center bg-transparent hover:bg-slate-800/50 transition-all duration-300 cursor-pointer">
                <span className="text-white font-medium mr-2">
                  Explore our services
                </span>
                <svg
                  className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5L20 12L13 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div ref={featuresRef} className="flex flex-wrap gap-4 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  id={`feature-${index}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm  cursor-pointer"
                >
                  {feature.icon}
                  <span className="text-sm font-medium text-slate-200">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Dashboard preview */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-full max-w-lg mx-auto">
              {/* Dashboard mockup with gradient border */}
              <div className="rounded-xl bg-btn-glowing-dashboard-1 overflow-hidden shadow-2xl border border-slate-700 bg-gradient-to-r p-px from-blue-500/30 via-purple-500/30 to-blue-500/30">
                <div className="bg-gray-900 rounded-xl p-4">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Bot className="h-6 w-6 text-blue-400 mr-2" />
                      <span className="text-lg font-semibold text-white">
                        Sikatly.AI Dashboard
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800 rounded-lg p-4 col-span-2">
                      <h3 className="text-sm font-medium text-slate-300 mb-2">
                        Latest Project
                      </h3>
                      <div className="bg-slate-700 h-32 rounded-md animate-pulse"></div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-slate-300 mb-2">
                        Scripts
                      </h3>
                      <div className="space-y-2">
                        <div className="bg-slate-700 h-4 rounded-md w-3/4 animate-pulse"></div>
                        <div className="bg-slate-700 h-4 rounded-md w-full animate-pulse"></div>
                        <div className="bg-slate-700 h-4 rounded-md w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-slate-300 mb-2">
                        Thumbnails
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-700 h-12 rounded-md animate-pulse"></div>
                        <div className="bg-slate-700 h-12 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 col-span-2">
                      <h3 className="text-sm font-medium text-slate-300 mb-2">
                        Upcoming Schedule
                      </h3>
                      <div className="flex space-x-2">
                        <div className="bg-blue-900/50 border border-blue-700/50 rounded-md p-2 flex-1">
                          <div className="bg-slate-700 h-4 rounded-md w-3/4 mb-2 animate-pulse"></div>
                          <div className="bg-slate-700 h-4 rounded-md w-1/2 animate-pulse"></div>
                        </div>
                        <div className="bg-purple-900/50 border border-purple-700/50 rounded-md p-2 flex-1">
                          <div className="bg-slate-700 h-4 rounded-md w-3/4 mb-2 animate-pulse"></div>
                          <div className="bg-slate-700 h-4 rounded-md w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
        <Services />
      </div>
    </div>
  );
}
