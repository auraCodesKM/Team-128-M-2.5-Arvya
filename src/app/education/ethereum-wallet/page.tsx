"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import components to prevent SSR issues
const StepByStepGuide = dynamic(() => import('./components/StepByStepGuide'), { ssr: false });
const MetaMaskConnectButton = dynamic(() => import('./components/MetaMaskConnectButton'), { ssr: false });
const ContractInteraction = dynamic(() => import('./components/ContractInteraction'), { ssr: false });

export default function EthereumWalletEducation() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [activeSection, setActiveSection] = useState('intro');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to handle hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleWalletConnect = (connected: boolean, address: string, network: string) => {
    setIsWalletConnected(connected);
    setWalletAddress(address);
    setNetworkName(network);
  };

  // Don't render interactive elements until client-side
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Loading Ethereum Education Portal...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
              Web3 Wallet & Smart Contract Interactions
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Learn how to use MetaMask, connect to the Sepolia testnet, and interact with Ethereum smart contracts.
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8">
            {['intro', 'setup', 'connect', 'interact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {section === 'intro' && 'Introduction'}
                {section === 'setup' && 'Setup MetaMask'}
                {section === 'connect' && 'Connect Wallet'}
                {section === 'interact' && 'Smart Contract'}
              </button>
            ))}
          </motion.div>

          {/* Wallet Connection Status */}
          {isWalletConnected && (
            <motion.div 
              variants={itemVariants}
              className="p-4 mb-6 border rounded-lg bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 dark:text-green-400">Connected to {networkName}</span>
              </div>
              <div className="mt-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                {walletAddress}
              </div>
            </motion.div>
          )}

          {/* Main Content Section */}
          <motion.div 
            variants={itemVariants}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            {activeSection === 'intro' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction to Ethereum & Web3</h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">What is Ethereum?</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ethereum is a decentralized blockchain platform that enables the creation of smart contracts and decentralized applications (dApps). 
                      Unlike Bitcoin, which was designed primarily as a digital currency, Ethereum was built to support programmable transactions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Smart Contracts</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Smart contracts are self-executing agreements with the terms directly written into code. They automatically 
                      execute transactions when predetermined conditions are met, without requiring intermediaries.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Web3 Wallets</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Web3 wallets like MetaMask are the gateway to interacting with the Ethereum blockchain. They allow you to:
                  </p>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600 dark:text-gray-300">
                    <li>Store and manage your Ethereum and other cryptocurrencies</li>
                    <li>Connect to decentralized applications (dApps)</li>
                    <li>Sign transactions and messages</li>
                    <li>Interact with smart contracts</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Sepolia Testnet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The Sepolia testnet is an Ethereum test network that allows developers and users to experiment with 
                    smart contracts and dApps without using real Ether (ETH). It's perfect for learning how to interact with 
                    the Ethereum blockchain in a risk-free environment.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'setup' && (
              <div className="relative">
                <StepByStepGuide />
              </div>
            )}

            {activeSection === 'connect' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Connecting MetaMask to the DApp</h2>
                
                <p className="text-gray-600 dark:text-gray-300">
                  Connecting your MetaMask wallet to a decentralized application is the first step in interacting with Web3. 
                  This process typically involves requesting permission to view your account address and network information.
                </p>
                
                <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Try it out</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Click the button below to connect your MetaMask wallet. Make sure you've installed MetaMask and are connected to the Sepolia testnet.
                  </p>
                  
                  <MetaMaskConnectButton onConnect={handleWalletConnect} />
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Understanding Connection States</h3>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600 dark:text-gray-300">
                    <li><strong>Connected:</strong> Your wallet is successfully connected to the DApp</li>
                    <li><strong>Disconnected:</strong> You need to connect your wallet to use the DApp</li>
                    <li><strong>Wrong Network:</strong> You're connected, but not to the Sepolia testnet</li>
                    <li><strong>Not Installed:</strong> You need to install MetaMask</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'interact' && (
              <div className="relative">
                <ContractInteraction walletConnected={isWalletConnected} address={walletAddress} />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 