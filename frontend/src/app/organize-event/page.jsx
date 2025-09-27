"use client"

import { useState } from 'react';
import useEvent from "../../hooks/useEvent";
import Link from 'next/link';

export default function OrganizeEventPage() {
  const {
    address,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    createEvent,
    formatAddress
  } = useEvent();

  const [formData, setFormData] = useState({
    name: '',
    maxSupply: '',
    ticketPrice: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.maxSupply && formData.ticketPrice) {
      // Convert ticket price from ETH to Wei
      const ticketPriceInWei = (parseFloat(formData.ticketPrice) * 1e18).toString();
      
      createEvent(formData.name, parseInt(formData.maxSupply), ticketPriceInWei);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono mb-4">Please connect your wallet</h1>
          <p className="text-gray-400">You need to connect your wallet to create events.</p>
          <Link href="/" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-black font-mono mb-2">Create New Event</h1>
          <p className="text-gray-400 font-mono">Launch your event on the blockchain</p>
        </div>

        {/* Success/Error Messages */}
        {isConfirmed && (
          <div className="bg-green-900/50 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="text-green-400 font-mono text-sm">
              Event created successfully! <Link href="/organizer" className="underline">View in Dashboard</Link>
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

        {/* Create Event Form */}
        <div className="bg-gradient-to-r from-gray-900/50 to-black border border-purple-500/30 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-lg font-mono text-gray-300 mb-3">
                Event Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your event name"
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Max Supply */}
            <div>
              <label className="block text-lg font-mono text-gray-300 mb-3">
                Maximum Tickets:
              </label>
              <input
                type="number"
                name="maxSupply"
                value={formData.maxSupply}
                onChange={handleInputChange}
                placeholder="Enter maximum number of tickets"
                min="1"
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-lg font-mono text-gray-300 mb-3">
                Ticket Price (ETH):
              </label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                placeholder="Enter price in ETH (e.g., 0.1)"
                step="0.001"
                min="0"
                required
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isPending || isConfirming}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-lg font-mono text-lg tracking-wider transition-all duration-300"
              >
                {isPending ? 'CREATING...' : isConfirming ? 'CONFIRMING...' : 'CREATE EVENT'}
              </button>
              <Link
                href="/"
                className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-mono text-lg tracking-wider transition-all duration-300"
              >
                CANCEL
              </Link>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-mono text-white mb-4">Event Creation Info</h3>
          <div className="space-y-3 text-sm font-mono text-gray-400">
            <div>• Your event will be created on the blockchain</div>
            <div>• You can edit event details later in the organizer dashboard</div>
            <div>• Maximum 5 tickets per user (default setting)</div>
            <div>• You can withdraw funds after tickets are sold</div>
          </div>
        </div>
      </div>
    </div>
  );
}