"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
      transition: { 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Handle Spline loading
  useEffect(() => {
    // Add event listener for Spline errors
    const handleSplineError = () => {
      console.error("Spline loading error");
      setSplineError(true);
    };

    // Listen for error events from the Spline viewer
    window.addEventListener('error', handleSplineError);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleSplineError);
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50"></div>
          
          {/* Spline viewer with the provided URL */}
          <div 
            className="w-full h-full" 
            dangerouslySetInnerHTML={{ 
              __html: '<spline-viewer url="https://prod.spline.design/uFGhXkKIkfYwD86T/scene.splinecode" style="width: 100%; height: 100%;"></spline-viewer>' 
            }} 
          />
        </div>
              
        {/* Decorative Elements - Subtle and Professional */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <motion.div 
            className="absolute top-10 md:top-20 left-10 md:left-20 opacity-70 md:opacity-100"
            animate={floatingAnimation}
          >
            <div className="w-16 md:w-32 h-16 md:h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl"></div>
          </motion.div>
            
          <motion.div 
            className="absolute bottom-10 md:bottom-20 right-10 md:right-20 opacity-70 md:opacity-100"
            animate={floatingAnimation}
            transition={{ delay: 1 }}
          >
            <div className="w-20 md:w-40 h-20 md:h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl"></div>
          </motion.div>
        </div>
          
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-20 min-h-screen flex flex-col justify-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-600"
            >
              Welcome to Arvya
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 md:mb-8 leading-relaxed px-2"
            >
              Breaking barriers in finance. Creating opportunities for women to build wealth, 
              lead companies, and shape the future of investment.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg">
                  Join the Movement
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900 text-white rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg">
                  Our Mission
                </Button>
              </Link>
            </motion.div>
            
            {/* Women Empowerment Stats - Professional Design */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-purple-800">68%</div>
                <div className="text-sm md:text-base text-gray-600">Women-Led Growth</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-purple-800">10K+</div>
                <div className="text-sm md:text-base text-gray-600">Female Entrepreneurs</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-purple-800">$1.2B</div>
                <div className="text-sm md:text-base text-gray-600">Women-Backed Funds</div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-70"
            >
              <p className="w-full text-xs sm:text-sm text-gray-500 mb-1 md:mb-2">Partnered with leading women's organizations</p>
              <div className="h-6 md:h-8">
                <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H24V24H0V0Z" fill="#F8BF18"/>
                  <path d="M28 6H44V10H28V6Z" fill="#666666"/>
                  <path d="M28 12H52V16H28V12Z" fill="#666666"/>
                  <path d="M28 18H48V22H28V18Z" fill="#666666"/>
                </svg>
              </div>
              <div className="h-6 md:h-8">
                <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 6H120V10H60V6Z" fill="#666666"/>
                  <path d="M60 12H110V16H60V12Z" fill="#666666"/>
                  <path d="M60 18H100V22H60V18Z" fill="#666666"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Professional Information Cards - Positioned to avoid overlap */}
        <div className="absolute z-20 top-1/4 -left-4 md:left-10 hidden md:block lg:block">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-white/95 rounded-lg shadow-md p-3 md:p-4 w-48 md:w-64 transform -rotate-3"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="font-bold text-sm md:text-base text-gray-800">Women in Leadership</div>
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              Women-led companies outperform the market by 3.5% annually
            </div>
          </motion.div>
        </div>
          
        <div className="absolute z-20 top-1/3 -right-4 md:right-10 hidden md:block lg:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="bg-white/95 rounded-lg shadow-md p-3 md:p-4 w-48 md:w-64 transform rotate-3"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="font-bold text-sm md:text-base text-gray-800">Closing the Gap</div>
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              Dedicated to reducing the 30% gender investment gap
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">Scroll to explore</p>
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400 rounded-full flex justify-center pt-1 md:pt-2">
              <motion.div 
                animate={{ 
                  y: [0, 6, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5
                }}
                className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Arvya Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="bg-gradient-to-tr from-purple-200 to-pink-100 rounded-2xl p-8 h-[400px] w-full flex items-center justify-center">
                  <div className="relative">
                    {/* Investment Performance Card */}
                    <div className="absolute -top-10 -left-10 bg-white rounded-lg shadow-lg p-4 z-20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                          <span className="text-xl">📈</span>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Portfolio Growth</div>
                          <div className="text-green-500 font-semibold">+28.5% YTD</div>
                        </div>
                      </div>
                    </div>

                    {/* Main Image */}
                    <Image 
                      src="/hero-image.webp" 
                      alt="Investment Dashboard" 
                      width={500} 
                      height={300}
                      className="rounded-xl shadow-2xl"
                    />

                    {/* Stats Card */}
                    <div className="absolute -bottom-10 -right-10 bg-white rounded-lg shadow-lg p-4 z-20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                          <span className="text-xl">🎯</span>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Investment Goals</div>
                          <div className="text-purple-500 font-semibold">On Track</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                About Arvya
              </h2>
              <div className="w-20 h-1 bg-pink-500 mb-8"></div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Arvya is a pioneering investment platform designed to empower individuals in their financial journey. We combine cutting-edge technology with personalized guidance to make smart investing accessible to everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-xl">✓</span>
                </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Smart Portfolio</h3>
                    <p className="text-gray-600">AI-driven investment strategies tailored to your goals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Guidance</h3>
                    <p className="text-gray-600">Professional advisors at your fingertips</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure Platform</h3>
                    <p className="text-gray-600">Bank-grade security for your investments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy Access</h3>
                    <p className="text-gray-600">Manage investments anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Powerful Features for Smart Investing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed investment decisions and grow your wealth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Portfolio Analytics</h3>
              <p className="text-gray-600 mb-4">
                Advanced analytics and insights to track your investment performance and make data-driven decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Performance metrics
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Risk analysis
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Goals</h3>
              <p className="text-gray-600 mb-4">
                Set and track your financial goals with personalized investment strategies and recommendations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Goal planning
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Progress tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Smart adjustments
                </li>
              </ul>
          </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Expert Support</h3>
              <p className="text-gray-600 mb-4">
                Get professional guidance and support from our team of experienced financial advisors.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  1-on-1 consulting
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Market insights
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Investment advice
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about Arvya and our investment platform
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* FAQ Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <details className="group bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800">
                  <span>What makes Arvya different from other investment platforms?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>Arvya stands out with our focus on women's financial empowerment, AI-driven personalized investment strategies, and comprehensive educational resources. We combine cutting-edge technology with human expertise to provide a platform that's both powerful and accessible, especially designed to close the gender investment gap.</p>
                </div>
              </details>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <details className="group bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800">
                  <span>How do I get started with investing on Arvya?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>Getting started is simple! Create an account, complete your investor profile, set your financial goals, and make your first deposit. Our platform will guide you through each step, recommending investment strategies tailored to your goals and risk tolerance. You can start with as little as ₹500 and gradually increase your investments as you become more comfortable.</p>
                </div>
              </details>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <details className="group bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800">
                  <span>Is my money safe with Arvya?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>Absolutely. Security is our top priority. Arvya employs bank-level security measures including 256-bit encryption, two-factor authentication, and regular security audits. Your investments are protected by regulatory safeguards, and we're fully compliant with all relevant financial regulations. Additionally, we maintain segregated accounts, ensuring your investments are always separate from our operating funds.</p>
                </div>
              </details>
            </motion.div>

            {/* FAQ Item 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <details className="group bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800">
                  <span>What types of investments does Arvya offer?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>Arvya offers a diverse range of investment options including stocks, mutual funds, ETFs, bonds, and specialized investment circles focused on sustainable and women-led businesses. Our platform provides both ready-made portfolios for beginners and customizable options for experienced investors. We also offer exclusive access to curated investment opportunities that align with our mission of promoting financial inclusion and gender equality.</p>
                </div>
              </details>
            </motion.div>

            {/* FAQ Item 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <details className="group bg-white rounded-lg shadow-md p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800">
                  <span>How does Arvya support financial education?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-gray-600">
                  <p>Education is at the core of our mission. Arvya provides comprehensive learning resources including articles, videos, webinars, and interactive courses designed for all knowledge levels. Our education section covers everything from basic financial concepts to advanced investment strategies. We also offer personalized learning paths based on your goals and experience, and host regular workshops and community events focused on building financial confidence and knowledge.</p>
                </div>
              </details>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Arvya</h3>
              <p className="text-gray-400 mb-6">
                Building a better financial future through smart investing and expert guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest news and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Arvya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
