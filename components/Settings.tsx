"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Bell, 
  CreditCard, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  Save,
  Shield,
  Smartphone,
  Globe
} from "lucide-react";
import Navigation from './Navigation';

const Settings = () => {
  // User data (simulated)
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+44 7700 900123",
    notifications: {
      email: {
        marketingEmails: true,
        raceReminders: true,
        specialOffers: false,
        betResults: true
      },
      push: {
        raceReminders: true,
        specialOffers: true,
        betResults: true,
        recommendations: true
      },
      sms: {
        raceReminders: false,
        specialOffers: false,
        betResults: false
      }
    },
    payment: {
      cards: [
        {
          id: 1,
          type: "Visa",
          last4: "4242",
          expiry: "12/25",
          primary: true
        },
        {
          id: 2,
          type: "Mastercard",
          last4: "5678",
          expiry: "09/26",
          primary: false
        }
      ]
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2025-01-15",
      loginNotifications: true,
      sessionTimeout: 30
    },
    preferences: {
      theme: "light",
      language: "en",
      currency: "GBP",
      timezone: "Europe/London",
      oddsFormat: "fractional"
    },
    limits: {
      depositLimit: {
        period: "weekly",
        amount: 500
      },
      betLimit: {
        amount: 100
      },
      timeLimit: {
        hours: 4
      }
    }
  });
  
  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Handle notification toggle
  const handleNotificationToggle = (
    type: "email" | "push" | "sms", 
    setting: keyof typeof userData.notifications.email | 
             keyof typeof userData.notifications.push | 
             keyof typeof userData.notifications.sms
  ) => {
    setUserData(prevData => ({
      ...prevData,
      notifications: {
        ...prevData.notifications,
        [type]: {
          ...prevData.notifications[type],
          [setting]: !prevData.notifications[type][setting as any]
        }
      }
    }));
  };
  
  // Handle preference change
  const handlePreferenceChange = (
    preference: keyof typeof userData.preferences,
    value: string
  ) => {
    setUserData(prevData => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [preference]: value
      }
    }));
  };
  
  // Handle setting primary payment method
  const handleSetPrimaryCard = (cardId: number) => {
    setUserData(prevData => ({
      ...prevData,
      payment: {
        ...prevData.payment,
        cards: prevData.payment.cards.map(card => ({
          ...card,
          primary: card.id === cardId
        }))
      }
    }));
  };
  
  // Handle removing a card
  const handleRemoveCard = (cardId: number) => {
    setUserData(prevData => ({
      ...prevData,
      payment: {
        ...prevData.payment,
        cards: prevData.payment.cards.filter(card => card.id !== cardId)
      }
    }));
  };
  
  // Handle toggling two-factor authentication
  const handleToggleTwoFactor = () => {
    setUserData(prevData => ({
      ...prevData,
      security: {
        ...prevData.security,
        twoFactorEnabled: !prevData.security.twoFactorEnabled
      }
    }));
  };
  
  // Handle session timeout change
  const handleSessionTimeoutChange = (timeout: number) => {
    setUserData(prevData => ({
      ...prevData,
      security: {
        ...prevData.security,
        sessionTimeout: timeout
      }
    }));
  };
  
  // Handle password change (simulated)
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    
    // Simulated success
    alert("Password changed successfully");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    // Update last password change date
    setUserData(prevData => ({
      ...prevData,
      security: {
        ...prevData.security,
        lastPasswordChange: new Date().toISOString().split('T')[0]
      }
    }));
  };
  
  // Handle limits change
  const handleLimitChange = (
    limitType: "depositLimit" | "betLimit" | "timeLimit",
    property: string,
    value: string | number
  ) => {
    setUserData(prevData => ({
      ...prevData,
      limits: {
        ...prevData.limits,
        [limitType]: {
          ...prevData.limits[limitType],
          [property]: value
        }
      }
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-white/80 max-w-2xl">
            Manage your account preferences, notifications, and security settings.
          </p>
        </div>
      </div>
      
      {/* Settings Tabs */}
      <div className="container mx-auto p-4 md:p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User size={16} />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-1">
              <CreditCard size={16} />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Lock size={16} />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="limits" className="flex items-center gap-1">
              <Shield size={16} />
              <span>Betting Limits</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={userData.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={userData.preferences.currency}
                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                      >
                        <option value="GBP">British Pound (£)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">US Dollar ($)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Odds Format
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={userData.preferences.oddsFormat}
                        onChange={(e) => handlePreferenceChange('oddsFormat', e.target.value)}
                      >
                        <option value="fractional">Fractional (3/1)</option>
                        <option value="decimal">Decimal (4.0)</option>
                        <option value="american">American (+300)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Theme
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={userData.preferences.theme}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <Bell className="mr-2 h-5 w-5 text-blue-500" />
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive newsletters and offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.email.marketingEmails}
                            onChange={() => handleNotificationToggle('email', 'marketingEmails')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Race Reminders</p>
                          <p className="text-sm text-gray-500">Get notified before races start</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.email.raceReminders}
                            onChange={() => handleNotificationToggle('email', 'raceReminders')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Special Offers</p>
                          <p className="text-sm text-gray-500">Receive exclusive promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.email.specialOffers}
                            onChange={() => handleNotificationToggle('email', 'specialOffers')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Bet Results</p>
                          <p className="text-sm text-gray-500">Receive results of your bets</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.email.betResults}
                            onChange={() => handleNotificationToggle('email', 'betResults')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <Smartphone className="mr-2 h-5 w-5 text-purple-500" />
                      Push Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Race Reminders</p>
                          <p className="text-sm text-gray-500">Get notified before races start</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.push.raceReminders}
                            onChange={() => handleNotificationToggle('push', 'raceReminders')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Special Offers</p>
                          <p className="text-sm text-gray-500">Receive exclusive promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.push.specialOffers}
                            onChange={() => handleNotificationToggle('push', 'specialOffers')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Bet Results</p>
                          <p className="text-sm text-gray-500">Receive results of your bets</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.push.betResults}
                            onChange={() => handleNotificationToggle('push', 'betResults')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">AI Recommendations</p>
                          <p className="text-sm text-gray-500">Get personalized betting tips</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.push.recommendations}
                            onChange={() => handleNotificationToggle('push', 'recommendations')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <Globe className="mr-2 h-5 w-5 text-green-500" />
                      SMS Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Race Reminders</p>
                          <p className="text-sm text-gray-500">Get notified before races start</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.sms.raceReminders}
                            onChange={() => handleNotificationToggle('sms', 'raceReminders')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Special Offers</p>
                          <p className="text-sm text-gray-500">Receive exclusive promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.sms.specialOffers}
                            onChange={() => handleNotificationToggle('sms', 'specialOffers')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                        <div>
                          <p className="font-medium text-gray-800">Bet Results</p>
                          <p className="text-sm text-gray-500">Receive results of your bets</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.notifications.sms.betResults}
                            onChange={() => handleNotificationToggle('sms', 'betResults')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Cards</h3>
                    <div className="space-y-4">
                      {userData.payment.cards.map((card) => (
                        <div key={card.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-md mr-4 ${
                              card.type === 'Visa' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                            }`}>
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {card.type} •••• {card.last4}
                                {card.primary && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    Primary
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!card.primary && (
                              <Button 
                                variant="outline"
                                onClick={() => handleSetPrimaryCard(card.id)}
                                className="text-sm"
                              >
                                Set as Primary
                              </Button>
                            )}
                            <Button 
                              variant="outline"
                              onClick={() => handleRemoveCard(card.id)}
                              className="text-sm border-red-200 text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      Add New Payment Method
                    </Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600">Your transaction history is available in the account statement section.</p>
                      <Button 
                        variant="outline"
                        className="mt-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        View Account Statement
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Button 
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-800 mb-2">Session Timeout</p>
                        <p className="text-sm text-gray-500 mb-3">
                          Automatically log out after a period of inactivity
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {[15, 30, 60, 120].map((timeout) => (
                            <button
                              key={timeout}
                              onClick={() => handleSessionTimeoutChange(timeout)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                userData.security.sessionTimeout === timeout 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {timeout} minutes
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">Login Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive email alerts when logging in from a new device
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={userData.security.loginNotifications}
                            onChange={() => setUserData(prev => ({
                              ...prev,
                              security: {
                                ...prev.security,
                                loginNotifications: !prev.security.loginNotifications
                              }
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Sign Out of All Devices
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Betting Limits Tab */}
          <TabsContent value="limits">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Responsible Gambling</CardTitle>
                <CardDescription>
                  Set limits on your betting activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Deposit Limits</h3>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-blue-700">
                        Setting deposit limits helps you manage your gambling budget responsibly. 
                        Once set, deposit limits cannot be increased for 24 hours.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Limit Period
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={userData.limits.depositLimit.period}
                          onChange={(e) => handleLimitChange('depositLimit', 'period', e.target.value)}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Limit Amount
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={userData.limits.depositLimit.amount}
                          onChange={(e) => handleLimitChange('depositLimit', 'amount', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Time Limits</h3>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-green-700">
                        Set a daily time limit to remind you how long you've been betting.
                        You'll receive a notification when you reach your limit.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Daily Time Limit (hours)
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={userData.limits.timeLimit.hours}
                          onChange={(e) => handleLimitChange('timeLimit', 'hours', parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 8].map((hours) => (
                            <option key={hours} value={hours}>{hours} hours</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Self-Exclusion</h3>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="font-medium text-red-800 mb-2">Temporary Time Out</p>
                      <p className="text-sm text-red-700 mb-4">
                        Take a break from betting for a set period of time.
                        During this period, you won't be able to place bets or deposit funds.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {['24 hours', '7 days', '30 days', '90 days'].map((period) => (
                          <button
                            key={period}
                            className="px-3 py-1 rounded-full text-sm bg-white border border-red-200 text-red-700 hover:bg-red-50"
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Save Betting Limits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4 text-center text-sm text-white/80 mt-auto">
        <p>© 2025 BetSmart • Responsible Gambling • Terms & Conditions • Privacy Policy</p>
      </footer>
    </div>
  );
};

export default Settings;