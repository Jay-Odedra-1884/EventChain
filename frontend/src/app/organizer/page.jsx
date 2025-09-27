"use client"

import { useState } from 'react';
import useEvent from "../../hooks/useEvent";
import Link from 'next/link';

export default function OrganizerPage() {
  const {
    address,
    userEvents,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    updateMaxSupply,
    updateTicketPrice,
    updateMaxTicketsPerUser,
    withdrawFunds,
    formatWeiToEth,
    formatAddress
  } = useEvent();

  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    maxSupply: '',
    ticketPrice: '',
    maxTicketsPerUser: ''
  });

  const handleEditEvent = (event, index) => {
    setEditingEvent(index);
    setEditForm({
      name: event.name,
      maxSupply: event.maxSupply.toString(),
      ticketPrice: (Number(event.ticketPrice) / 1e18).toString(),
      maxTicketsPerUser: event.maxTicketsPerUser.toString()
    });
  };

  const handleSaveEvent = () => {
    if (editingEvent !== null) {
      // Update the event with new values - call them sequentially
      const currentEvent = userEvents[editingEvent];
      
      // Only update if values have changed
      if (editForm.maxSupply !== currentEvent.maxSupply.toString()) {
        updateMaxSupply(editingEvent, editForm.maxSupply);
      }
      
      if (editForm.ticketPrice !== (Number(currentEvent.ticketPrice) / 1e18).toString()) {
        updateTicketPrice(editingEvent, (Number(editForm.ticketPrice) * 1e18).toString());
      }
      
      if (editForm.maxTicketsPerUser !== currentEvent.maxTicketsPerUser.toString()) {
        updateMaxTicketsPerUser(editingEvent, editForm.maxTicketsPerUser);
      }
      
      setEditingEvent(null);
      setEditForm({
        name: '',
        maxSupply: '',
        ticketPrice: '',
        maxTicketsPerUser: ''
      });
    }
  };


  if (!address) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono mb-4">Please connect your wallet</h1>
          <p className="text-gray-400">You need to connect your wallet to access the organizer dashboard.</p>
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
              <h1 className="text-4xl font-black font-mono mb-2">Organizer Dashboard</h1>
              <p className="text-gray-400 font-mono">Manage your events and track sales</p>
              <div className="mt-4 text-sm font-mono text-gray-500">
                Connected: {formatAddress(address)}
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/organize-event"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
              >
                CREATE EVENT
              </Link>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
              >
                HOME
              </Link>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {isConfirmed && (
          <div className="bg-green-900/50 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="text-green-400 font-mono text-sm">
              Transaction confirmed successfully!
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500/30 rounded-lg p-4 mb-6">
            <div className="text-red-400 font-mono text-sm">
              Error: {error.message || "Transaction failed"}
            </div>
          </div>
        )}

        {/* Withdraw Button */}
        <div className="mb-8">
          <button
            onClick={withdrawFunds}
            disabled={isPending || isConfirming}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
          >
            {isPending ? 'PROCESSING...' : isConfirming ? 'CONFIRMING...' : 'WITHDRAW FUNDS'}
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-mono font-black">Your Events ({userEvents.length})</h2>
          
          {userEvents.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-500/30 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📅</div>
              <div className="text-xl font-mono text-gray-400 mb-2">No events created</div>
              <div className="text-sm font-mono text-gray-500">Create your first event to get started</div>
            </div>
          ) : (
            userEvents.map((event, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-mono font-black text-white">{event.name}</h3>
                    <div className="text-sm font-mono text-gray-400">Event #{index}</div>
                  </div>
                  <button
                    onClick={() => handleEditEvent(event, index)}
                    className="bg-gradient-to-r from-blue-600/20 to-blue-600/20 hover:from-blue-600/30 hover:to-blue-600/30 border border-blue-500/30 hover:border-blue-400/50 px-4 py-2 rounded-lg font-mono text-sm tracking-wider text-blue-300 hover:text-blue-200 transition-all duration-300"
                  >
                    EDIT
                  </button>
                </div>

                {/* Event Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">MAX SUPPLY</div>
                    <div className="text-lg font-mono text-white">{event.maxSupply.toString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">SOLD</div>
                    <div className="text-lg font-mono text-green-400">{event.ticketsSold.toString()}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">PRICE</div>
                    <div className="text-lg font-mono text-purple-400">{formatWeiToEth(event.ticketPrice)} ETH</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs font-mono text-gray-500 mb-1">MAX PER USER</div>
                    <div className="text-lg font-mono text-blue-400">{event.maxTicketsPerUser.toString()}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-gray-500">TICKET SALES</span>
                    <span className="text-purple-400">{event.ticketsSold.toString()}/{event.maxSupply.toString()}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(Number(event.ticketsSold) / Number(event.maxSupply)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Edit Form */}
                {editingEvent === index && (
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-lg font-mono text-white mb-4">Edit Event</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-mono text-gray-400 mb-2">Max Supply</label>
                        <input
                          type="number"
                          value={editForm.maxSupply}
                          onChange={(e) => setEditForm({...editForm, maxSupply: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-mono text-gray-400 mb-2">Ticket Price (ETH)</label>
                        <input
                          type="number"
                          step="0.001"
                          value={editForm.ticketPrice}
                          onChange={(e) => setEditForm({...editForm, ticketPrice: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-mono text-gray-400 mb-2">Max Per User</label>
                        <input
                          type="number"
                          value={editForm.maxTicketsPerUser}
                          onChange={(e) => setEditForm({...editForm, maxTicketsPerUser: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveEvent}
                        disabled={isPending || isConfirming}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                      >
                        {isPending ? 'SAVING...' : isConfirming ? 'CONFIRMING...' : 'SAVE CHANGES'}
                      </button>
                      <button
                        onClick={() => setEditingEvent(null)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
