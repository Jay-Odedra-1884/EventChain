"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function AppBar() {
    const { address }= useAccount();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='w-full relative z-50'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse'></div>
        <div className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse'></div>
        <div className='absolute top-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/10 to-transparent animate-pulse'></div>
      </div>

      <div className='relative z-10 bg-transparent backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex justify-between items-center'>
            {/* Logo Section */}
            <div className='flex items-center gap-4 group'>
              <div className='relative'>
                {/* <Image src={"/Logo.png"} height={40} width={40} alt='EventChain' className='group-hover:scale-110 transition-transform duration-300' /> */}
                <div className='absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-purple-500/30 rounded-full blur group-hover:blur-lg transition-all duration-300'></div>
                <div className='absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-purple-400/20 rounded-full animate-pulse'></div>
              </div>
              <div className='text-2xl font-black font-mono tracking-wider'>
                <span className='bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent animate-pulse'>
                  EVENTCHAIN
                </span>
              </div>
              <div className='hidden md:block'>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className='hidden md:flex items-center gap-8'>
              <div className='relative group cursor-pointer'>
                <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider'>
                  HOME
                </div>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-400 group-hover:w-full transition-all duration-300'></div>
              </div>
              <div className='relative group cursor-pointer'>
                <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider'>
                  EXPLORE
                </div>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-400 group-hover:w-full transition-all duration-300'></div>
              </div>
              <div className='relative group cursor-pointer'>
                <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider'>
                  EVENTS
                </div>
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-400 group-hover:w-full transition-all duration-300'></div>
              </div>
            </div>

            {/* Wallet Section */}
            <div className='flex items-center gap-4'>
              {/* Network Status */}
              <div className='hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-purple-500/30 rounded-lg'>
                <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
                <span className='text-purple-400 font-mono text-xs tracking-wider'>SEPOLIA</span>
              </div>

              {/* Wallet Connection */}
              {address ? (
                <div className='flex items-center gap-3'>
                  <div className='bg-gradient-to-r from-purple-900/50 to-purple-900/50 border border-purple-500/30 px-4 py-2 rounded-lg font-mono text-purple-300 text-sm tracking-wider'>
                    {address.slice(0,6)}...{address.slice(-4)}
                  </div>
                  <Disconnect />
                </div>
              ) : (
                <Connectors />
              )}

              {/* Mobile Menu Button */}
              <button
                className='md:hidden p-2 text-white hover:text-purple-400 transition-colors duration-300'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className='w-6 h-6 flex flex-col justify-center items-center gap-1'>
                  <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-gradient-to-b from-gray-900/95 to-black/95 border-b border-purple-500/20 backdrop-blur-xl'>
          <div className='px-6 py-4 space-y-4'>
            {/* Mobile Navigation Links */}
            <div className='space-y-3'>
              <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider py-2 border-b border-gray-700/50'>
                HOME
              </div>
              <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider py-2 border-b border-gray-700/50'>
                EXPLORE
              </div>
              <div className='text-white hover:text-purple-400 transition-colors duration-300 font-mono text-sm tracking-wider py-2 border-b border-gray-700/50'>
                EVENTS
              </div>
            </div>

            {/* Mobile Network Status */}
            <div className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-purple-500/30 rounded-lg'>
              <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
              <span className='text-purple-400 font-mono text-xs tracking-wider'>SEPOLIA NETWORK</span>
            </div>

            {/* Mobile Wallet Section */}
            <div className='pt-4 border-t border-gray-700/50'>
              {address ? (
                <div className='space-y-3'>
                  <div className='bg-gradient-to-r from-purple-900/50 to-purple-900/50 border border-purple-500/30 px-4 py-3 rounded-lg font-mono text-purple-300 text-sm tracking-wider text-center'>
                    {address.slice(0,10)}...{address.slice(-8)}
                  </div>
                  <Disconnect />
                </div>
              ) : (
                <Connectors />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


//connector for wallet
function Connectors() {
    const { connectors, connect } = useConnect();
    const [ popup, setPopup ] = useState(false);

    return (
        <>
        <div className='relative'>
          <div 
            className='bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-500 hover:to-purple-500 px-6 py-3 rounded-lg cursor-pointer hover:scale-105 duration-300 font-black text-white shadow-2xl shadow-purple-500/25 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 font-mono tracking-wider text-sm'
            onClick={() => setPopup(!popup)}
          >
            CONNECT WALLET
          </div>
          
          {popup && (
            <div className='absolute top-14 right-0 bg-gradient-to-br from-gray-900/95 to-black/95 border border-purple-500/30 flex flex-col gap-2 rounded-lg p-4 shadow-2xl shadow-purple-500/20 backdrop-blur-xl z-50 min-w-[200px]'>
              <div className='text-purple-400 font-mono text-xs tracking-wider mb-2 text-center'>SELECT WALLET</div>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  className='bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-purple-900/30 hover:to-purple-900/30 border border-purple-600/30 hover:border-purple-400/50 rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 text-white hover:text-purple-300 font-mono text-sm tracking-wider group'
                  onClick={() => {
                    connect({connector});
                    setPopup(false);
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300'></div>
                    {connector.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        </>
    )
}

//disconnector for wallet
function Disconnect() {
    const { disconnect } = useDisconnect();

    return (
        <button 
          className='bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-800/70 hover:to-red-700/70 border border-red-500/30 hover:border-red-400/50 px-4 py-2 rounded-lg cursor-pointer hover:scale-105 duration-300 text-red-300 hover:text-red-200 shadow-lg shadow-red-500/25 font-mono text-sm tracking-wider transition-all duration-300'
          onClick={() => disconnect()}
        >
          DISCONNECT
        </button>
    )
}

export default AppBar