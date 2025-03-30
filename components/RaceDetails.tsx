"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  BarChart3, 
  Award, 
  TrendingUp, 
  History, 
  ExternalLink, 
  ChevronRight,
  Star 
} from "lucide-react";
import Link from 'next/link';

const RaceDetail = ({ params }: { params: { id: string } }) => {
  // Simulated race data (would normally come from an API based on the ID)
  const raceId = parseInt(params.id || "1");
  
  const race = {
    id: raceId,
    name: "Royal Ascot - Gold Cup",
    time: "Today, 15:30",
    venue: "Ascot Racecourse",
    distance: "2 miles 4 furlongs",
    prize: "£500,000",
    weather: "Sunny, 22°C",
    ground: "Good to firm",
    description: "One of the most prestigious flat races in the British racing calendar, the Gold Cup is the feature race on day three of Royal Ascot, traditionally known as Ladies' Day.",
    image: "/images/race-detail.jpg",
    runners: [
      {
        id: 1,
        name: "Thunderbolt",
        jockey: "Ryan Moore",
        trainer: "Aidan O'Brien",
        age: 5,
        weight: "9-2",
        odds: "3/1",
        form: "1-1-2-1",
        silkColor: "blue",
        aiConfidence: 87,
        statistics: {
          totalRaces: 12,
          wins: 7,
          places: 3,
          winPercent: 58
        },
        recommended: true
      },
      {
        id: 2,
        name: "Golden Strike",
        jockey: "Frankie Dettori",
        trainer: "John Gosden",
        age: 6,
        weight: "9-0",
        odds: "5/1",
        form: "2-1-3-2",
        silkColor: "gold",
        aiConfidence: 74,
        statistics: {
          totalRaces: 15,
          wins: 5,
          places: 7,
          winPercent: 33
        },
        recommended: false
      },
      {
        id: 3,
        name: "Silver Streak",
        jockey: "Oisin Murphy",
        trainer: "Andrew Balding",
        age: 4,
        weight: "8-12",
        odds: "6/1",
        form: "3-2-1-4",
        silkColor: "silver",
        aiConfidence: 68,
        statistics: {
          totalRaces: 10,
          wins: 3,
          places: 5,
          winPercent: 30
        },
        recommended: false
      },
      {
        id: 4,
        name: "Royal Diamond",
        jockey: "Hollie Doyle",
        trainer: "William Haggas",
        age: 5,
        weight: "9-4",
        odds: "4/1",
        form: "1-2-1-3",
        silkColor: "purple",
        aiConfidence: 81,
        statistics: {
          totalRaces: 14,
          wins: 6,
          places: 5,
          winPercent: 43
        },
        recommended: true
      },
      {
        id: 5,
        name: "Racing Legend",
        jockey: "Tom Marquand",
        trainer: "Charlie Appleby",
        age: 6,
        weight: "9-3",
        odds: "8/1",
        form: "2-4-2-2",
        silkColor: "green",
        aiConfidence: 65,
        statistics: {
          totalRaces: 18,
          wins: 5,
          places: 8,
          winPercent: 28
        },
        recommended: false
      }
    ],
    previousWinners: [
      { year: "2024", horse: "Kyprios", jockey: "Ryan Moore", trainer: "Aidan O'Brien" },
      { year: "2023", horse: "Courage Mon Ami", jockey: "Frankie Dettori", trainer: "John Gosden" },
      { year: "2022", horse: "Kyprios", jockey: "Ryan Moore", trainer: "Aidan O'Brien" },
      { year: "2021", horse: "Subjectivist", jockey: "Joe Fanning", trainer: "Mark Johnston" }
    ]
  };

  // Function to determine badge color based on odds
  const getOddsBadgeClass = (odds: string) => {
    const fractionalOdds = odds.split('/');
    const decimal = parseInt(fractionalOdds[0]) / parseInt(fractionalOdds[1]);
    
    if (decimal < 1) return "bg-red-100 text-red-800 border-red-200";
    if (decimal < 3) return "bg-orange-100 text-orange-800 border-orange-200";
    if (decimal < 5) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Hero section with race image */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0">
          <img 
            src={race.image} 
            alt={race.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-80"></div>
        </div>
        
        <div className="absolute top-4 left-4">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <Badge className="bg-purple-500 border-none text-white">Featured Race</Badge>
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" />
            <span className="text-sm">{race.time}</span>
          </div>
          <h1 className="text-3xl font-bold">{race.name}</h1>
          <div className="flex items-center text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{race.venue}</span>
            <span className="mx-2">•</span>
            <span>{race.distance}</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="container mx-auto p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Race info and runners */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs for different race information */}
            <Tabs defaultValue="runners" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="runners" className="flex items-center gap-1">
                  <Users size={16} />
                  <span className="hidden md:inline">Runners</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1">
                  <BarChart3 size={16} />
                  <span className="hidden md:inline">Statistics</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-1">
                  <History size={16} />
                  <span className="hidden md:inline">History</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Runners Tab */}
              <TabsContent value="runners" className="p-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <CardTitle>Race Runners</CardTitle>
                    <CardDescription className="text-white/80">
                      {race.runners.length} horses competing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {race.runners.map((horse) => (
                      <div 
                        key={horse.id} 
                        className={`p-4 border-b border-blue-100 last:border-0 hover:bg-blue-50/50 transition-colors ${horse.recommended ? 'bg-gradient-to-r from-purple-50 to-blue-50' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md bg-gradient-to-br from-${horse.silkColor}-500 to-${horse.silkColor}-700`}>
                              {horse.id}
                            </div>
                            <div>
                              <h3 className="font-bold text-blue-900">{horse.name}</h3>
                              <p className="text-xs text-blue-700">
                                Jockey: {horse.jockey} • Trainer: {horse.trainer}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-700">{horse.odds}</div>
                            <div className="text-xs text-blue-700">Form: {horse.form}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div className="bg-blue-50 p-2 rounded">
                            <span className="text-blue-500">Age:</span> {horse.age}
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <span className="text-blue-500">Weight:</span> {horse.weight}
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <span className="text-blue-500">Win %:</span> {horse.statistics.winPercent}%
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <span className="text-blue-500">Races:</span> {horse.statistics.totalRaces}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between mb-1 text-xs">
                            <span className="text-purple-700 font-medium">AI Match Rating</span>
                            <span className="font-medium text-blue-700">{horse.aiConfidence}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                horse.aiConfidence > 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                                horse.aiConfidence > 65 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 
                                'bg-gradient-to-r from-orange-400 to-red-500'
                              }`} 
                              style={{ width: `${horse.aiConfidence}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          {horse.recommended ? (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1">
                              <Star size={12} className="fill-purple-500 text-purple-500" />
                              Recommended for you
                            </Badge>
                          ) : (
                            <div></div>
                          )}
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Place Bet
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Statistics Tab */}
              <TabsContent value="stats">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardTitle>Race Statistics</CardTitle>
                    <CardDescription className="text-white/80">
                      Historical performance and data analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Performance by Age</h3>
                        <div className="grid grid-cols-5 gap-1 h-40">
                          {[3, 4, 5, 6, 7].map((age) => {
                            // Simulated win percentages by age
                            const heights = {
                              3: 30,
                              4: 65,
                              5: 85,
                              6: 60,
                              7: 40
                            };
                            return (
                              <div key={age} className="flex flex-col items-center">
                                <div className="flex-grow w-full flex items-end">
                                  <div 
                                    className={`w-full rounded-t-md bg-gradient-to-t from-blue-500 to-purple-500`}
                                    style={{ height: `${heights[age as keyof typeof heights]}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs font-medium text-blue-900 mt-1">{age} yrs</div>
                                <div className="text-xs text-blue-700">{heights[age as keyof typeof heights]}%</div>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          5-year-old horses have the highest win rate in this race historically.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-md font-bold text-blue-900 mb-3">Trainer Success Rate</h3>
                          <div className="space-y-2">
                            {["Aidan O'Brien", "John Gosden", "Charlie Appleby"].map((trainer, index) => {
                              // Simulated success rates
                              const rates = [42, 35, 28];
                              return (
                                <div key={trainer} className="flex items-center">
                                  <div className="w-24 text-xs text-blue-800">{trainer}</div>
                                  <div className="flex-grow">
                                    <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                        style={{ width: `${rates[index]}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="w-12 text-right text-xs font-medium text-blue-800">
                                    {rates[index]}%
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="text-md font-bold text-purple-900 mb-3">Ground Conditions</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {["Firm", "Good to Firm", "Good", "Soft"].map((ground) => {
                              // Highlight the current ground condition
                              const isCurrentGround = ground.toLowerCase() === race.ground.toLowerCase();
                              return (
                                <div 
                                  key={ground} 
                                  className={`p-2 rounded text-center text-sm ${
                                    isCurrentGround 
                                      ? 'bg-purple-200 text-purple-900 font-medium border border-purple-300' 
                                      : 'bg-purple-100 text-purple-700'
                                  }`}
                                >
                                  {ground}
                                  {isCurrentGround && (
                                    <span className="block text-xs mt-1">Current</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-purple-700 mt-3">
                            Today's conditions are {race.ground}, which historically favors horses with good form on fast ground.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <CardTitle>Race History</CardTitle>
                    <CardDescription className="text-white/80">
                      Previous winners and notable performances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-blue-100">
                            <th className="text-left p-2 text-blue-800">Year</th>
                            <th className="text-left p-2 text-blue-800">Horse</th>
                            <th className="text-left p-2 text-blue-800">Jockey</th>
                            <th className="text-left p-2 text-blue-800">Trainer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {race.previousWinners.map((winner) => (
                            <tr key={winner.year} className="border-b border-blue-50 hover:bg-blue-50">
                              <td className="p-2 font-medium text-blue-900">{winner.year}</td>
                              <td className="p-2 text-blue-800">{winner.horse}</td>
                              <td className="p-2 text-blue-700">{winner.jockey}</td>
                              <td className="p-2 text-blue-700">{winner.trainer}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-blue-900 mb-3">Race Records</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-700">Fastest Time</div>
                          <div className="font-bold text-blue-900">3m 41.06s (2019)</div>
                          <div className="text-xs text-blue-600">Set by Stradivarius</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-700">Longest Odds Winner</div>
                          <div className="font-bold text-blue-900">20/1 (2012)</div>
                          <div className="text-xs text-blue-600">Colour Vision</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 className="text-md font-bold text-purple-900 mb-2">Historical Note</h3>
                      <p className="text-sm text-purple-800">
                        The Gold Cup at Royal Ascot was established in 1807, making it one of the oldest and most prestigious races in the British racing calendar. Stradivarius holds the joint record for the most wins (4) alongside Yeats.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Betting and insights */}
          <div className="space-y-6">
            {/* Race details card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={18} className="text-yellow-300" />
                  Race Details
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-b from-white to-blue-50 space-y-3 py-4">
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-blue-700">Date & Time:</span>
                  <span className="font-medium text-blue-900">{race.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-blue-700">Venue:</span>
                  <span className="font-medium text-blue-900">{race.venue}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-blue-700">Distance:</span>
                  <span className="font-medium text-blue-900">{race.distance}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-blue-700">Prize Fund:</span>
                  <span className="font-medium text-blue-900">{race.prize}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-blue-700">Weather:</span>
                  <span className="font-medium text-blue-900">{race.weather}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-blue-700">Ground:</span>
                  <span className="font-medium text-blue-900">{race.ground}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Insights card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-yellow-300" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                  <h3 className="font-bold text-purple-900 mb-2">Recommendation:</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="font-medium text-purple-900">Thunderbolt (3/1)</div>
                  </div>
                  <p className="text-sm text-purple-800 mb-3">
                    Thunderbolt is highly recommended based on your betting history with favorites in prestigious races. The horse has excellent form and the jockey has a strong record at this venue.
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-purple-800">AI Confidence</span>
                    <span className="text-xs font-medium text-purple-900">87%</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: '87%' }}
                    ></div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Place Recommended Bet
                  </Button>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-purple-900 mb-2">Key Factors:</h3>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800">
                      <strong>Jockey Form:</strong> Ryan Moore has won this race 3 times in the last 5 years.
                    </div>
                    <div className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-sm text-purple-800">
                      <strong>Course Suitability:</strong> Thunderbolt has excellent form on this course type.
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800">
                      <strong>Current Form:</strong> Coming off two consecutive wins in similar races.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bet slip */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Award size={18} className="text-white" />
                  Your Bet Slip
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 mb-4">
                  <p className="text-amber-800 text-sm">
                    Add selections to your bet slip by clicking "Place Bet" on any runner.
                  </p>
                </div>
                
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                    <Award size={24} className="text-amber-500" />
                  </div>
                  <h3 className="text-amber-900 font-bold mb-1">No selections yet</h3>
                  <p className="text-sm text-amber-700">
                    Your bet slip is empty
                  </p>
                </div>
                
                <Button variant="outline" disabled className="w-full border-amber-200 text-amber-400 mt-4">
                  Place Bets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Race description */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-4">About This Race</h2>
          <p className="text-blue-800">
            {race.description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-100">
              <ExternalLink size={16} />
              Official Race Card
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-100">
              <Award size={16} />
              Race History
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-pink-200 text-pink-700 hover:bg-pink-100">
              <Clock size={16} />
              Live Stream
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4 text-center text-sm text-white/80">
        <p>© 2025 BetSmart • Responsible Gambling • Terms & Conditions • Privacy Policy</p>
      </footer>
    </div>
  );
};

export default RaceDetail;