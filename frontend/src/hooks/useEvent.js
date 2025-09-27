"use client"

import { abi } from "../abi/abi";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";

export default function useEvent() {
  const { address } = useAccount();
  const [userEvents, setUserEvents] = useState([]);
  const [userTickets, setUserTickets] = useState([]);

  // Read all events
  const { data: events, refetch: refetchEvents, isLoading: eventsLoading, error: eventsError } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi.abi,
    functionName: "getEventsDetails",
  });

  // Read specific event details
  const { data: event } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi.abi,
    functionName: "getEventDetails",
    args: [address? address : undefined, 0]
  });

  // Setup write contract
  const { writeContract, data: txHash, isPending, error } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Filter user events when events data changes
  useEffect(() => {
    if (events && address) {
      const filtered = events.filter(event => 
        event.organizer.toLowerCase() === address.toLowerCase()
      );
      setUserEvents(filtered);
    }
  }, [events, address]);

  // Calculate user tickets when events data changes
  useEffect(() => {
    if (events && address) {
      const tickets = [];
      
      events.forEach((event, index) => {
        // This would need to be implemented with a contract call to get tickets owned
        // For now, we'll simulate it
        tickets.push({
          eventIndex: index,
          event: event,
          ticketsOwned: 0 // This should be fetched from contract
        });
      });
      
      setUserTickets(tickets);
    }
  }, [events, address]);

  // Refetch events when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      console.log("Transaction confirmed, refetching events...");
      refetchEvents();
    }
  }, [isConfirmed, refetchEvents]);

  // Debug: Log events when they change
  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);

  // Contract write functions
  const createEvent = (name, maxSupply, ticketPrice) => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "createEvent",
      args: [name, maxSupply, ticketPrice],
    });
  };

  const buyTicket = (organizer, eventIndex, quantity, ticketPrice) => {
    console.log('BuyTicket called with:', { organizer, eventIndex, quantity, ticketPrice });
    const totalPrice = BigInt(ticketPrice) * BigInt(quantity);
    console.log('Total price calculated:', totalPrice.toString());
    
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "buyTicket",
      args: [organizer, eventIndex, quantity],
      value: totalPrice,
    });
  };

  const updateMaxSupply = (eventIndex, newSupply) => {
    console.log('Updating max supply:', { eventIndex, newSupply });
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "changeMaxSupply",
      args: [eventIndex, newSupply],
    });
  };

  const updateTicketPrice = (eventIndex, newPrice) => {
    console.log('Updating ticket price:', { eventIndex, newPrice });
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "changeTicketPrice",
      args: [eventIndex, newPrice],
    });
  };

  const updateMaxTicketsPerUser = (eventIndex, newLimit) => {
    console.log('Updating max tickets per user:', { eventIndex, newLimit });
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "changeMaxTicketsPerUser",
      args: [eventIndex, newLimit],
    });
  };

  const withdrawFunds = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi.abi,
      functionName: "withdraw",
      args: [],
    });
  };

  // Helper functions
  const formatWeiToEth = (wei) => {
    return (Number(wei) / 1e18).toFixed(4);
  };

  const formatAddress = (addr) => {
    if (!addr) return "Not connected";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return {
    // Data
    event,
    events,
    userEvents,
    userTickets,
    address,
    
    // Loading states
    eventsLoading,
    isPending,
    isConfirming,
    isConfirmed,
    
    // Errors
    error,
    eventsError,
    
    // Functions
    createEvent,
    buyTicket,
    updateMaxSupply,
    updateTicketPrice,
    updateMaxTicketsPerUser,
    withdrawFunds,
    
    // Utilities
    formatWeiToEth,
    formatAddress,
    
    // Refetch
    refetchEvents,
    txHash,
  };
}
