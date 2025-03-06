'use client';

import React from 'react';
import Link from 'next/link';

export default function EthereumWalletError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            We encountered an error while loading the Ethereum wallet education page.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-sm text-red-600 dark:text-red-300 w-full overflow-auto">
              <p className="font-semibold">Error details:</p>
              <pre className="mt-1">{error.message}</pre>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-3">
          <button
            onClick={reset}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>
          <Link
            href="/education"
            className="px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go back to Education
          </Link>
        </div>
      </div>
    </div>
  );
} 