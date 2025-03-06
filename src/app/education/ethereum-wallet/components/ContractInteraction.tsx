"use client";

import React, { useState, useEffect } from 'react';
// Use dynamic import for ethers to avoid SSR issues
import dynamic from 'next/dynamic';
import { formatEther, parseEther } from 'ethers'; 

// Safely define types for ethers components we'll use
type BrowserProviderType = any;
type ContractType = any;

// Contract ABI
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Deposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Withdrawn",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// Contract address on Sepolia
const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';

interface ContractInteractionProps {
  walletConnected: boolean;
  address: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Create component with no SSR to avoid hydration issues with ethers
const ContractInteraction = ({ walletConnected, address }: ContractInteractionProps) => {
  const [depositAmount, setDepositAmount] = useState<string>('0.01');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('0.01');
  const [userBalance, setUserBalance] = useState<string>('0');
  const [contractBalance, setContractBalance] = useState<string>('0');
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [transactionError, setTransactionError] = useState<string>('');
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [ethersLoaded, setEthersLoaded] = useState<boolean>(false);
  const [ethersError, setEthersError] = useState<string>('');
  
  // References to store ethers components
  const [ethersLib, setEthersLib] = useState<{
    BrowserProvider?: BrowserProviderType;
    Contract?: ContractType;
  }>({});
  
  // Load ethers library dynamically
  useEffect(() => {
    const loadEthers = async () => {
      try {
        // Dynamically import ethers to avoid SSR issues
        const ethers = await import('ethers');
        setEthersLib({
          BrowserProvider: ethers.BrowserProvider,
          Contract: ethers.Contract
        });
        setEthersLoaded(true);
      } catch (error) {
        console.error('Failed to load ethers library:', error);
        setEthersError('Failed to load Web3 libraries. Please refresh the page.');
      }
    };
    
    loadEthers();
  }, []);

  // Format eth values
  const formatEth = (value: string) => {
    // Convert wei to ether
    try {
      // Use ethers formatEther if available, otherwise fallback to manual calculation
      if (value === '0') return '0';
      
      try {
        return formatEther(value);
      } catch (e) {
        const valueInWei = BigInt(value);
        return (Number(valueInWei) / 1e18).toFixed(6);
      }
    } catch (error) {
      console.error('Error formatting ETH value:', error);
      return '0';
    }
  };

  // Format a number to wei string (with 18 decimals)
  const toWei = (etherAmount: string): string => {
    try {
      // Use ethers parseEther if available, otherwise fallback to manual calculation
      try {
        return parseEther(etherAmount).toString();
      } catch (e) {
        const etherValue = parseFloat(etherAmount);
        if (isNaN(etherValue)) return '0';
        return (etherValue * 1e18).toString();
      }
    } catch (error) {
      console.error('Error converting to wei:', error);
      return '0';
    }
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  // Refresh balances
  const refreshBalances = async () => {
    if (!walletConnected || !isMetaMaskInstalled() || !ethersLoaded) {
      setUserBalance('0');
      setContractBalance('0');
      return;
    }
    
    setRefreshing(true);
    
    try {
      // Using simulation mode for educational purposes
      const currentBalance = Math.random() * 2; // Random balance between 0-2 ETH
      const contractTotalBalance = Math.random() * 10; // Random balance between 0-10 ETH
      
      setUserBalance(toWei(currentBalance.toFixed(4)));
      setContractBalance(toWei(contractTotalBalance.toFixed(4)));
    } catch (error) {
      console.error('Error refreshing balances:', error);
      // Set default values in case of error
      setUserBalance('0');
      setContractBalance('0');
    } finally {
      setRefreshing(false);
    }
  };

  // Load contract information when wallet is connected
  useEffect(() => {
    if (walletConnected && ethersLoaded) {
      refreshBalances();
    }
  }, [walletConnected, address, ethersLoaded]);

  // Handle deposit - add a simulation mode for educational purposes
  const handleDeposit = async () => {
    if (!walletConnected || !isMetaMaskInstalled()) return;
    
    setTransactionPending(true);
    setTransactionSuccess(false);
    setTransactionHash('');
    setTransactionError('');
    
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a fake transaction hash for demonstration
      const fakeHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setTransactionHash(fakeHash);
      
      // Simulate another delay for transaction confirmation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful transaction
      setTransactionSuccess(true);
      
      // Update balances (fake in simulation mode)
      try {
        const currentBalance = parseFloat(formatEth(userBalance) || '0');
        const depositValue = parseFloat(depositAmount);
        if (!isNaN(currentBalance) && !isNaN(depositValue)) {
          setUserBalance(toWei((currentBalance + depositValue).toString()));
          setContractBalance(toWei((parseFloat(formatEth(contractBalance) || '0') + depositValue).toString()));
        }
      } catch (balanceError) {
        console.error('Error updating balances:', balanceError);
      }
    } catch (error: any) {
      console.error('Error depositing:', error);
      setTransactionError(error.message || 'Error depositing');
    } finally {
      setTransactionPending(false);
    }
  };

  // Handle withdraw - add simulation mode similarly
  const handleWithdraw = async () => {
    if (!walletConnected || !isMetaMaskInstalled()) return;
    
    setTransactionPending(true);
    setTransactionSuccess(false);
    setTransactionHash('');
    setTransactionError('');
    
    try {
      // Check if withdraw amount exceeds current balance in simulation
      const currentBalance = parseFloat(formatEth(userBalance) || '0');
      const withdrawValue = parseFloat(withdrawAmount);
      
      if (isNaN(currentBalance) || isNaN(withdrawValue)) {
        throw new Error('Invalid amount');
      }
      
      if (withdrawValue > currentBalance) {
        setTransactionError('Insufficient balance for withdrawal');
        setTransactionPending(false);
        return;
      }
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a fake transaction hash for demonstration
      const fakeHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setTransactionHash(fakeHash);
      
      // Simulate another delay for transaction confirmation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful transaction
      setTransactionSuccess(true);
      
      // Update balances (fake in simulation mode)
      try {
        setUserBalance(toWei((currentBalance - withdrawValue).toString()));
        const contractBal = parseFloat(formatEth(contractBalance) || '0');
        if (!isNaN(contractBal)) {
          setContractBalance(toWei((contractBal - withdrawValue).toString()));
        }
      } catch (balanceError) {
        console.error('Error updating balances:', balanceError);
      }
    } catch (error: any) {
      console.error('Error withdrawing:', error);
      setTransactionError(error.message || 'Error withdrawing');
    } finally {
      setTransactionPending(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interacting with the Smart Contract</h2>
      
      {ethersError && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
          {ethersError}
        </div>
      )}
      
      {!walletConnected ? (
        <div className="p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200">
          Please connect your wallet to interact with the smart contract
        </div>
      ) : (
        <div className="space-y-8">
          {/* Simulation Mode Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-700 dark:text-blue-400">Simulation Mode</span>
            </div>
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-300">
              This is an educational demo running in simulation mode. No real transactions are being sent to the blockchain. 
              Values and transactions are simulated for learning purposes.
            </p>
          </div>

          {/* Information Panel */}
          <div className="p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Contract Information</h3>
            <div className="mb-3 overflow-hidden text-sm font-mono">
              <span className="font-medium text-gray-600 dark:text-gray-400">Contract Address: </span>
              <span className="text-blue-600 break-all dark:text-blue-400">{CONTRACT_ADDRESS}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-3 bg-white border rounded-md shadow-sm dark:bg-gray-700/50 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Balance</div>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">{formatEth(userBalance)} ETH</span>
                  {refreshing && (
                    <svg className="w-4 h-4 ml-2 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </div>
              </div>
              <div className="p-3 bg-white border rounded-md shadow-sm dark:bg-gray-700/50 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Contract Balance</div>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">{formatEth(contractBalance)} ETH</span>
                  {refreshing && (
                    <svg className="w-4 h-4 ml-2 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={refreshBalances}
              disabled={refreshing}
              className="flex items-center justify-center px-4 py-2 mt-3 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Balances
                </>
              )}
            </button>
          </div>
          
          {/* Transaction Status Messages */}
          {transactionPending && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 -ml-1 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 dark:text-blue-400">Transaction in progress...</span>
              </div>
              {transactionHash && (
                <div className="mt-2 text-sm">
                  <span className="font-medium text-blue-700 dark:text-blue-400">Transaction Hash: </span>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-blue-600 break-all hover:underline dark:text-blue-400"
                  >
                    {transactionHash}
                  </a>
                </div>
              )}
            </div>
          )}
          
          {transactionSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 dark:text-green-400">Transaction successful!</span>
              </div>
              {transactionHash && (
                <div className="mt-2 text-sm">
                  <span className="font-medium text-green-700 dark:text-green-400">View on Etherscan: </span>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline dark:text-green-400"
                  >
                    {transactionHash.substring(0, 10)}...{transactionHash.substring(transactionHash.length - 8)}
                  </a>
                </div>
              )}
            </div>
          )}
          
          {transactionError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 dark:text-red-400">Transaction Error</span>
              </div>
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {transactionError}
              </div>
            </div>
          )}
          
          {/* Interaction Panel */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Deposit Section */}
            <div className="p-5 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Deposit ETH</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Deposit Sepolia ETH to your account in the smart contract. This ETH will be stored in the contract balance 
                and associated with your wallet address.
              </p>
              
              <div className="mb-4">
                <label htmlFor="depositAmount" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  id="depositAmount"
                  min="0.001"
                  step="0.001"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <button
                onClick={handleDeposit}
                disabled={transactionPending}
                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {transactionPending ? 'Processing...' : 'Deposit'}
              </button>
            </div>
            
            {/* Withdraw Section */}
            <div className="p-5 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Withdraw ETH</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Withdraw your deposited Sepolia ETH from the smart contract. You can only withdraw funds that you 
                have previously deposited.
              </p>
              
              <div className="mb-4">
                <label htmlFor="withdrawAmount" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  id="withdrawAmount"
                  min="0.001"
                  step="0.001"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <button
                onClick={handleWithdraw}
                disabled={transactionPending}
                className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {transactionPending ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
          </div>
          
          {/* Contract Explanation */}
          <div className="p-5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">About the Smart Contract</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              This is a simple Ethereum smart contract that allows you to:
            </p>
            <ul className="pl-5 mb-4 space-y-1 list-disc text-gray-600 dark:text-gray-400">
              <li>Deposit ETH to be stored in the contract</li>
              <li>Withdraw your previously deposited ETH</li>
              <li>Check your balance stored in the contract</li>
              <li>View the total contract balance</li>
            </ul>
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              The contract emits events when funds are deposited or withdrawn, which can be tracked on Etherscan.
            </p>
            <div className="p-3 mt-4 overflow-auto font-mono text-xs bg-gray-100 rounded-md dark:bg-gray-900 dark:text-gray-300">
              <pre>{`// Simple Storage Contract
contract SimpleStorage {
    address public owner;
    mapping(address => uint256) public balances;
    
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
    
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawn(msg.sender, _amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export using dynamic import with no SSR to avoid hydration issues
export default dynamic(() => Promise.resolve(ContractInteraction), { ssr: false }); 