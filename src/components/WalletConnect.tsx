
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from '@/context/WalletContext';

interface WalletConnectProps {
  onClick: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onClick }) => {
  const { isConnected, address } = useWallet();
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={onClick}
        className={`group relative overflow-hidden rounded-full shadow-lg transition-transform hover:scale-105 ${
          isConnected
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400'
        }`}
        size="lg"
      >
        <div className="absolute inset-0 bg-white/20 w-1/2 backdrop-blur-lg transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <Wallet className="mr-2 h-5 w-5" />
        
        {isConnected ? (
          <span>
            {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
          </span>
        ) : (
          <span>Connect Phantom</span>
        )}
      </Button>
    </div>
  );
};

export default WalletConnect;
