"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, TrendingUp, Trophy, Calendar, ChevronRight, Gift, Star, Zap } from "lucide-react";
import Navigation from './Navigation';
import RecommendationAnalysis from './RecommendationAnalysis';

const Dashboard = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  // Function to open analysis modal
  const openAnalysis = (recommendation: any) => {
    setSelectedRecommendation(recommendation);
    setAnalysisOpen(true);
  };

  // Simulated user data
  const user = {
    name: "Alex Thompson",
    avatarUrl: "/images/avatar.jpg",
    balance: 250.75,
    tier: "Gold",
    notifications: 3
  };

  // Simulated upcoming races
  const upcomingRaces = [
    {
      id: 1,
      name: "Royal Ascot - Gold Cup",
      time: "Today, 15:30",
      venue: "Ascot Racecourse",
      featured: true,
      horses: 12
    },
    {
      id: 2,
      name: "Epsom Derby",
      time: "Tomorrow, 14:15",
      venue: "Epsom Downs",
      featured: true,
      horses: 15
    },
    {
      id: 3,
      name: "Newmarket Stakes",
      time: "Today, 17:45",
      venue: "Newmarket",
      featured: false,
      horses: 8
    }
  ];

  // Simulated personalized recommendations
  const recommendations = [
    {
      id: 1,
      raceId: 1,
      raceName: "Royal Ascot - Gold Cup",
      horseName: "Thunderbolt",
      betType: "Win",
      odds: "3/1",
      confidence: 87,
      rationale: "Based on your preference for favorites in prestigious races and Thunderbolt's recent form (3 wins in last 4 races). The jockey has a strong track record at Ascot with 32% win rate.",
      isLive: true
    },
    {
      id: 2,
      raceId: 2,
      raceName: "Epsom Derby",
      horseName: "Silver Arrow",
      betType: "Each Way",
      odds: "8/1",
      confidence: 76,
      rationale: "Matches your pattern of successful medium-odds bets. Silver Arrow has strong lineage and performed well on similar courses. Trainer statistics show improved performance in major events.",
      isLive: false
    },
    {
      id: 3,
      raceId: 3,
      raceName: "Newmarket Stakes",
      horseName: "Lucky Charm",
      betType: "Place",
      odds: "2/1",
      confidence: 91,
      rationale: "Lucky Charm has placed in 90% of races on this course. Your betting history shows high success with place bets at Newmarket. Weather conditions favor this horse's running style.",
      isLive: true
    }
  ];

  // Simulated trending bets among similar users
  const trendingBets = [
    { raceName: "Royal Ascot - Gold Cup", horseName: "Thunderbolt", betType: "Win", popularity: "72%" },
    { raceName: "Epsom Derby", horseName: "Dark Knight", betType: "Each Way", popularity: "65%" },
    { raceName: "Newmarket Stakes", horseName: "Morning Star", betType: "Forecast", popularity: "58%" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Top navigation bar */}
      <Navigation user={user} />

      {/* Hero Section with racetrack image */}
      <div className="w-full bg-cover bg-center h-48" style={{ backgroundImage: "url('/images/racetrack.jpg')", backgroundPosition: "bottom" }}>
        <div className="container mx-auto h-full flex items-end p-6">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-200 max-w-2xl">
            <h1 className="text-3xl font-bold text-purple-900">Your Personal Racing Advisor</h1>
            <p className="text-purple-700">AI-powered recommendations tailored to your betting style</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="container mx-auto p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
              <Zap size={24} className="text-yellow-500" />
              Your Recommendations
            </h2>
            
            {recommendations.map((rec) => (
              <Card key={rec.id} className={`overflow-hidden transition-all duration-200 hover:shadow-xl ${rec.isLive ? 'border-l-4 border-l-pink-500' : ''}`}>
                <div className="relative overflow-hidden h-36">
                  <img 
                    src={`/images/horse-${rec.id}.jpg`} 
                    alt="Horse racing" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-blue-800/50 to-transparent">
                    <div className="p-4 text-white flex flex-col h-full justify-between">
                      <div className="flex justify-between">
                        <Badge className="bg-white/20 backdrop-blur-sm border-none text-white">
                          {rec.betType}
                        </Badge>
                        {rec.isLive && (
                          <Badge className="bg-pink-500 text-white border-none animate-pulse flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                            LIVE NOW
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{rec.horseName}</h3>
                        <p className="text-sm opacity-90">{rec.raceName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(Math.floor(rec.confidence/20))].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                        {rec.confidence % 20 > 10 && <Star size={16} className="text-yellow-500 fill-yellow-500 opacity-50" />}
                      </div>
                      <span className="text-sm text-purple-700">{rec.confidence}% match</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{rec.odds}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="bg-white">
                  <div className="mb-3">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-purple-800 font-medium">AI Confidence</span>
                      <span className="font-medium text-blue-700">{rec.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          rec.confidence > 85 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                          rec.confidence > 70 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 
                          'bg-gradient-to-r from-orange-400 to-red-500'
                        }`} 
                        style={{ width: `${rec.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p className="text-sm text-purple-800">
                      <strong className="text-purple-900">Personalized Insight: </strong> 
                      {rec.rationale}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t bg-gradient-to-r from-purple-50 to-blue-50 py-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                    onClick={() => openAnalysis(rec)}
                  >
                    View Analysis
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Place Bet
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
                View More Recommendations
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          {/* Right column - Races & Trending */}
          <div className="space-y-6">
            {/* Upcoming races */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-purple-600">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar size={18} className="text-yellow-300" />
                  Upcoming Races
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-b from-white to-blue-50 space-y-3 p-0">
                {upcomingRaces.map((race) => (
                  <div key={race.id} className="flex items-center p-3 hover:bg-blue-100/50 transition-colors cursor-pointer border-b border-blue-100 last:border-0">
                    <div className="mr-3 p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-blue-900">{race.name}</p>
                      <div className="flex items-center text-xs text-blue-700">
                        <span>{race.time}</span>
                        <span className="mx-1 text-blue-300">•</span>
                        <span>{race.venue}</span>
                        <span className="mx-1 text-blue-300">•</span>
                        <span>{race.horses} horses</span>
                      </div>
                    </div>
                    {race.featured && (
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-none">
                        Featured
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0 bg-blue-50">
                <Button variant="ghost" className="w-full text-blue-700 hover:text-blue-800 hover:bg-blue-100">View All Races</Button>
              </CardFooter>
            </Card>

            {/* Trending bets */}
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 to-pink-600">
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp size={18} className="text-yellow-300" />
                  Trending Among Similar Bettors
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-b from-white to-purple-50 space-y-0 p-0">
                {trendingBets.map((bet, index) => (
                  <div key={index} className="flex justify-between p-3 hover:bg-purple-100/50 transition-colors cursor-pointer border-b border-purple-100 last:border-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-purple-900">{bet.horseName} - {bet.betType}</p>
                        <p className="text-xs text-purple-700">{bet.raceName}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                      {bet.popularity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Personalized alert */}
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="relative">
                <img src="/images/premium.jpg" alt="Premium features" className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/80 to-amber-600/80 flex items-center justify-center">
                  <Trophy size={48} className="text-white" />
                </div>
              </div>
              <CardContent className="bg-gradient-to-b from-yellow-50 to-amber-50 p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Unlock Premium Insights</h3>
                <p className="text-sm text-amber-800 mb-4">
                  Upgrade to Premium for advanced statistics, higher accuracy recommendations, and exclusive expert tips.
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-none">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4 text-center text-sm text-white/80 mt-auto">
        <p>© 2025 BetSmart • Responsible Gambling • Terms & Conditions • Privacy Policy</p>
      </footer>
      
      {/* Recommendation Analysis Dialog */}
      <RecommendationAnalysis 
        open={analysisOpen}
        onOpenChange={setAnalysisOpen}
        recommendation={selectedRecommendation}
      />
    </div>
  );
};

export default Dashboard;