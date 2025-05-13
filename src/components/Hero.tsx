
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Key, Lock, Wallet } from "lucide-react";
import GlassmorphicCard from './GlassmorphicCard';
import { useWallet } from '@/context/WalletContext';

interface HeroProps {
  onConnectWallet: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConnectWallet }) => {
  const { isConnected } = useWallet();
  const [typedText, setTypedText] = useState('');
  const fullText = "Preserve Your Digital Legacy";
  const [typingComplete, setTypingComplete] = useState(false);
  
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    } else if (!typingComplete) {
      setTypingComplete(true);
    }
  }, [typedText, typingComplete]);
  
  return (
    <section className="min-h-screen pt-24 pb-12 flex flex-col justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-eternavault-accent/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-eternavault-blue/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-eternavault-magenta/10 rounded-full filter blur-3xl animate-float"></div>
      
      {/* Grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_2rem] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex mb-6 px-4 py-2 rounded-full bg-eternavault-dark border border-eternavault-accent/20 text-sm text-eternavault-accent font-medium animate-fade-in">
              <span className="animate-pulse mr-2">•</span>
              Secure Your Digital Legacy with Web3
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              <span className="heading-gradient relative inline-block">
                {typedText}
                {!typingComplete && <span className="absolute right-0 top-0 h-full w-px bg-eternavault-accent animate-pulse"></span>}
              </span>{" "}
              <span 
                className={`relative transition-opacity duration-1000 ${typingComplete ? 'opacity-100' : 'opacity-0'}`}
              >
                For Eternity
                <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-eternavault-blue via-eternavault-accent to-eternavault-magenta"></div>
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{animationDelay: "0.5s"}}>
              EternaVault empowers you to secure your digital assets and share them with trusted individuals,
              ensuring your legacy lives on through blockchain technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{animationDelay: "0.7s"}}>
              {isConnected ? (
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity text-white border-none">
                  Create Your Vault
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={onConnectWallet} 
                  className="bg-gradient-to-r from-eternavault-accent to-eternavault-blue hover:opacity-90 transition-opacity text-white border-none relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-1/3 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  Connect Wallet
                  <Wallet className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              <Button size="lg" variant="outline" className="border-eternavault-accent/30 text-white hover:bg-eternavault-accent/10 transition-all">
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 animate-fade-in" style={{animationDelay: "1s"}}>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <Shield className="h-8 w-8 text-eternavault-accent mb-2 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-eternavault-accent/40 rounded-full filter blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all"></div>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-white transition-colors">Bank-grade Security</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <Lock className="h-8 w-8 text-eternavault-blue mb-2 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-eternavault-blue/40 rounded-full filter blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all"></div>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-white transition-colors">End-to-end Encryption</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <Key className="h-8 w-8 text-eternavault-magenta mb-2 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-eternavault-magenta/40 rounded-full filter blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all"></div>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-white transition-colors">Blockchain Verified</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in" style={{animationDelay: "0.8s"}}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-eternavault-magenta/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-eternavault-blue/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
              
              {/* Floating elements */}
              <div className="absolute top-5 -left-10 rotate-12 transform animate-float" style={{animationDelay: "1.2s"}}>
                <GlassmorphicCard className="p-3 w-20 h-20 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-eternavault-accent" />
                </GlassmorphicCard>
              </div>
              <div className="absolute bottom-10 -right-5 -rotate-6 transform animate-float" style={{animationDelay: "0.8s"}}>
                <GlassmorphicCard className="p-3 w-16 h-16 flex items-center justify-center">
                  <Key className="h-8 w-8 text-eternavault-blue" />
                </GlassmorphicCard>
              </div>
              
              {/* Main showcase card */}
              <GlassmorphicCard className="p-6 md:p-8 relative z-10 border border-white/10 shadow-[0_0_25px_rgba(155,135,245,0.15)]">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-eternavault-accent/20 relative group">
                      <Shield className="h-6 w-6 text-eternavault-accent relative z-10" />
                      <div className="absolute inset-0 bg-eternavault-accent/40 rounded-full filter blur-lg opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-medium text-white">Your Digital Vault</h3>
                      <p className="text-sm text-gray-400">Securely stored on the blockchain</p>
                    </div>
                  </div>
                  
                  {/* Vault preview */}
                  <div className="grid grid-cols-2 gap-4">
                    <GlassmorphicCard className="p-4 text-center relative overflow-hidden group" intensity="light">
                      <div className="absolute inset-0 bg-gradient-to-br from-eternavault-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <h4 className="text-sm font-medium text-eternavault-blue mb-1">Digital Assets</h4>
                      <p className="text-2xl font-bold font-heading">14</p>
                    </GlassmorphicCard>
                    <GlassmorphicCard className="p-4 text-center relative overflow-hidden group" intensity="light">
                      <div className="absolute inset-0 bg-gradient-to-br from-eternavault-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <h4 className="text-sm font-medium text-eternavault-magenta mb-1">Nominees</h4>
                      <p className="text-2xl font-bold font-heading">3</p>
                    </GlassmorphicCard>
                    <GlassmorphicCard className="p-4 text-center col-span-2 relative overflow-hidden group" intensity="light">
                      <div className="absolute inset-0 bg-gradient-to-br from-eternavault-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <h4 className="text-sm font-medium text-eternavault-accent mb-1">NFTs Created</h4>
                      <p className="text-2xl font-bold font-heading">5</p>
                    </GlassmorphicCard>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <Button className="w-full relative overflow-hidden group bg-eternavault-accent hover:bg-eternavault-accent2 text-white">
                    <span className="absolute inset-0 w-1/2 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    Create Your Vault
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
