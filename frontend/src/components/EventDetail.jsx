"use client"

import React from 'react'

function EventDetail({ event, onBack }) {
  if (!event) return null;

  return (
    <div className='min-h-screen bg-black text-white relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Floating particles */}
        <div className='absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60'></div>
        <div className='absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-80'></div>
        <div className='absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70'></div>
        <div className='absolute top-80 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-pulse opacity-50'></div>
        <div className='absolute bottom-40 left-1/3 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-90'></div>
        
        {/* Circuit patterns */}
        <div className='absolute top-0 left-0 w-full h-full opacity-5'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-cyan-400 transform rotate-45'></div>
          <div className='absolute top-40 right-32 w-24 h-24 border border-green-400'></div>
          <div className='absolute bottom-32 left-1/4 w-28 h-28 border border-blue-400 transform rotate-12'></div>
          <div className='absolute bottom-20 right-1/4 w-20 h-20 border border-cyan-300'></div>
        </div>
        
        {/* Data streams */}
        <div className='absolute top-0 left-0 w-full h-full opacity-10'>
          <div className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse'></div>
          <div className='absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse'></div>
          <div className='absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse'></div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-6 relative z-10'>
        {/* Header with Back Button */}
        <div className='flex items-center gap-4 mb-8'>
          <button 
            onClick={onBack}
            className='flex items-center gap-2 px-4 py-2 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:bg-cyan-500/10 font-mono tracking-wider'
          >
            <div className='w-2 h-2 bg-cyan-400 rounded-full'></div>
            ← BACK TO CONTRACTS
          </button>
          <div className='flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent'></div>
        </div>

        {/* Event Header */}
        <div className='mb-8'>
          <div className='flex items-start justify-between mb-6'>
            <div className='flex items-center gap-4'>
              <div className='text-6xl relative'>
                {event.image}
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur animate-pulse'></div>
              </div>
              <div>
                <div className='text-xs font-mono text-cyan-400 tracking-widest mb-2'>
                  CONTRACT #{event.id.toString().padStart(6, '0')}
                </div>
                <div className='text-xs font-mono text-gray-500 mb-1'>
                  {event.blockchain} • {event.category}
                </div>
                <h1 className='text-4xl font-black text-white font-mono tracking-wide'>
                  {event.title}
                </h1>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-4xl font-black text-cyan-400 font-mono'>{event.price}</div>
              <div className='text-sm text-gray-500 font-mono tracking-wider'>GAS PRICE</div>
            </div>
          </div>

          {/* Network Status */}
          <div className='flex items-center gap-4 mb-6'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-green-400 font-mono text-sm tracking-wider'>CONTRACT VERIFIED</span>
            </div>
            <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
            <span className='text-gray-400 font-mono text-sm'>BLOCK #18,247,392</span>
            <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
            <span className='text-gray-400 font-mono text-sm'>TX HASH: 0x7a3b...</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-3 gap-8'>
          {/* Event Details - 2 columns */}
          <div className='col-span-2 space-y-6'>
            {/* Description */}
            <div className='bg-gradient-to-r from-gray-900/50 to-black border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm'>
              <h3 className='text-xl font-black mb-4 font-mono tracking-wider text-cyan-400'>
                CONTRACT DESCRIPTION
              </h3>
              <p className='text-gray-300 leading-relaxed font-mono text-sm'>
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <div className='bg-gradient-to-r from-gray-900/50 to-black border border-green-500/30 rounded-lg p-6 backdrop-blur-sm'>
              <h3 className='text-xl font-black mb-6 font-mono tracking-wider text-green-400'>
                EVENT PARAMETERS
              </h3>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                    <div>
                      <div className='text-xs font-mono text-gray-500 tracking-wider'>TIMESTAMP</div>
                      <div className='font-bold text-lg'>{event.date}</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-blue-400 rounded-full animate-pulse'></div>
                    <div>
                      <div className='text-xs font-mono text-gray-500 tracking-wider'>DURATION</div>
                      <div className='font-bold text-lg'>{event.time}</div>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
                    <div>
                      <div className='text-xs font-mono text-gray-500 tracking-wider'>NODE LOCATION</div>
                      <div className='font-bold text-lg'>{event.location}</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-cyan-400 rounded-full animate-pulse'></div>
                    <div>
                      <div className='text-xs font-mono text-gray-500 tracking-wider'>BLOCKCHAIN</div>
                      <div className='font-bold text-lg'>{event.blockchain}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Economics */}
            <div className='bg-gradient-to-r from-gray-900/50 to-black border border-yellow-500/30 rounded-lg p-6 backdrop-blur-sm'>
              <h3 className='text-xl font-black mb-6 font-mono tracking-wider text-yellow-400'>
                TOKEN ECONOMICS
              </h3>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-mono text-sm tracking-wider'>TOTAL SUPPLY</span>
                  <span className='text-2xl font-black text-yellow-400 font-mono'>{event.totalTickets}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-mono text-sm tracking-wider'>AVAILABLE TOKENS</span>
                  <span className='text-2xl font-black text-green-400 font-mono'>{event.tickets}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 font-mono text-sm tracking-wider'>SOLD TOKENS</span>
                  <span className='text-2xl font-black text-cyan-400 font-mono'>{event.totalTickets - event.tickets}</span>
                </div>
                
                {/* Progress Bar */}
                <div className='mt-6'>
                  <div className='flex justify-between text-xs font-mono mb-3'>
                    <span className='text-gray-500 tracking-wider'>SUPPLY UTILIZATION</span>
                    <span className='text-cyan-400'>{Math.round(((event.totalTickets - event.tickets) / event.totalTickets) * 100)}%</span>
                  </div>
                  <div className='w-full bg-gray-800 rounded-full h-4 border border-gray-700'>
                    <div 
                      className='bg-gradient-to-r from-cyan-500 to-green-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden'
                      style={{ width: `${((event.totalTickets - event.tickets) / event.totalTickets) * 100}%` }}
                    >
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Panel - 1 column */}
          <div className='col-span-1'>
            <div className='sticky top-6 space-y-6'>
              {/* Purchase Card */}
              <div className='bg-gradient-to-br from-gray-900/80 to-black border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm'>
                <h3 className='text-xl font-black mb-4 font-mono tracking-wider text-cyan-400'>
                  EXECUTE CONTRACT
                </h3>
                
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400 font-mono text-sm tracking-wider'>PRICE PER TOKEN</span>
                    <span className='text-2xl font-black text-cyan-400 font-mono'>{event.price}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400 font-mono text-sm tracking-wider'>QUANTITY</span>
                    <div className='flex items-center gap-2'>
                      <button className='w-8 h-8 border border-cyan-500/50 hover:border-cyan-400 rounded flex items-center justify-center font-mono text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200'>
                        -
                      </button>
                      <span className='text-xl font-black text-white font-mono px-4'>1</span>
                      <button className='w-8 h-8 border border-cyan-500/50 hover:border-cyan-400 rounded flex items-center justify-center font-mono text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200'>
                        +
                      </button>
                    </div>
                  </div>
                  <div className='w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4'></div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400 font-mono text-sm tracking-wider'>TOTAL COST</span>
                    <span className='text-2xl font-black text-green-400 font-mono'>{event.price}</span>
                  </div>
                </div>

                <button className='w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 py-4 rounded-lg font-black transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 font-mono tracking-wider relative overflow-hidden group/btn mb-4'>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700'></div>
                  <span className='relative z-10'>BUY TICKET</span>
                </button>

                <button className='w-full border border-cyan-500/50 hover:border-cyan-400 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-cyan-500/10 font-mono tracking-wider'>
                  VIEW SMART CONTRACT
                </button>
              </div>

              {/* Gas Price Monitor */}
              <div className='bg-gradient-to-br from-gray-900/50 to-black border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm'>
                <h4 className='text-lg font-black mb-3 font-mono tracking-wider text-yellow-400'>
                  GAS TRACKER
                </h4>
                <div className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 font-mono text-xs tracking-wider'>CURRENT GWEI</span>
                    <span className='text-lg font-black text-yellow-400 font-mono'>23</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 font-mono text-xs tracking-wider'>EST. GAS COST</span>
                    <span className='text-sm font-bold text-green-400 font-mono'>0.001 ETH</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className='bg-gradient-to-br from-gray-900/50 to-black border border-green-500/30 rounded-lg p-4 backdrop-blur-sm'>
                <h4 className='text-lg font-black mb-3 font-mono tracking-wider text-green-400'>
                  SECURITY
                </h4>
                <div className='space-y-2 text-xs font-mono'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span className='text-gray-400'>Contract Verified</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span className='text-gray-400'>Audited by CertiK</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span className='text-gray-400'>Immutable Contract</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail

