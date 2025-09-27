
"use client"

import React from 'react'
import useEvent from "../hooks/useEvent"
import BuyTicket from "./BuyTicket"
import TestBuyTicket from "./TestBuyTicket"
import Link from "next/link";


function Landing() {

  let { event, address, events, buyTicket, isPending, isConfirming, isConfirmed, error, formatWeiToEth, formatAddress } = useEvent();



  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Floating particles */}
        <div className='absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60'></div>
        <div className='absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-80'></div>
        <div className='absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-70'></div>
        <div className='absolute top-80 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-50'></div>
        <div className='absolute bottom-40 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-90'></div>

        {/* Circuit patterns */}
        <div className='absolute top-0 left-0 w-full h-full opacity-5'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-purple-400 transform rotate-45'></div>
          <div className='absolute top-40 right-32 w-24 h-24 border border-purple-400'></div>
          <div className='absolute bottom-32 left-1/4 w-28 h-28 border border-purple-400 transform rotate-12'></div>
          <div className='absolute bottom-20 right-1/4 w-20 h-20 border border-purple-300'></div>
        </div>

        {/* Data streams */}
        <div className='absolute top-0 left-0 w-full h-full opacity-10'>
          <div className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse'></div>
          <div className='absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse'></div>
          <div className='absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse'></div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6 relative z-10'>
        {/* Hero Section */}
        <div className='text-center mb-12 relative mt-10'>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-500/5 blur-3xl rounded-full'></div>
          <h1 className='text-6xl font-black mb-4 relative z-10 font-mono tracking-wider'>
            <span className='bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent animate-pulse'>
              EVENTCHAIN
            </span>
          </h1>
          <div className='text-2xl font-bold mb-2 relative z-10 text-gray-300 font-mono'>
            DECENTRALIZED EVENT PROTOCOL
          </div>
          <p className='text-lg text-gray-400 font-mono tracking-widest relative z-10'>
            IMMUTABLE • TRANSPARENT • TRUSTLESS
          </p>

          {/* Network Status */}
          <div className='mt-6 flex justify-center items-center gap-3 relative z-10'>
            <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
            <span className='text-purple-400 font-mono text-sm tracking-wider'>NETWORK ONLINE</span>
            <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
            <span className='text-gray-400 font-mono text-sm'>Wallet: {formatAddress(address)}</span>
          </div>

          {/* Navigation Links */}
        </div>
          {address && (
            <div className='flex  gap-5 justify-center mb-10 z-10'>
              <Link href={"/organizer"}><div className='bg-gradient-to-r from-blue-600/20 to-blue-600/20 hover:from-blue-600/30 hover:to-blue-600/30 border border-blue-500/30 hover:border-blue-400/50 px-4 py-2 rounded-lg font-mono text-sm tracking-wider text-blue-300 hover:text-blue-200 transition-all duration-300 cursor-pointer'
              >
                Organizer Dashboard
              </div></Link>
              <Link href={'tickets'}>
                <div className='bg-gradient-to-r from-green-600/20 to-green-600/20 hover:from-green-600/30 hover:to-green-600/30 border border-green-500/30 hover:border-green-400/50 px-4 py-2 rounded-lg font-mono text-sm tracking-wider text-green-300 hover:text-green-200 transition-all duration-300 cursor-pointer'
                >
                  MY TICKETS
                </div>
              </Link>
            </div>
          )}

        {/* Main Content Grid */}
        <div className='grid grid-cols-12 gap-6'>
          {/* Event Cards Section - 8 columns */}
          <div className='col-span-8 space-y-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-3xl font-black font-mono tracking-widest flex items-center gap-3'>
                <div className='w-4 h-4 bg-purple-400 rounded-full animate-pulse'></div>
                <span className='bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent'>
                  ACTIVE CONTRACTS
                </span>
              </h2>
              <button
                onClick={() => { refetch(); console.log("button clicked") }}
                className='bg-gradient-to-r from-purple-600/20 to-purple-600/20 hover:from-purple-600/30 hover:to-purple-600/30 border border-purple-500/30 hover:border-purple-400/50 px-4 py-2 rounded-lg font-mono text-sm tracking-wider text-purple-300 hover:text-purple-200 transition-all duration-300'
              >
                REFRESH
              </button>
            </div>
            {/* Success Message */}
            {isConfirmed && (
              <div className='bg-purple-900/50 border border-purple-500/30 rounded-lg p-4 mb-6'>
                <div className='text-purple-400 font-mono text-sm flex items-center gap-2'>
                  <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
                  Event created successfully! Refreshing events...
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className='bg-red-900/50 border border-red-500/30 rounded-lg p-4 mb-6'>
                <div className='text-red-400 font-mono text-sm'>
                  Error: {error.message || "Contract call failed"}
                </div>
              </div>
            )}

            {/* Events List */}
            {
              console.log("Events:")

            }
            {
              console.log(events)
            }
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className='bg-gradient-to-r from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-6 mb-4'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='text-4xl'>🎫</div>
                      <div>
                        <div className='text-xs font-mono text-purple-400 tracking-widest mb-1'>
                          CONTRACT #{index.toString().padStart(6, '0')}
                        </div>
                        <div className='text-xs font-mono text-gray-500'>
                          Ethereum • EVENT
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-3xl font-black text-purple-400 font-mono'>{formatWeiToEth(event.ticketPrice)} ETH</div>
                      <div className='text-xs text-gray-500 font-mono tracking-wider'>TICKET PRICE</div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h3 className='text-2xl font-black text-purple-300 font-mono mb-3 tracking-wide'>
                    {event.name}
                  </h3>

                  {/* Event Details Grid */}
                  <div className='grid grid-cols-3 gap-4 mb-6'>
                    <div className='flex items-center gap-3'>
                      <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
                      <div>
                        <div className='text-xs font-mono text-gray-500 tracking-wider'>MAX SUPPLY</div>
                        <div className='font-bold text-sm'>{event.maxSupply.toString()}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
                      <div>
                        <div className='text-xs font-mono text-gray-500 tracking-wider'>TICKETS SOLD</div>
                        <div className='font-bold text-sm'>{event.ticketsSold.toString()}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
                      <div>
                        <div className='text-xs font-mono text-gray-500 tracking-wider'>MAX PER USER</div>
                        <div className='font-bold text-sm'>{event.maxTicketsPerUser.toString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Token Supply Progress */}
                  <div className='mb-6'>
                    <div className='flex justify-between text-xs font-mono mb-3'>
                      <span className='text-gray-500 tracking-wider'>TICKET SUPPLY</span>
                      <span className='text-purple-400'>{event.ticketsSold.toString()}/{event.maxSupply.toString()}</span>
                    </div>
                    <div className='w-full bg-gray-800 rounded-full h-3 border border-gray-700'>
                      <div
                        className='bg-gradient-to-r from-purple-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden'
                        style={{ width: `${(Number(event.ticketsSold) / Number(event.maxSupply)) * 100}%` }}
                      >
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse'></div>
                      </div>
                    </div>
                  </div>

                  {/* Buy Ticket Section */}
                  <div className='mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700'>
                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <div className='text-sm font-mono text-gray-400'>Price per ticket</div>
                        <div className='text-xl font-bold text-green-400'>{formatWeiToEth(event.ticketPrice)} ETH</div>
                      </div>
                      <BuyTicket
                        event={event}
                        eventIndex={index}
                        onBuyTicket={buyTicket}
                        isPending={isPending}
                        isConfirming={isConfirming}
                      />
                    </div>
                  </div>

                  {/* Organizer Address */}
                  <div className='text-xs font-mono text-gray-500'>
                    Organizer: {formatAddress(event.organizer)}
                  </div>
                </div>
              ))
            ) : (
              <div className='bg-gradient-to-r from-gray-900/50 to-black border border-gray-500/30 rounded-lg p-8 text-center'>
                <div className='text-4xl mb-4'>📋</div>
                <div className='text-xl font-mono text-gray-400 mb-2'>No Events Found</div>
                <div className='text-sm font-mono text-gray-500'>Create your first event to get started</div>
              </div>
            )}
          </div>

          {/* Info Card Section - 4 columns */}
          <div className='col-span-4'>
            <div className='sticky top-6 space-y-6'>
              {/* Create Event Card */}
              <div className='bg-gradient-to-r from-purple-600 to-purple-600 rounded-lg p-6 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                <h3 className='text-xl font-black mb-2 relative z-10 font-mono tracking-wider'>CREATE EVENT</h3>
                <p className='text-purple-100 mb-4 relative z-10 text-sm font-mono'>Launch your event on the blockchain</p>
                <Link href="/organize-event"><div className="w-1/2 mx-auto bg-black border border-black text-white text-lg font-semibold rounded-lg px-2 py-4 hover:bg-black hover:text-white hover:scale-110 transition-all duration-150">Create Event</ div></ Link>

              </div>

              {/* Test Component */}
              <div className='mb-6'>
                <TestBuyTicket />
              </div>

              {/* Network Stats Card */}
              <div className='bg-gradient-to-br from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm'>
                <h3 className='text-xl font-black mb-4 font-mono flex items-center gap-2 tracking-wider'>
                  <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
                  <span className='bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent'>
                    NETWORK STATS
                  </span>
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 font-mono text-xs tracking-wider'>ACTIVE CONTRACTS</span>
                    <span className='text-2xl font-black text-purple-400 font-mono'>{events ? events.length : 0}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 font-mono text-xs tracking-wider'>TOTAL TICKETS</span>
                    <span className='text-2xl font-black text-purple-400 font-mono'>
                      {events ? events.reduce((sum, event) => sum + Number(event.maxSupply), 0) : 0}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 font-mono text-xs tracking-wider'>TICKETS SOLD</span>
                    <span className='text-2xl font-black text-purple-400 font-mono'>
                      {events ? events.reduce((sum, event) => sum + Number(event.ticketsSold), 0) : 0}
                    </span>
                  </div>
                  <div className='w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent my-4'></div>
                  <div className='text-center'>
                    <div className='text-xs text-gray-500 font-mono mb-2 tracking-wider'>BLOCKCHAIN STATUS</div>
                    <div className='flex items-center justify-center gap-2'>
                      <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
                      <span className='text-purple-400 font-black text-sm font-mono tracking-wider'>SYNCHRONIZED</span>
                    </div>
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

export default Landing
