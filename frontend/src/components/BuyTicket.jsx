"use client"

import { useState } from 'react';

export default function BuyTicket({ event, eventIndex, onBuyTicket, isPending, isConfirming }) {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleBuyTicket = () => {
    if (quantity > 0 && quantity <= event.maxTicketsPerUser) {
      onBuyTicket(event.organizer, eventIndex, quantity, event.ticketPrice);
      setShowModal(false);
    }
  };

  const totalPrice = (Number(event.ticketPrice) * quantity / 1e18).toFixed(4);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isPending || isConfirming}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300 border border-green-500/50 hover:border-green-400 disabled:border-gray-500"
      >
        {isPending ? 'PROCESSING...' : isConfirming ? 'CONFIRMING...' : 'BUY TICKET'}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-mono text-white mb-4">Buy Tickets</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Event: {event.name}
                </label>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Price per ticket: {(Number(event.ticketPrice) / 1e18).toFixed(4)} ETH
                </label>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Max per user: {event.maxTicketsPerUser.toString()}
                </label>
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  max={event.maxTicketsPerUser}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-gray-400">Total Price:</span>
                  <span className="text-green-400">{totalPrice} ETH</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBuyTicket}
                  disabled={isPending || isConfirming || quantity <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  {isPending ? 'PROCESSING...' : isConfirming ? 'CONFIRMING...' : 'CONFIRM PURCHASE'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
