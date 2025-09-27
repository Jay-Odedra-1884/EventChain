"use client"

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '../utils/Config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function Provider({children}) {
    const queryclient = new QueryClient();
  return (
    <>
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
    </>
  )
}

export default Provider
