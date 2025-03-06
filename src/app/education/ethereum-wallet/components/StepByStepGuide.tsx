"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 'install',
    title: 'Download & Install MetaMask',
    description: 'MetaMask is available as a browser extension for Chrome, Firefox, Brave, and Edge. It\'s also available as a mobile app.',
    content: (
      <div className="space-y-4">
        <p>
          To get started, you'll need to install the MetaMask extension for your browser.
          Visit the <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">official MetaMask website</a> and click on "Download" to get the extension for your browser.
        </p>
        <div className="flex justify-center">
          <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg max-w-xs flex flex-col items-center space-y-3">
            <svg width="128" height="128" viewBox="0 0 256 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
              <path fill="#E17726" d="M250.066 0L142.454 80.267l19.944-46.333L250.066 0z" />
              <path fill="#E27625" d="M5.934 0l106.94 81.138-19.16-47.203L5.935 0z" />
              <path fill="#E27625" d="M214.46 174.792l-27.576 42.158 59.121 16.287 16.949-57.596-48.494-.849zM41.498 175.512l16.855 57.597 59.028-16.288-27.482-42.158-48.401.849z" />
              <path fill="#E27625" d="M110.964 89.571l-17.2 26.049 61.339 2.823 1.789-65.924-45.928 37.052zM145.036 89.571l46.401-37.727-2.355 66.599 61.244-2.823-17.107-26.049-88.183 0zM117.381 216.95l36.997-17.838-31.846-24.851-5.151 42.689zM138.622 199.112l36.997 17.838-5.151-42.689-31.846 24.851z" />
              <path fill="#D5BFB2" d="M175.619 216.95l-36.997-17.838 2.918 23.981-.377 10.149 34.456-16.292zM117.381 216.95l34.55 16.291-.282-10.148 2.824-23.982-37.092 17.839z" />
              <path fill="#233447" d="M136.216 163.648l-30.704-9.005 21.606-9.947 9.098 18.952zM156.784 163.648l9.098-18.952 21.7 9.947-30.798 9.005z" />
              <path fill="#CC6228" d="M117.381 216.95l5.34-45.296-32.916.85 27.576 44.446zM170.28 171.654l5.339 45.296 27.576-44.446-32.915-.85zM199.21 115.62l-61.244 2.823 5.622 31.62 9.098-18.952 21.7 9.947 24.824-25.438zM105.432 141.058l21.606-9.947 9.098 18.952 5.622-31.62-61.339-2.823 24.918 25.438z" />
              <path fill="#E27625" d="M80.419 115.62l25.958 50.477-1.412-25.04-24.546-25.437zM175.387 141.058l-1.506 25.038 25.957-50.476-24.451 25.438zM141.576 118.443l-5.622 31.62 7.06 36.435 1.599-47.894-3.037-20.16zM114.424 118.443l-2.95 20.067 1.506 47.988 7.06-36.436-5.616-31.619z" />
              <path fill="#F5841F" d="M114.424 118.443l7.06 54.075-36.998-31.46 29.937-22.614zM141.576 118.443l29.936 22.614-36.996 31.46 7.06-54.075zM80.419 115.62l34.737 73.091-5.81-22.614-28.927-50.477zM175.387 141.058l-5.903 22.613 34.737-73.09-28.834 50.477zM210.124 115.62l-16.95 57.597 22.89 35.352 19.306-99.94-25.246 6.99zM45.876 115.62l25.246-6.99-19.306 99.94 22.89-35.352-16.855-57.597z" />
              <path fill="#C0AC9D" d="M55.357 209.173l62.418 7.553-2.542-10.738-4.716-40.624-55.16 43.809zM200.643 209.173l-55.16-43.81-4.716 40.625-2.542 10.738 62.418-7.553zM168.774 145.586l-22.324 10.738 15.265 22.614-22.325-74.358 29.384 41.006zM87.226 145.586l29.384-41.006-22.325 74.358 15.264-22.614-22.323-10.738z" />
              <path fill="#161616" d="M62.04 162.954l53.653 35.446-46.12-20.539-7.532-14.907zM193.96 162.954l-7.626 14.907-46.026 20.539 53.653-35.446zM118.178 90.1l1.505 47.988-22.324-50.854 20.819 2.867zM137.822 90.1l20.913-2.867-22.419 50.854 1.506-47.988z" />
            </svg>
            <p className="text-center text-sm">Click to download MetaMask for your browser</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'create',
    title: 'Create a MetaMask Wallet',
    description: 'Learn how to create a new MetaMask wallet and secure your Secret Recovery Phrase.',
    content: (
      <div className="space-y-4">
        <p>After installing MetaMask, follow these steps:</p>
        <ol className="ml-6 space-y-4 list-decimal">
          <li>
            <strong>Create a new wallet:</strong> Click "Create a Wallet" if you're new to MetaMask.
          </li>
          <li>
            <strong>Create a password:</strong> This password is used to unlock your MetaMask on your device.
          </li>
          <li>
            <strong>Secure your Secret Recovery Phrase:</strong> MetaMask will show you a 12-word phrase. This is extremely important!
            <div className="p-3 mt-2 bg-yellow-50 text-yellow-800 rounded-md dark:bg-yellow-900/20 dark:text-yellow-200">
              <strong>Warning:</strong> Never share your Secret Recovery Phrase with anyone. Store it somewhere safe and offline. If you lose it, you'll lose access to your wallet and all funds.
            </div>
          </li>
          <li>
            <strong>Confirm your Secret Recovery Phrase:</strong> MetaMask will ask you to confirm the phrase by selecting the words in order.
          </li>
        </ol>
        <p>Once you've completed these steps, your MetaMask wallet is ready to use!</p>
      </div>
    )
  },
  {
    id: 'sepolia',
    title: 'Switch to Sepolia Testnet',
    description: 'Learn how to configure MetaMask to use the Sepolia test network.',
    content: (
      <div className="space-y-4">
        <p>By default, MetaMask connects to the Ethereum Mainnet. For learning purposes, we'll use Sepolia Testnet:</p>
        
        <ol className="ml-6 space-y-4 list-decimal">
          <li>
            <strong>Click on the network dropdown</strong> at the top of the MetaMask extension (it will say "Ethereum Mainnet" by default).
          </li>
          <li>
            <strong>If you don't see Sepolia</strong>, click on "Show/hide test networks".
          </li>
          <li>
            <strong>Enable test networks</strong> by turning on the toggle.
          </li>
          <li>
            <strong>Go back to the network dropdown</strong> and select "Sepolia Test Network".
          </li>
        </ol>
        
        <div className="p-4 border rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 my-4">
          <strong>Note:</strong> The Sepolia network uses test ETH which has no real value. It's perfect for learning how to interact with the blockchain without risking real money.
        </div>
      </div>
    )
  },
  {
    id: 'faucet',
    title: 'Get Free Sepolia ETH',
    description: 'Learn how to request test ETH from a Sepolia faucet to use in your transactions.',
    content: (
      <div className="space-y-4">
        <p>
          To interact with smart contracts on Sepolia, you'll need some test ETH. You can get it for free from a faucet:
        </p>
        
        <ol className="ml-6 space-y-4 list-decimal">
          <li>
            <strong>Copy your wallet address</strong> from MetaMask by clicking on your account name.
          </li>
          <li>
            <strong>Visit a Sepolia faucet</strong> such as:
            <ul className="ml-6 mt-2 space-y-2 list-disc">
              <li>
                <a 
                  href="https://sepoliafaucet.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sepolia Faucet (Alchemy)
                </a>
              </li>
              <li>
                <a 
                  href="https://faucet.sepolia.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sepolia Faucet (Infura)
                </a>
              </li>
            </ul>
          </li>
          <li>
            <strong>Request test ETH</strong> by pasting your wallet address and completing any verification steps.
          </li>
          <li>
            <strong>Wait for the transaction</strong> to be processed. This usually takes less than a minute.
          </li>
        </ol>
        
        <p>
          Once you receive the test ETH, you'll be able to see it in your MetaMask wallet when connected to the Sepolia network.
        </p>
        
        <div className="p-4 border rounded-lg bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200 my-4">
          <strong>Tip:</strong> Faucets typically limit how much ETH you can request in a given time period. If you need more for testing, you may need to wait or try a different faucet.
        </div>
      </div>
    )
  }
];

export default function StepByStepGuide() {
  const [activeStep, setActiveStep] = useState(steps[0].id);
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Setting Up MetaMask</h2>
      
      <div className="flex flex-wrap mb-6 space-x-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center px-3 py-2 mb-2 text-sm font-medium rounded-md transition-colors ${
              activeStep === step.id
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs rounded-full bg-blue-500 text-white">
              {index + 1}
            </span>
            {step.title}
          </button>
        ))}
      </div>
      
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`space-y-4 transition-opacity duration-300 ${
            activeStep === step.id ? 'block' : 'hidden'
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          
          <div className="p-5 mt-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {step.content}
          </div>
        </div>
      ))}
    </div>
  );
} 