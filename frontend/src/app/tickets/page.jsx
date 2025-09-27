"use client"

import useEvent from "../../hooks/useEvent";
import Link from 'next/link';

export default function TicketsPage() {
  const {
    address,
    userTickets,
    eventsLoading,
    formatWeiToEth,
    formatAddress
  } = useEvent();

  if (!address) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono mb-4">Please connect your wallet</h1>
          <p className="text-gray-400">You need to connect your wallet to view your tickets.</p>
          <Link href="/" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (eventsLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-mono mb-4">Loading your tickets...</div>
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black font-mono mb-2">My Tickets</h1>
              <p className="text-gray-400 font-mono">View and manage your event tickets</p>
              <div className="mt-4 text-sm font-mono text-gray-500">
                Connected: {formatAddress(address)}
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
              >
                HOME
              </Link>
            </div>
          </div>
        </div>

        {/* Tickets Summary */}
        <div className="mb-8 bg-gradient-to-r from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-mono text-white mb-4">Ticket Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm font-mono text-gray-400 mb-2">Total Events</div>
              <div className="text-2xl font-mono text-purple-400">{userTickets.length}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm font-mono text-gray-400 mb-2">Total Tickets</div>
              <div className="text-2xl font-mono text-green-400">
                {userTickets.reduce((sum, ticket) => sum + ticket.ticketsOwned, 0)}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm font-mono text-gray-400 mb-2">Total Value</div>
              <div className="text-2xl font-mono text-yellow-400">
                {userTickets.reduce((sum, ticket) => 
                  sum + (ticket.ticketsOwned * Number(ticket.event.ticketPrice) / 1e18), 0
                ).toFixed(4)} ETH
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-mono font-black">Your Tickets ({userTickets.length})</h2>
          
          {userTickets.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-500/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🎫</div>
              <div className="text-xl font-mono text-gray-400 mb-2">No tickets found</div>
              <div className="text-sm font-mono text-gray-500 mb-4">You haven't purchased any tickets yet</div>
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
              >
                BROWSE EVENTS
              </Link>
            </div>
          ) : (
            userTickets.map((ticketData, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-mono font-black text-white">{ticketData.event.name}</h3>
                    <div className="text-sm font-mono text-gray-400">Event #{ticketData.eventIndex}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono text-green-400">{ticketData.ticketsOwned}</div>
                    <div className="text-sm font-mono text-gray-400">Tickets Owned</div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">TICKET PRICE</div>
                    <div className="text-lg font-mono text-purple-400">{formatWeiToEth(ticketData.event.ticketPrice)} ETH</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">TOTAL VALUE</div>
                    <div className="text-lg font-mono text-yellow-400">
                      {(ticketData.ticketsOwned * Number(ticketData.event.ticketPrice) / 1e18).toFixed(4)} ETH
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">EVENT SUPPLY</div>
                    <div className="text-lg font-mono text-blue-400">{ticketData.event.maxSupply.toString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">SOLD</div>
                    <div className="text-lg font-mono text-green-400">{ticketData.event.ticketsSold.toString()}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-gray-500">EVENT SALES PROGRESS</span>
                    <span className="text-purple-400">{ticketData.event.ticketsSold.toString()}/{ticketData.event.maxSupply.toString()}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(Number(ticketData.event.ticketsSold) / Number(ticketData.event.maxSupply)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="text-xs font-mono text-gray-500">
                  Organizer: {formatAddress(ticketData.event.organizer)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
