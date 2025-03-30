"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, History, Settings, CreditCard, TrendingUp, Bell, Lock, DollarSign } from "lucide-react";
import Link from 'next/link';

const Profile = () => {
  // Simulated user data
  const user = {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    avatarUrl: "/images/avatar.jpg",
    memberSince: "January 2023",
    balance: 250.75,
    tier: "Gold",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    },
    bettingHistory: [
      {
        id: 1,
        race: "Royal Ascot - Gold Cup",
        date: "June 15, 2024",
        horse: "Thunderbolt",
        betType: "Win",
        amount: 50,
        odds: "3/1",
        status: "Won",
        returns: 200,
        recommended: true
      },
      {
        id: 2,
        race: "Epsom Derby",
        date: "June 4, 2024",
        horse: "Silver Arrow",
        betType: "Each Way",
        amount: 20,
        odds: "8/1",
        status: "Placed (3rd)",
        returns: 30,
        recommended: true
      },
      {
        id: 3,
        race: "Newmarket Stakes",
        date: "May 28, 2024",
        horse: "Morning Star",
        betType: "Win",
        amount: 25,
        odds: "5/1",
        status: "Lost",
        returns: 0,
        recommended: false
      },
      {
        id: 4,
        race: "Cheltenham Gold Cup",
        date: "March 17, 2024",
        horse: "Golden Racer",
        betType: "Win",
        amount: 100,
        odds: "4/1",
        status: "Won",
        returns: 500,
        recommended: true
      }
    ],
    stats: {
      totalBets: 47,
      winRate: 38,
      recommendedWinRate: 62,
      favoriteTrack: "Ascot",
      favoriteBetType: "Win",
      avgStake: 42.50,
      highestReturn: 750
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white hidden md:block">My Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-none">
              {user.tier} Member
            </Badge>
            <div className="text-white text-sm">
              Balance: £{user.balance.toFixed(2)}
            </div>
          </div>
        </div>
      </header>

      {/* User info summary */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-purple-200">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-800 text-white text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-purple-900">{user.name}</h2>
              <p className="text-blue-700">{user.email}</p>
              <p className="text-sm text-blue-600 mt-1">Member since {user.memberSince}</p>
              
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {user.stats.totalBets} Total Bets
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {user.stats.winRate}% Win Rate
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {user.stats.favoriteTrack}
                </Badge>
              </div>
            </div>
            <div className="md:text-right">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4 md:mt-0">
                Deposit Funds
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for different profile sections */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History size={16} />
              <span>Betting History</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1">
              <TrendingUp size={16} />
              <span>Statistics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings size={16} />
              <span>Account Settings</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Betting History Tab */}
          <TabsContent value="history">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardTitle>Betting History</CardTitle>
                <CardDescription className="text-white/80">
                  Your recent bets and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-100 bg-blue-50">
                        <th className="text-left p-3 text-blue-800">Date</th>
                        <th className="text-left p-3 text-blue-800">Race</th>
                        <th className="text-left p-3 text-blue-800">Selection</th>
                        <th className="text-left p-3 text-blue-800">Bet Type</th>
                        <th className="text-right p-3 text-blue-800">Stake</th>
                        <th className="text-center p-3 text-blue-800">Status</th>
                        <th className="text-right p-3 text-blue-800">Returns</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.bettingHistory.map((bet) => (
                        <tr key={bet.id} className="border-b border-blue-50 hover:bg-blue-50/50">
                          <td className="p-3 text-blue-800">{bet.date}</td>
                          <td className="p-3 text-blue-800">{bet.race}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className="font-medium text-blue-900">{bet.horse}</span>
                              {bet.recommended && (
                                <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200 text-xs">AI Rec</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-blue-800">{bet.betType}</td>
                          <td className="p-3 text-right text-blue-800">£{bet.amount.toFixed(2)}</td>
                          <td className="p-3 text-center">
                            <Badge className={`
                              ${bet.status.toLowerCase().includes('won') 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : bet.status.toLowerCase().includes('placed')
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : 'bg-red-100 text-red-800 border-red-200'}
                            `}>
                              {bet.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-right font-medium">
                            <span className={`
                              ${bet.returns > 0 ? 'text-green-600' : 'text-red-600'}
                            `}>
                              {bet.returns > 0 ? `+£${bet.returns.toFixed(2)}` : '£0.00'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 flex justify-center">
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    View Full History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle>Betting Statistics</CardTitle>
                <CardDescription className="text-white/80">
                  Your performance and patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">Win Rate</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-700">Overall</span>
                      <span className="font-bold text-blue-900">{user.stats.winRate}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3 mb-4">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${user.stats.winRate}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-700">With AI Recommendations</span>
                      <span className="font-bold text-blue-900">{user.stats.recommendedWinRate}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                        style={{ width: `${user.stats.recommendedWinRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Betting Patterns</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-700">Favorite Track</span>
                          <span className="font-medium text-blue-900">{user.stats.favoriteTrack}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-700">Favorite Bet Type</span>
                          <span className="font-medium text-blue-900">{user.stats.favoriteBetType}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-700">Average Stake</span>
                          <span className="font-medium text-blue-900">£{user.stats.avgStake.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-700">Highest Return</span>
                          <span className="font-medium text-green-600">£{user.stats.highestReturn.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-100 shadow-sm">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">AI Insights</h3>
                    <p className="text-purple-700 mb-4">Based on your betting history, our AI has identified these patterns:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-purple-800 text-xs">1</span>
                        </div>
                        <span className="text-sm text-purple-800">You perform best with win bets on favorites in prestigious races.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-purple-800 text-xs">2</span>
                        </div>
                        <span className="text-sm text-purple-800">Your each-way bets have a 52% better return than industry average.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-purple-800 text-xs">3</span>
                        </div>
                        <span className="text-sm text-purple-800">You could improve returns by focusing more on shorter distance races.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle>Account Settings</CardTitle>
                <CardDescription className="text-white/80">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                        <User size={18} className="mr-2 text-blue-700" />
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-blue-700 block mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={user.name}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm text-blue-700 block mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={user.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Update Personal Information
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                        <Lock size={18} className="mr-2 text-blue-700" />
                        Security
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-blue-700 block mb-1">Password</label>
                          <input 
                            type="password" 
                            className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value="********"
                            readOnly
                          />
                        </div>
                      </div>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Change Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                        <Bell size={18} className="mr-2 text-purple-700" />
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                          <span className="text-purple-800">Email Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked={user.notificationPreferences.email} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                          <span className="text-purple-800">Push Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked={user.notificationPreferences.push} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                          <span className="text-purple-800">SMS Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked={user.notificationPreferences.sms} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                        Save Notification Preferences
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                        <DollarSign size={18} className="mr-2 text-purple-700" />
                        Payment Methods
                      </h3>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="flex items-center">
                          <CreditCard size={24} className="mr-3 text-purple-700" />
                          <div>
                            <div className="font-medium text-purple-900">Visa •••• 4242</div>
                            <div className="text-xs text-purple-700">Expires 12/25</div>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                        Manage Payment Methods
                      </Button>
                    </div>
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

export default Profile;