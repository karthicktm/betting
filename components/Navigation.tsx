"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bell, 
  Home, 
  Trophy, 
  User, 
  Calendar, 
  BarChart, 
  Settings, 
  Menu, 
  X, 
  Gift 
} from "lucide-react";

interface NavigationProps {
  user?: {
    name: string;
    avatarUrl: string;
    balance: number;
    tier: string;
    notifications: number;
  };
}

const Navigation: React.FC<NavigationProps> = ({ 
  user = {
    name: "Alex Thompson",
    avatarUrl: "/images/avatar.jpg",
    balance: 250.75,
    tier: "Gold",
    notifications: 3
  }
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Races', href: '/races', icon: Trophy },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Statistics', href: '/statistics', icon: BarChart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/') return true;
    return pathname?.startsWith(path);
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2 mr-8">
            <Trophy className="h-8 w-8 text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">BetSmart</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isActive(item.href) 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={16} className="mr-2" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* User Profile and Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 border-none">
            <Gift size={16} />
            <span>Promotions</span>
          </Button>
          <Button variant="outline" className="relative bg-blue-600 text-white hover:bg-blue-700 border-none">
            <Bell size={18} />
            {user.notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {user.notifications}
              </span>
            )}
          </Button>
          
          {/* User Profile Section */}
          <Link href="/profile" className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-blue-100">Balance: £{user.balance.toFixed(2)}</p>
            </div>
            <Avatar className="border-2 border-yellow-300">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-800 text-white">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Badge className="hidden md:flex bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-none">
              {user.tier} Member
            </Badge>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-gradient-to-b from-blue-700 to-purple-800 p-4 shadow-lg z-50">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isActive(item.href) 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={18} className="mr-3" />
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-2 mt-2">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none">
                <Gift size={16} className="mr-2" />
                Promotions
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;