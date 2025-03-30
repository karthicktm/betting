"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";
import Navigation from './Navigation';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  
  // Simulated statistics data
  const statsData = {
    overview: {
      totalBets: 156,
      winRate: 38,
      profit: 425.50,
      averageReturn: 2.73,
      changeFromPrevious: {
        winRate: 5.2,
        profit: -32.25,
      },
      betsPerDay: [4, 2, 5, 3, 6, 8, 4, 3, 7, 9, 5, 4, 2, 6, 8, 7, 5, 3, 6, 4, 7, 8, 9, 5, 4, 6, 3, 5, 4, 6],
      topPerformingTracks: ['Ascot', 'Cheltenham', 'Newmarket', 'Epsom', 'York'],
      topPerformingTrainers: [
        { name: "Aidan O'Brien", winRate: 42 },
        { name: "John Gosden", winRate: 38 },
        { name: "Charlie Appleby", winRate: 35 },
        { name: "William Haggas", winRate: 31 },
        { name: "Andrew Balding", winRate: 28 }
      ],
      raceTypePerformance: {
        flat: { winRate: 42, roiPercent: 8.3 },
        jump: { winRate: 36, roiPercent: 5.1 }
      }
    },
    aiInsights: {
      recommendationAccuracy: 72,
      improvementOverUserBets: 34,
      topRecommendationTypes: [
        { type: 'Win bets on favorites', success: 76 },
        { type: 'Each-way on mid-odds', success: 68 },
        { type: 'Place bets in featured races', success: 81 }
      ],
      recentSuccesses: [
        { raceName: 'Royal Ascot - Gold Cup', horse: 'Thunderbolt', odds: '3/1', returns: 150 },
        { raceName: 'Epsom Derby', horse: 'Silver Arrow', odds: '8/1', returns: 100 },
        { raceName: 'Cheltenham Gold Cup', horse: 'Golden Racer', odds: '4/1', returns: 500 }
      ],
      patternInsights: [
        'You perform 42% better when betting on flat races vs. jump races',
        'Your each-way bets have a 28% better return than industry average',
        'You could improve returns by focusing more on middle-distance races',
        'Your winning rate increases on good to firm ground conditions'
      ]
    },
    betTypeAnalysis: {
      distribution: [
        { name: 'Win', percentage: 65, profit: 320.50 },
        { name: 'Place', percentage: 15, profit: 85.00 },
        { name: 'Each Way', percentage: 12, profit: 120.00 },
        { name: 'Forecast', percentage: 5, profit: -50.00 },
        { name: 'Other', percentage: 3, profit: -50.00 }
      ],
      timeOfDay: [
        { time: 'Morning', bets: 35, winRate: 32 },
        { time: 'Afternoon', bets: 87, winRate: 41 },
        { time: 'Evening', bets: 34, winRate: 35 }
      ]
    }
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  // Time range options
  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '12months', label: 'Last 12 Months' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Betting Statistics</h1>
          <p className="text-white/80 max-w-2xl">
            Analyze your betting performance with AI-powered insights and recommendations.
          </p>
        </div>
      </div>
      
      {/* Controls and Time Range */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="inline-flex items-center rounded-md bg-white border border-gray-200 shadow-sm">
            <span className="px-3 py-2 text-sm text-gray-600 border-r border-gray-200">Time Range:</span>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-transparent text-sm focus:outline-none text-gray-800"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <Button className="flex items-center gap-2 bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-sm">
            <Download size={16} />
            Export Data
          </Button>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardDescription>Total Bets</CardDescription>
              <CardTitle className="text-2xl">{statsData.overview.totalBets}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500">
                {timeRangeOptions.find(o => o.value === timeRange)?.label}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardDescription>Win Rate</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                {statsData.overview.winRate}%
                {statsData.overview.changeFromPrevious.winRate > 0 ? (
                  <span className="ml-2 text-green-500 text-sm flex items-center">
                    <ArrowUpRight size={14} />
                    {statsData.overview.changeFromPrevious.winRate}%
                  </span>
                ) : (
                  <span className="ml-2 text-red-500 text-sm flex items-center">
                    <ArrowDownRight size={14} />
                    {Math.abs(statsData.overview.changeFromPrevious.winRate)}%
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                  style={{ width: `${statsData.overview.winRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardDescription>Total Profit</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                {formatCurrency(statsData.overview.profit)}
                {statsData.overview.changeFromPrevious.profit > 0 ? (
                  <span className="ml-2 text-green-500 text-sm flex items-center">
                    <ArrowUpRight size={14} />
                    {formatCurrency(statsData.overview.changeFromPrevious.profit)}
                  </span>
                ) : (
                  <span className="ml-2 text-red-500 text-sm flex items-center">
                    <ArrowDownRight size={14} />
                    {formatCurrency(Math.abs(statsData.overview.changeFromPrevious.profit))}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-500">
                Average return: {statsData.overview.averageReturn}x
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardDescription>AI Recommendation Accuracy</CardDescription>
              <CardTitle className="text-2xl">{statsData.aiInsights.recommendationAccuracy}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-600 flex items-center">
                <ArrowUpRight size={14} className="mr-1" />
                {statsData.aiInsights.improvementOverUserBets}% better than your picks
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different analytics */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <BarChart3 size={16} />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1">
              <Sparkles size={16} />
              <span>AI Insights</span>
            </TabsTrigger>
            <TabsTrigger value="bet-types" className="flex items-center gap-1">
              <PieChart size={16} />
              <span>Bet Analysis</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Betting Activity</CardTitle>
                  <CardDescription>Number of bets placed per day</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-64 w-full">
                    <div className="flex h-60 items-end">
                      {statsData.overview.betsPerDay.map((count, index) => (
                        <div key={index} className="flex-1 mx-px">
                          <div 
                            className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t hover:opacity-80 transition-opacity"
                            style={{ height: `${count * 10}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between px-2 pt-2 text-xs text-gray-500">
                      <span>30 Days Ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Best Performing Venues</CardTitle>
                    <CardDescription>Tracks where you have the highest win rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {statsData.overview.topPerformingTracks.map((track, index) => (
                        <div key={track} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center mr-3 font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-800">{track}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Race Type Performance</CardTitle>
                    <CardDescription>Win rate by race type</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Flat</span>
                        <span className="font-medium text-gray-800">{statsData.overview.raceTypePerformance.flat.winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${statsData.overview.raceTypePerformance.flat.winRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        ROI: +{statsData.overview.raceTypePerformance.flat.roiPercent}%
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Jump</span>
                        <span className="font-medium text-gray-800">{statsData.overview.raceTypePerformance.jump.winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${statsData.overview.raceTypePerformance.jump.winRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        ROI: +{statsData.overview.raceTypePerformance.jump.roiPercent}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles size={20} className="text-yellow-300" />
                      AI Personalized Insights
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Patterns detected in your betting history
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {statsData.aiInsights.patternInsights.map((insight, index) => (
                        <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex-shrink-0 flex items-center justify-center mr-4 font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-purple-800">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Most Successful AI Recommendations</CardTitle>
                    <CardDescription>Recommendation categories with highest success rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statsData.aiInsights.topRecommendationTypes.map((type, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-800">{type.type}</span>
                            <span className="font-bold text-gray-800">{type.success}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                              style={{ width: `${type.success}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-blue-600 text-white">
                    <CardTitle>AI vs. Manual Performance</CardTitle>
                    <CardDescription className="text-white/80">
                      Comparing your picks with AI recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full bg-blue-50 text-blue-700">
                            Your Picks
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium inline-block text-blue-700">
                            {statsData.overview.winRate}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div style={{ width: `${statsData.overview.winRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                      </div>
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full bg-purple-50 text-purple-700">
                            AI Recommendations
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium inline-block text-purple-700">
                            {statsData.aiInsights.recommendationAccuracy}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                        <div style={{ width: `${statsData.aiInsights.recommendationAccuracy}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="font-medium text-green-800">AI Improvement</div>
                      <div className="text-2xl font-bold text-green-700">+{statsData.aiInsights.improvementOverUserBets}%</div>
                      <div className="text-xs text-green-600 mt-1">
                        Higher win rate with AI recommendations
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent AI Successes</CardTitle>
                    <CardDescription>Top recent winning recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statsData.aiInsights.recentSuccesses.map((success, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="font-medium text-gray-800">{success.horse}</div>
                          <div className="text-sm text-gray-600">{success.raceName}</div>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-blue-700">Odds: {success.odds}</span>
                            <span className="text-sm font-medium text-green-700">+{formatCurrency(success.returns)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Bet Types Tab */}
          <TabsContent value="bet-types">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Bet Type Distribution</CardTitle>
                  <CardDescription>Breakdown of your betting activity by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {statsData.betTypeAnalysis.distribution.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600">{item.percentage}%</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-grow">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className={`ml-3 text-sm ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.profit >= 0 ? '+' : ''}{formatCurrency(item.profit)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">Insight</h3>
                    <p className="text-sm text-blue-700">
                      Your most profitable bet type is <strong>Each Way</strong> with an ROI of 67%, followed by <strong>Win</strong> bets with an ROI of 32%. Consider increasing your Each Way betting based on AI recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Time of Day Analysis</CardTitle>
                    <CardDescription>Win rate by betting time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statsData.betTypeAnalysis.timeOfDay.map((time) => (
                        <div key={time.time}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">{time.time}</span>
                            <span className="text-sm font-medium text-gray-800">{time.winRate}% ({time.bets} bets)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                time.winRate > 40 ? 'bg-green-500' : 
                                time.winRate > 35 ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${time.winRate}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-800 mb-2">AI Insight</h3>
                      <p className="text-sm text-purple-700">
                        Your afternoon bets (12PM-5PM) have the highest success rate at 41%. Consider focusing more of your betting activity during these hours when possible.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles size={20} className="text-purple-500" />
                      AI Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100">
                      <h3 className="font-medium text-purple-900 mb-2">Optimize Your Strategy</h3>
                      <p className="text-sm text-purple-800 mb-4">
                        Based on your statistics, we recommend:
                      </p>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-purple-800 text-xs">1</span>
                          </div>
                          <span>Increase Each Way bets on middle-distance flat races</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-purple-800 text-xs">2</span>
                          </div>
                          <span>Focus more on afternoon betting sessions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-purple-800 text-xs">3</span>
                          </div>
                          <span>Reduce forecast bets which are currently unprofitable</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        Apply AI Recommendations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default Statistics;