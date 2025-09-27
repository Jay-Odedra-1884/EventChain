"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function CreateEventForm({ onCreateEvent, isPending, isConfirming }) {
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
      
      onCreateEvent(
        formData.name,
        parseInt(formData.maxSupply),
        ticketPriceInWei
      );
      
      // Reset form
      setFormData({
        name: '',
        maxSupply: '',
        ticketPrice: ''
      });
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Create Event Button */}
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-mono text-white mb-4">Create New Event</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Event Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Max Supply */}
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Max Tickets:
                </label>
                <input
                  type="number"
                  name="maxSupply"
                  value={formData.maxSupply}
                  onChange={handleInputChange}
                  placeholder="Enter maximum tickets"
                  min="1"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Ticket Price */}
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Ticket Price (ETH):
                </label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  placeholder="Enter price in ETH"
                  step="0.001"
                  min="0"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isPending || isConfirming}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  {isPending ? 'CREATING...' : isConfirming ? 'CONFIRMING...' : 'CREATE EVENT'}
                </button>
                <div 
                  className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                
                >
                  <Link href={"/"}>CANCEL</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    </>
  );
}
