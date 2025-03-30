"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Star, 
  TrendingUp, 
  BarChart, 
  Calendar, 
  Clock, 
  User, 
  Award,
  Percent,
  CheckCircle,
  Circle 
} from "lucide-react";

interface RecommendationAnalysisProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: {
    id: number;
    raceId: number;
    raceName: string;
    horseName: string;
    betType: string;
    odds: string;
    confidence: number;
    rationale: string;
    isLive: boolean;
  } | null;
}

const RecommendationAnalysis: React.FC<RecommendationAnalysisProps> = ({ 
  open, 
  onOpenChange,
  recommendation 
}) => {
  if (!recommendation) return null;
  
  // Convert fractional odds to decimal
  const getFractionalOdds = (odds: string) => {
    const parts = odds.split('/');
    const decimal = (parseInt(parts[0]) / parseInt(parts[1])) + 1;
    return decimal.toFixed(2);
  };
  
  // Simulated additional analysis data
  const analysisData = {
    jockey: {
      name: recommendation.id === 1 ? "Ryan Moore" : recommendation.id === 2 ? "Frankie Dettori" : "Oisin Murphy",
      winRate: recommendation.id === 1 ? 32 : recommendation.id === 2 ? 28 : 25,
      courseWins: recommendation.id === 1 ? 15 : recommendation.id === 2 ? 12 : 9,
      recentForm: recommendation.id === 1 ? "1-2-1-1" : recommendation.id === 2 ? "2-1-3-2" : "1-3-2-1"
    },
    horse: {
      age: recommendation.id === 1 ? 5 : recommendation.id === 2 ? 6 : 4,
      weight: recommendation.id === 1 ? "9-2" : recommendation.id === 2 ? "9-0" : "8-12",
      lifetime: {
        runs: recommendation.id === 1 ? 12 : recommendation.id === 2 ? 15 : 10,
        wins: recommendation.id === 1 ? 7 : recommendation.id === 2 ? 5 : 3,
        places: recommendation.id === 1 ? 3 : recommendation.id === 2 ? 7 : 5
      },
      courseRecord: recommendation.id === 1 ? "2 wins from 3 runs" : recommendation.id === 2 ? "1 win from 2 runs" : "1 win from 3 runs",
      distanceRecord: recommendation.id === 1 ? "4 wins from 6 runs" : recommendation.id === 2 ? "3 wins from 7 runs" : "2 wins from 4 runs",
      going: recommendation.id === 1 ? "Prefers good to firm" : recommendation.id === 2 ? "Versatile" : "Prefers good"
    },
    raceFactors: {
      fieldSize: recommendation.id === 1 ? 12 : recommendation.id === 2 ? 15 : 8,
      distance: recommendation.id === 1 ? "2 miles 4 furlongs" : recommendation.id === 2 ? "1 mile 4 furlongs" : "1 mile 2 furlongs",
      going: "Good to firm",
      courseCharacteristics: recommendation.id === 1 ? "Stamina test with uphill finish" : recommendation.id === 2 ? "Testing course with undulations" : "Fast, flat track",
      drawBias: recommendation.id === 1 ? "No significant bias" : recommendation.id === 2 ? "Middle draws favored" : "Low draws advantaged"
    },
    aiInsights: {
      keyStrengths: [
        recommendation.id === 1 ? "Strong recent form" : recommendation.id === 2 ? "Good course record" : "Distance specialist",
        recommendation.id === 1 ? "Jockey's excellent record at venue" : recommendation.id === 2 ? "Consistent placer" : "Good ground specialist",
        recommendation.id === 1 ? "Distance specialist" : recommendation.id === 2 ? "Strong finishing kick" : "Well handicapped"
      ],
      potentialRisks: [
        recommendation.id === 1 ? "Carrying top weight" : recommendation.id === 2 ? "First run in 60 days" : "Unproven at this class",
        recommendation.id === 1 ? "Prefers softer ground" : recommendation.id === 2 ? "Tends to start slowly" : "Inconsistent performer"
      ],
      bettingValue: recommendation.id === 1 ? "Fair value" : recommendation.id === 2 ? "Good value" : "Excellent value"
    },
    userRelevance: {
      relevanceScore: recommendation.confidence,
      historyMatch: recommendation.id === 1 ? "Strong match with your winning bets" : recommendation.id === 2 ? "Matches your successful each-way strategy" : "Aligns with your distance preferences",
      personalStats: recommendation.id === 1 ? "You've had 3 winning bets on this jockey" : recommendation.id === 2 ? "This race type has been profitable for you" : "You've won 2 bets with this horse"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-blue-50">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-purple-900">
            <Star className="text-yellow-500 fill-yellow-500" />
            AI Recommendation Analysis
          </DialogTitle>
          <DialogDescription>
            Detailed analysis of why this bet was recommended for you
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Recommendation Summary */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-5 rounded-lg border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Race</h3>
                <p className="text-lg font-bold text-gray-900">{recommendation.raceName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Selection</h3>
                <p className="text-lg font-bold text-gray-900">{recommendation.horseName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bet Type</h3>
                <p className="text-lg font-bold text-gray-900">{recommendation.betType}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Odds</h3>
                <div className="flex items-center">
                  <p className="text-lg font-bold text-gray-900 mr-2">{recommendation.odds}</p>
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    {getFractionalOdds(recommendation.odds)}
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">AI Confidence</h3>
                <div className="flex items-center">
                  <p className="text-lg font-bold text-gray-900 mr-2">{recommendation.confidence}%</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(recommendation.confidence / 20) 
                          ? "fill-yellow-500 text-yellow-500" 
                          : "text-gray-300"
                        } 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Potential Return</h3>
                <p className="text-lg font-bold text-green-600">
                  {recommendation.betType === "Win" 
                    ? `£10 returns £${(10 * parseFloat(getFractionalOdds(recommendation.odds))).toFixed(2)}` 
                    : `£5 E/W returns up to £${(5 * parseFloat(getFractionalOdds(recommendation.odds)) + 5 * (parseFloat(getFractionalOdds(recommendation.odds)) - 1) / 4 + 5).toFixed(2)}`
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Key Factors */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle size={20} className="text-green-500 mr-2" />
              Key Factors
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Jockey */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <User size={18} className="text-blue-600 mr-2" />
                  Jockey Analysis
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-800">{analysisData.jockey.name}</p>
                    <div className="flex items-center text-sm">
                      <TrendingUp size={14} className="text-gray-500 mr-1" />
                      <span className="text-gray-500">
                        Win rate: <span className="font-medium text-blue-700">{analysisData.jockey.winRate}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Course wins: </span>
                      <span className="font-medium">{analysisData.jockey.courseWins}</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Recent form: </span>
                      <span className="font-medium">{analysisData.jockey.recentForm}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Horse */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award size={18} className="text-blue-600 mr-2" />
                  Horse Profile
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Age: </span>
                      <span className="font-medium">{analysisData.horse.age}</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Weight: </span>
                      <span className="font-medium">{analysisData.horse.weight}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Record: <span className="font-medium">{analysisData.horse.lifetime.wins}-{analysisData.horse.lifetime.places}-{analysisData.horse.lifetime.runs - analysisData.horse.lifetime.wins - analysisData.horse.lifetime.places}</span>
                    </span>
                    <span className="text-blue-700 font-medium">
                      {Math.round((analysisData.horse.lifetime.wins / analysisData.horse.lifetime.runs) * 100)}% win rate
                    </span>
                  </div>
                  <div className="text-sm">
                    <div>
                      <span className="text-gray-600">Course: </span>
                      <span className="font-medium">{analysisData.horse.courseRecord}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance: </span>
                      <span className="font-medium">{analysisData.horse.distanceRecord}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Going: </span>
                      <span className="font-medium">{analysisData.horse.going}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Race */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar size={18} className="text-blue-600 mr-2" />
                  Race Conditions
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Runners: </span>
                      <span className="font-medium">{analysisData.raceFactors.fieldSize}</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-blue-700">Going: </span>
                      <span className="font-medium">{analysisData.raceFactors.going}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Distance: </span>
                    <span className="font-medium">{analysisData.raceFactors.distance}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Course: </span>
                    <span className="font-medium">{analysisData.raceFactors.courseCharacteristics}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Draw: </span>
                    <span className="font-medium">{analysisData.raceFactors.drawBias}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Percent size={20} className="text-purple-600 mr-2" />
              AI Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-purple-900 mb-3">Key Strengths</h3>
                <ul className="space-y-2">
                  {analysisData.aiInsights.keyStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <Circle size={6} className="mt-2 mr-2 fill-green-500 text-green-500" />
                      <span className="text-sm text-purple-800">{strength}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium text-purple-900 mb-3 mt-4">Potential Risks</h3>
                <ul className="space-y-2">
                  {analysisData.aiInsights.potentialRisks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <Circle size={6} className="mt-2 mr-2 fill-amber-500 text-amber-500" />
                      <span className="text-sm text-purple-800">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/60 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-3">Why This is Recommended For You</h3>
                <div className="mb-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-purple-700 font-medium">Relevance Score</span>
                    <span className="font-medium text-blue-700">{analysisData.userRelevance.relevanceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${analysisData.userRelevance.relevanceScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-purple-800 mb-3">
                  <strong>Match with your history:</strong> {analysisData.userRelevance.historyMatch}
                </p>
                
                <p className="text-sm text-purple-800 mb-3">
                  <strong>Personal statistics:</strong> {analysisData.userRelevance.personalStats}
                </p>
                
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <p className="font-medium mb-1">Betting Value Assessment</p>
                  <p>Our AI rates this as <strong>{analysisData.aiInsights.bettingValue}</strong> based on current odds and your betting profile.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rationale */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart size={20} className="text-blue-600 mr-2" />
              Rationale Summary
            </h2>
            <p className="text-gray-700">
              {recommendation.rationale}
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Place Bet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationAnalysis;