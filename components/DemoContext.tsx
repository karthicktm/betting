"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  triggerAction: (action: string, params?: any) => void;
  demoState: {
    balance: number;
    notifications: number;
    hasNewRecommendation: boolean;
    upcomingRace: any | null;
    recentWin: any | null;
  };
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoState, setDemoState] = useState({
    balance: 250.75,
    notifications: 0,
    hasNewRecommendation: false,
    upcomingRace: null,
    recentWin: null
  });

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      toast({
        title: "Demo Mode Activated",
        description: "The application is now in demonstration mode. Use the controller to trigger events.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    }
  };

  const triggerAction = (action: string, params?: any) => {
    switch (action) {
      case 'new-recommendation':
        setDemoState(prev => ({ 
          ...prev, 
          hasNewRecommendation: true,
          notifications: prev.notifications + 1 
        }));
        toast({
          title: "New AI Recommendation!",
          description: "Our AI has found a high-confidence bet for you: Thunderbolt (3/1) in the Royal Ascot Gold Cup.",
          action: <ToastAction altText="View">View</ToastAction>,
        });
        break;

      case 'race-starting':
        const raceInfo = {
          id: 1,
          name: "Royal Ascot - Gold Cup",
          time: "Starting in 15 minutes",
          venue: "Ascot Racecourse",
        };
        setDemoState(prev => ({ 
          ...prev, 
          upcomingRace: raceInfo,
          notifications: prev.notifications + 1 
        }));
        toast({
          title: "Race Starting Soon!",
          description: `${raceInfo.name} is starting in 15 minutes. Don't miss the action!`,
          action: <ToastAction altText="View Race">View Race</ToastAction>,
        });
        break;

      case 'winning-bet':
        const winInfo = {
          race: "Newmarket Stakes",
          horse: "Lucky Charm",
          amount: 25,
          winnings: 75
        };
        setDemoState(prev => ({
          ...prev,
          recentWin: winInfo,
          balance: prev.balance + winInfo.winnings,
          notifications: prev.notifications + 1
        }));
        toast({
          title: "You Won!",
          description: `Your bet on ${winInfo.horse} just won! £${winInfo.winnings} has been added to your balance.`,
          variant: "default",
          action: <ToastAction altText="View">View</ToastAction>,
        });
        break;

      case 'deposit-completed':
        const depositAmount = 100;
        setDemoState(prev => ({
          ...prev,
          balance: prev.balance + depositAmount
        }));
        toast({
          title: "Deposit Successful",
          description: `£${depositAmount} has been added to your account.`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
        break;

      case 'notification':
        setDemoState(prev => ({
          ...prev,
          notifications: prev.notifications + 1
        }));
        toast({
          title: "New Notification",
          description: "You have a new message from BetSmart support team.",
          action: <ToastAction altText="View">View</ToastAction>,
        });
        break;

      case 'reset-demo':
        setDemoState({
          balance: 250.75,
          notifications: 0,
          hasNewRecommendation: false,
          upcomingRace: null,
          recentWin: null
        });
        toast({
          title: "Demo Reset",
          description: "The demo state has been reset to default values.",
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Any initialization for demo mode
    if (isDemoMode) {
      // Could set up initial state here
    }
  }, [isDemoMode]);

  return (
    <DemoContext.Provider value={{ isDemoMode, toggleDemoMode, triggerAction, demoState }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};