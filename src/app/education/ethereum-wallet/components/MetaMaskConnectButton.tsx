"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// We need to define the window.ethereum type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      chainId: string;
    };
  }
}

interface MetaMaskConnectButtonProps {
  onConnect: (connected: boolean, address: string, network: string) => void;
}

// Network names mapping
const NETWORK_NAMES: { [key: string]: string } = {
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0xaa36a7': 'Sepolia Testnet',
  '0x7a69': 'Hardhat Local',
  '0x539': 'Ganache Local',
};

const MetaMaskConnectButton = ({ onConnect }: MetaMaskConnectButtonProps) => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chainId, setChainId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  // Check if we're in the browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    // Don't run in server-side rendering
    if (!isBrowser) return;

    // Check if MetaMask is installed
    const checkIfMetaMaskIsInstalled = () => {
      try {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setIsInstalled(true);
          // Check if already connected
          checkIfConnected();
          // Setup listeners
          setupEventListeners();
        } else {
          setIsInstalled(false);
        }
      } catch (error) {
        console.error("Error checking MetaMask installation:", error);
        setIsInstalled(false);
      }
    };

    const checkIfConnected = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          try {
            // Get accounts
            const accounts = await ethereum.request({
              method: 'eth_accounts',
            });
            
            // Get chain ID
            const chainId = await ethereum.request({
              method: 'eth_chainId',
            });
            
            if (accounts && accounts.length > 0) {
              setAccounts(accounts);
              setChainId(chainId || '');
              setIsConnected(true);
              // Notify parent component
              onConnect(true, accounts[0], NETWORK_NAMES[chainId] || `Chain ID: ${chainId}`);
            }
          } catch (requestError) {
            console.error("Error requesting account access:", requestError);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setError('Failed to check wallet connection.');
      }
    };

    const setupEventListeners = () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          // Account changed event
          ethereum.on('accountsChanged', handleAccountsChanged);
          // Chain changed event
          ethereum.on('chainChanged', handleChainChanged);
        }
      } catch (error) {
        console.error("Error setting up event listeners:", error);
      }
    };

    if (isBrowser) {
      checkIfMetaMaskIsInstalled();
    }

    // Cleanup listeners
    return () => {
      try {
        if (isBrowser) {
          const { ethereum } = window;
          if (ethereum) {
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
            ethereum.removeListener('chainChanged', handleChainChanged);
          }
        }
      } catch (error) {
        console.error("Error removing event listeners:", error);
      }
    };
  }, [onConnect, isBrowser]);

  const handleAccountsChanged = (newAccounts: string[]) => {
    if (!newAccounts || newAccounts.length === 0) {
      // User disconnected
      setIsConnected(false);
      setAccounts([]);
      onConnect(false, '', '');
    } else {
      // Account changed
      setAccounts(newAccounts);
      onConnect(true, newAccounts[0], NETWORK_NAMES[chainId] || `Chain ID: ${chainId}`);
    }
  };

  const handleChainChanged = (newChainId: string) => {
    setChainId(newChainId);
    // Notify parent of network change
    if (accounts.length > 0) {
      onConnect(true, accounts[0], NETWORK_NAMES[newChainId] || `Chain ID: ${newChainId}`);
    }
  };

  const connectWallet = async () => {
    if (!isBrowser) return;
    
    setIsConnecting(true);
    setError('');
    
    try {
      const { ethereum } = window;
      if (ethereum) {
        try {
          // Request accounts
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          
          // Get chain ID
          const chainId = await ethereum.request({
            method: 'eth_chainId',
          });
          
          if (accounts && accounts.length > 0) {
            setAccounts(accounts);
            setChainId(chainId || '');
            setIsConnected(true);
            onConnect(true, accounts[0], NETWORK_NAMES[chainId] || `Chain ID: ${chainId}`);
          } else {
            throw new Error('No accounts found');
          }
        } catch (requestError: any) {
          if (requestError.code === 4001) {
            // User rejected the request
            throw new Error('You rejected the connection request');
          } else {
            throw requestError;
          }
        }
      } else {
        throw new Error('MetaMask is not installed');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const switchToSepolia = async () => {
    if (!isBrowser) return;
    
    const SEPOLIA_CHAIN_ID = '0xaa36a7';
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      
      // Try to switch to Sepolia
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });
      } catch (switchError: any) {
        // If Sepolia is not added to MetaMask, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: SEPOLIA_CHAIN_ID,
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc.sepolia.org'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add Sepolia network', addError);
            setError('Failed to add Sepolia network');
          }
        } else {
          console.error('Failed to switch network', switchError);
          setError('Failed to switch network');
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  // Is user on Sepolia?
  const isOnSepolia = chainId === '0xaa36a7';

  // If we're not in the browser yet, show a placeholder
  if (!isBrowser) {
    return <div className="my-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">Loading wallet connection...</div>;
  }

  return (
    <div className="space-y-4">
      {!isInstalled ? (
        <div>
          <button
            onClick={() => window.open('https://metamask.io/download/', '_blank')}
            className="flex items-center px-4 py-2 font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <svg width="24" height="24" viewBox="0 0 256 240" className="mr-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
              <path fill="#fff" d="M250.066 0L142.454 80.267l19.944-46.333L250.066 0z" />
              <path fill="#fff" d="M5.934 0l106.94 81.138-19.16-47.203L5.935 0z" />
              <path fill="#fff" d="M214.46 174.792l-27.576 42.158 59.121 16.287 16.949-57.596-48.494-.849zM41.498 175.512l16.855 57.597 59.028-16.288-27.482-42.158-48.401.849z" />
              <path fill="#fff" d="M110.964 89.571l-17.2 26.049 61.339 2.823 1.789-65.924-45.928 37.052zM145.036 89.571l46.401-37.727-2.355 66.599 61.244-2.823-17.107-26.049-88.183 0z" />
            </svg>
            Install MetaMask
          </button>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            MetaMask is not installed. Click the button above to download and install it.
          </p>
        </div>
      ) : isConnected ? (
        <div>
          {isOnSepolia ? (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center px-4 py-2 font-medium text-white bg-green-500 rounded-md cursor-default"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected to Sepolia
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={switchToSepolia}
                className="flex items-center px-4 py-2 font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Switch to Sepolia
              </button>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">
                You're connected to {NETWORK_NAMES[chainId] || `Chain ID: ${chainId}`}
              </span>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <>
              <svg className="w-5 h-5 mr-2 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 256 240" className="mr-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <path fill="#fff" d="M250.066 0L142.454 80.267l19.944-46.333L250.066 0z" />
                <path fill="#fff" d="M5.934 0l106.94 81.138-19.16-47.203L5.935 0z" />
                <path fill="#fff" d="M214.46 174.792l-27.576 42.158 59.121 16.287 16.949-57.596-48.494-.849zM41.498 175.512l16.855 57.597 59.028-16.288-27.482-42.158-48.401.849z" />
                <path fill="#fff" d="M110.964 89.571l-17.2 26.049 61.339 2.823 1.789-65.924-45.928 37.052zM145.036 89.571l46.401-37.727-2.355 66.599 61.244-2.823-17.107-26.049-88.183 0z" />
              </svg>
              Connect MetaMask
            </>
          )}
        </button>
      )}
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}
    </div>
  );
};

// Export using dynamic import with no SSR
export default dynamic(() => Promise.resolve(MetaMaskConnectButton), { ssr: false }); 