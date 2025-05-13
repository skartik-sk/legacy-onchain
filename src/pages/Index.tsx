
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import WalletConnect from '@/components/WalletConnect';
import { WalletProvider } from '@/context/WalletContext';
import { toast } from "sonner";
import WalletModal from '@/components/WalletModal';

const Index = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    // Welcome toast on first load
    toast("Welcome to EternaVault", {
      description: "Secure your digital legacy with blockchain technology",
      position: "bottom-right",
    });
  }, []);

  return (
    <WalletProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-eternavault-dark text-white overflow-x-hidden relative">
          {/* Dynamic background elements */}
          <ParticleBackground />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-eternavault-dark/50 to-eternavault-dark pointer-events-none"></div>
          
          {/* Main content */}
          <div className="relative z-10">
            <Navbar onConnectWallet={() => setShowWalletModal(true)} />
            <main>
              <Hero onConnectWallet={() => setShowWalletModal(true)} />
              <Features />
            </main>
            <Footer />
            
            {/* Floating wallet connect button */}
            <WalletConnect onClick={() => setShowWalletModal(true)} />
            
            {/* Wallet connection modal */}
            <WalletModal 
              isOpen={showWalletModal} 
              onClose={() => setShowWalletModal(false)} 
            />
          </div>
        </div>
      </ThemeProvider>
    </WalletProvider>
  );
};

export default Index;
