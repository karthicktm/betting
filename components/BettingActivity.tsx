"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from './Navigation';

export default function BettingActivity() {
  // Simulated betting activity data
  const bettingActivity = {
    recentBets: [
      { id: 1, date: 'Mar 28, 2025', race: 'Royal Ascot - Gold Cup', horse: 'Thunderbolt', betType: 'Win', amount: 50, odds: '3/1', result: 'Won', profit: 150 },
      { id: 2, date: 'Mar 26, 2025', race: 'Epsom Derby', horse: 'Silver Arrow', betType: 'Each Way', amount: 20, odds: '8/1', result: 'Placed (3rd)', profit: 30 },
      { id: 3, date: 'Mar 25, 2025', race: 'Newmarket Stakes', horse: 'Morning Star', betType: 'Win', amount: 25, odds: '5/1', result: 'Lost', profit: -25 },
      { id: 4, date: 'Mar 24, 2025', race: 'Cheltenham Gold Cup', horse: 'Golden Racer', betType: 'Win', amount: 100, odds: '4/1', result: 'Won', profit: 400 },
      { id: 5, date: 'Mar 22, 2025', race: 'Grand National', horse: 'Northern Lights', betType: 'Each Way', amount: 30, odds: '12/1', result: 'Placed (2nd)', profit: 60 }
    ],
    summary: {
      totalBets: 156,
      winRate: 38,
      totalProfit: 425.50,
      bestDay: {
        date: 'Mar 24, 2025',
        profit: 400
      },
      worstDay: {
        date: 'Mar 10, 2025',
        profit: -120
      }
    },
    topHorses: [
      { name: 'Thunderbolt', bets: 4, wins: 3, profit: 250 },
      { name: 'Golden Racer', bets: 5, wins: 3, profit: 480 },
      { name: 'Silver Arrow', bets: 3, wins: 1, profit: 120 }
    ],
    topTracks: [
      { name: 'Ascot', bets: 25, wins: 12, winRate: 48, profit: 320 },
      { name: 'Cheltenham', bets: 22, wins: 9, winRate: 41, profit: 280 },
      { name: 'Newmarket', bets: 18, wins: 6, winRate: 33, profit: 150 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Betting Statistics</h1>
          <p className="text-white/80 max-w-2xl">
            Review your recent betting activity and performance metrics
          </p>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>Total Bets</CardDescription>
              <CardTitle className="text-2xl">{bettingActivity.summary.totalBets}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500">
                In the last 30 days
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>Win Rate</CardDescription>
              <CardTitle className="text-2xl">{bettingActivity.summary.winRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                  style={{ width: `${bettingActivity.summary.winRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>Total Profit</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {formatCurrency(bettingActivity.summary.totalProfit)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Best day: {bettingActivity.summary.bestDay.date}</span>
                <span className="text-green-600">+{formatCurrency(bettingActivity.summary.bestDay.profit)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>AI Recommendations</CardDescription>
              <CardTitle className="text-2xl">72% accurate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-600">
                34% better than your manual picks
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Betting Activity */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Betting Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Race</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odds</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bettingActivity.recentBets.map((bet) => (
                  <tr key={bet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bet.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bet.race}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bet.horse}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bet.betType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bet.odds}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(bet.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        bet.result.includes('Won') 
                          ? 'bg-green-100 text-green-800' 
                          : bet.result.includes('Placed') 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                      }>
                        {bet.result}
                      </Badge>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      bet.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {bet.profit >= 0 ? '+' : ''}{formatCurrency(bet.profit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Additional Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Performing Horses */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Top Performing Horses</CardTitle>
              <CardDescription>
                Horses that have delivered the best results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bettingActivity.topHorses.map((horse, index) => (
                  <div key={horse.name} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center mr-3 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800">{horse.name}</p>
                        <p className="text-sm font-medium text-green-600">+{formatCurrency(horse.profit)}</p>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{horse.wins} wins from {horse.bets} bets</span>
                        <span>{Math.round((horse.wins / horse.bets) * 100)}% win rate</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Top Performing Tracks */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Top Performing Tracks</CardTitle>
              <CardDescription>
                Venues where you've had the most success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bettingActivity.topTracks.map((track, index) => (
                  <div key={track.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center mr-2 font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">{track.name}</span>
                      </div>
                      <div className="text-sm text-green-600">+{formatCurrency(track.profit)}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${track.winRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{track.wins} wins from {track.bets} bets</span>
                      <span>{track.winRate}% win rate</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Insights */}
        <Card className="shadow-md mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              AI Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-purple-100">
              <h3 className="font-medium text-purple-900 mb-3">Your Betting Patterns</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-purple-800 text-xs">1</span>
                  </div>
                  <span className="text-sm text-purple-800">You perform 42% better when betting on flat races vs. jump races</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-purple-800 text-xs">2</span>
                  </div>
                  <span className="text-sm text-purple-800">Your each-way bets have a 28% better return than industry average</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-purple-800 text-xs">3</span>
                  </div>
                  <span className="text-sm text-purple-800">You could improve returns by focusing more on middle-distance races</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-purple-800 text-xs">4</span>
                  </div>
                  <span className="text-sm text-purple-800">Your winning rate increases on good to firm ground conditions</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4 text-center text-sm text-white/80 mt-auto">
        <p>© 2025 BetSmart • Responsible Gambling • Terms & Conditions • Privacy Policy</p>
      </footer>
    </div>
  );
}