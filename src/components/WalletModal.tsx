
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWallet } from '@/context/WalletContext';
import { Button } from "@/components/ui/button";
import { Wallet, Loader2, ArrowRight, Check, X } from "lucide-react";
import GlassmorphicCard from './GlassmorphicCard';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletOptions = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '/phantom.svg',
    description: 'Connect to your Phantom wallet (Recommended)',
    popular: true
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '/metamask.svg',
    description: 'Connect to your MetaMask wallet'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/walletconnect.svg',
    description: 'Scan with your favorite wallet to connect'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '/coinbase.svg',
    description: 'Connect to your Coinbase wallet'
  }
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { isConnected, isConnecting, connectWallet, disconnectWallet, address, balance } = useWallet();
  
  const handleConnect = async (providerId: string) => {
    await connectWallet(providerId);
    onClose();
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#13151c] border-purple-500/20 text-white backdrop-blur-xl shadow-lg shadow-purple-500/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">
            {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {isConnected ? 'Your wallet is currently connected to EternaVault.' : 'Connect your wallet to access EternaVault features.'}
          </DialogDescription>
        </DialogHeader>
        
        {isConnected ? (
          <div className="space-y-6">
            <GlassmorphicCard className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-green-500/20 mb-2">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold font-heading">Connected to Phantom</h3>
                <p className="text-sm text-gray-300">
                  {address?.substring(0, 10)}...{address?.substring(address.length - 8)}
                </p>
                <div className="bg-indigo-500/10 px-4 py-2 rounded-full text-indigo-300 font-medium">
                  {balance} SOL
                </div>
              </div>
            </GlassmorphicCard>
            
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300"
            >
              <X className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                disabled={isConnecting}
                className={`relative flex items-center p-4 rounded-lg transition-all ${
                  wallet.id === 'phantom' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 animate-glow'
                    : isConnecting
                      ? 'bg-indigo-500/5 cursor-not-allowed'
                      : 'bg-indigo-500/10 hover:bg-indigo-500/20 cursor-pointer'
                }`}
              >
                <div className="mr-4 h-10 w-10 flex items-center justify-center bg-white/10 rounded-md">
                  <img src={wallet.icon} alt={wallet.name} className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center">
                    <h3 className="font-semibold">{wallet.name}</h3>
                    {wallet.popular && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{wallet.description}</p>
                </div>
                {isConnecting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                ) : (
                  <ArrowRight className="h-5 w-5 text-purple-400" />
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-lg border border-purple-500/0 hover:border-purple-500/50 transition-all duration-300"></div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
