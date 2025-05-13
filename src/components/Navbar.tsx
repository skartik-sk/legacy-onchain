
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Shield, Key, Lock, Wallet } from "lucide-react";
import { useWallet } from '@/context/WalletContext';

interface NavbarProps {
  onConnectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectWallet }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, address } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2 bg-eternavault-dark/80 backdrop-blur-xl shadow-lg border-b border-eternavault-accent/10' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-eternavault-accent relative z-10" />
            <div className="absolute inset-0 bg-eternavault-accent/40 rounded-full filter blur-lg group-hover:blur-xl transition-all opacity-80 group-hover:opacity-100 animate-pulse-slow"></div>
          </div>
          <span className="text-xl font-bold font-heading text-white relative">
            EternaVault
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-eternavault-accent via-eternavault-blue to-eternavault-magenta transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Home</Link>
          <Link to="/features" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Features</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Pricing</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">About</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white group relative overflow-hidden">
            Sign In
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-eternavault-accent group-hover:w-full transition-all duration-300"></span>
          </Button>
          
          <Button 
            onClick={onConnectWallet}
            className="relative overflow-hidden group bg-gradient-to-r from-eternavault-accent to-eternavault-blue text-white border-none"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            
            {isConnected ? (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                <span>{address?.substring(0, 4)}...{address?.substring(address.length - 4)}</span>
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-eternavault-dark/95 backdrop-blur-xl border-b border-eternavault-accent/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/features" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/about" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
            
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-white">Sign In</Button>
              <Button 
                onClick={() => { onConnectWallet(); setMobileMenuOpen(false); }}
                className="bg-gradient-to-r from-eternavault-accent to-eternavault-blue text-white border-none"
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
