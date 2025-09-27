"use client"

import { useState } from 'react';
import useEvent from '../hooks/useEvent';

export default function TestBuyTicket() {
  const { events, buyTicket, isPending, isConfirming, error } = useEvent();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!events || events.length === 0) {
    return <div className="text-white">No events available</div>;
  }

  const handleTestBuy = () => {
    if (selectedEvent !== null) {
      const event = events[selectedEvent];
      console.log('Testing buy ticket for event:', event);
      buyTicket(event.organizer, selectedEvent, quantity, event.ticketPrice);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-white">
      <h3 className="text-lg font-mono mb-4">Test Buy Ticket</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-mono text-gray-400 mb-2">Select Event:</label>
        <select 
          value={selectedEvent || ''} 
          onChange={(e) => setSelectedEvent(parseInt(e.target.value))}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
        >
          <option value="">Select an event</option>
          {events.map((event, index) => (
            <option key={index} value={index}>
              {event.name} - {(Number(event.ticketPrice) / 1e18).toFixed(4)} ETH
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-mono text-gray-400 mb-2">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
        />
      </div>

      <button
        onClick={handleTestBuy}
        disabled={isPending || isConfirming || selectedEvent === null}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm"
      >
        {isPending ? 'PROCESSING...' : isConfirming ? 'CONFIRMING...' : 'TEST BUY TICKET'}
      </button>

      {error && (
        <div className="mt-4 text-red-400 text-sm font-mono">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
