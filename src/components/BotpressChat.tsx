"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

// Define Botpress types
declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: any) => void;
      sendEvent: (event: any) => void;
      destroy: () => void;
    };
  }
}

const BotpressChat: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [mainScriptLoaded, setMainScriptLoaded] = useState(false);
  const [configScriptLoaded, setConfigScriptLoaded] = useState(false);

  // Handle main script load
  const handleMainScriptLoad = () => {
    console.log('Main Botpress script loaded');
    setMainScriptLoaded(true);
  };

  // Handle config script load
  const handleConfigScriptLoad = () => {
    console.log('Botpress config script loaded');
    setConfigScriptLoaded(true);
  };

  // Initialize Botpress when both scripts are loaded
  useEffect(() => {
    if (mainScriptLoaded && configScriptLoaded) {
      try {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            hideWidget: true,
          });
          setIsLoaded(true);
          console.log('Botpress initialized successfully');
        } else {
          console.error('Botpress WebChat not available');
          setScriptError(true);
        }
      } catch (error) {
        console.error('Failed to initialize Botpress:', error);
        setScriptError(true);
      }
    }
  }, [mainScriptLoaded, configScriptLoaded]);

  // Handle script error
  const handleScriptError = () => {
    console.error('Failed to load Botpress script');
    setScriptError(true);
  };

  // Toggle chat
  const handleOpenChat = () => {
    if (window.botpressWebChat && isLoaded) {
      try {
        window.botpressWebChat.sendEvent({ type: 'toggle' });
      } catch (error) {
        console.error('Error toggling chat:', error);
      }
    } else {
      console.warn('Botpress not fully loaded yet');
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (window.botpressWebChat) {
        try {
          window.botpressWebChat.destroy();
        } catch (error) {
          console.error('Error destroying Botpress:', error);
        }
      }
    };
  }, []);

  return (
    <>
      {/* Load Botpress main script */}
      <Script
        id="botpress-main-script"
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
        onLoad={handleMainScriptLoad}
        onError={handleScriptError}
        strategy="lazyOnload"
      />

      {/* Load Botpress config script */}
      <Script
        id="botpress-config-script"
        src="https://files.bpcontent.cloud/2025/03/05/13/20250305133958-LXOGF5Q2.js"
        onLoad={handleConfigScriptLoad}
        onError={handleScriptError}
        strategy="lazyOnload"
      />

      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleOpenChat}
          disabled={!isLoaded || scriptError}
          className={`rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl ${
            scriptError 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
          aria-label="Open chat assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </motion.div>
    </>
  );
};

export default BotpressChat; 