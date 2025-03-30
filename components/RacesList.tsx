"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Filter, 
  MapPin, 
  Calendar,
  Search,
  ChevronRight,
  Star
} from "lucide-react";
import Link from 'next/link';
import Navigation from './Navigation';

const RacesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    courses: [] as string[],
    types: [] as string[]
  });

  // Simulated race data
  const races = [
    {
      id: 1,
      name: "Royal Ascot - Gold Cup",
      time: "Today, 15:30",
      date: "2025-03-30",
      venue: "Ascot Racecourse",
      distance: "2 miles 4 furlongs",
      type: "Flat",
      featured: true,
      televised: true,
      horses: 12,
      prize: "£500,000",
      image: "/images/race-ascot.jpg",
      popularityScore: 98,
      expectedOdds: "3/1 - 20/1",
      aiTip: "Thunderbolt (3/1)",
      aiTipConfidence: 87
    },
    {
      id: 2,
      name: "Epsom Derby",
      time: "Tomorrow, 14:15",
      date: "2025-03-31",
      venue: "Epsom Downs",
      distance: "1 mile 4 furlongs",
      type: "Flat",
      featured: true,
      televised: true,
      horses: 15,
      prize: "£1,500,000",
      image: "/images/race-epsom.jpg",
      popularityScore: 95,
      expectedOdds: "5/2 - 33/1",
      aiTip: "Silver Arrow (8/1)",
      aiTipConfidence: 76
    },
    {
      id: 3,
      name: "Newmarket Stakes",
      time: "Today, 17:45",
      date: "2025-03-30",
      venue: "Newmarket",
      distance: "1 mile 2 furlongs",
      type: "Flat",
      featured: false,
      televised: true,
      horses: 8,
      prize: "£100,000",
      image: "/images/race-newmarket.jpg",
      popularityScore: 85,
      expectedOdds: "2/1 - 12/1",
      aiTip: "Lucky Charm (2/1)",
      aiTipConfidence: 91
    },
    {
      id: 4,
      name: "Cheltenham Gold Cup",
      time: "April 12, 14:30",
      date: "2025-04-12",
      venue: "Cheltenham",
      distance: "3 miles 2 furlongs",
      type: "Jump",
      featured: true,
      televised: true,
      horses: 12,
      prize: "£625,000",
      image: "/images/race-cheltenham.jpg",
      popularityScore: 92,
      expectedOdds: "4/1 - 25/1",
      aiTip: "Mountain Spirit (7/2)",
      aiTipConfidence: 83
    },
    {
      id: 5,
      name: "Grand National",
      time: "April 5, 17:15",
      date: "2025-04-05",
      venue: "Aintree",
      distance: "4 miles 2 furlongs",
      type: "Jump",
      featured: true,
      televised: true,
      horses: 40,
      prize: "£1,000,000",
      image: "/images/race-aintree.jpg",
      popularityScore: 99,
      expectedOdds: "8/1 - 100/1",
      aiTip: "Northern Lights (12/1)",
      aiTipConfidence: 72
    },
    {
      id: 6,
      name: "York Stakes",
      time: "April 2, 16:15",
      date: "2025-04-02",
      venue: "York",
      distance: "1 mile 2 furlongs",
      type: "Flat",
      featured: false,
      televised: true,
      horses: 10,
      prize: "£90,000",
      image: "/images/race-york.jpg",
      popularityScore: 83,
      expectedOdds: "7/2 - 14/1",
      aiTip: "Summer Breeze (9/2)",
      aiTipConfidence: 78
    },
    {
      id: 7,
      name: "Goodwood Cup",
      time: "April 8, 15:35",
      date: "2025-04-08",
      venue: "Goodwood",
      distance: "2 miles",
      type: "Flat",
      featured: false,
      televised: true,
      horses: 9,
      prize: "£300,000",
      image: "/images/race-goodwood.jpg",
      popularityScore: 88,
      expectedOdds: "5/2 - 16/1",
      aiTip: "Ocean Wave (3/1)",
      aiTipConfidence: 85
    },
    {
      id: 8,
      name: "Kempton Park Chase",
      time: "April 3, 14:10",
      date: "2025-04-03",
      venue: "Kempton Park",
      distance: "2 miles",
      type: "Jump",
      featured: false,
      televised: false,
      horses: 8,
      prize: "£50,000",
      image: "/images/race-kempton.jpg",
      popularityScore: 75,
      expectedOdds: "3/1 - 10/1",
      aiTip: "Winter Frost (7/2)",
      aiTipConfidence: 69
    }
  ];

  // Get unique venues for filter
  const courses = [...new Set(races.map(race => race.venue))];
  const types = [...new Set(races.map(race => race.type))];

  // Filter races based on search term and filters
  const filteredRaces = races.filter(race => {
    // Search filter
    const searchMatch = race.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       race.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Course filter
    const courseMatch = filters.courses.length === 0 || filters.courses.includes(race.venue);
    
    // Type filter
    const typeMatch = filters.types.length === 0 || filters.types.includes(race.type);
    
    return searchMatch && courseMatch && typeMatch;
  });

  // Group races by date
  const todayRaces = filteredRaces.filter(race => race.time.includes('Today'));
  const tomorrowRaces = filteredRaces.filter(race => race.time.includes('Tomorrow'));
  const upcomingRaces = filteredRaces.filter(race => !race.time.includes('Today') && !race.time.includes('Tomorrow'));

  // Toggle course filter
  const toggleCourseFilter = (course: string) => {
    if (filters.courses.includes(course)) {
      setFilters({
        ...filters,
        courses: filters.courses.filter(c => c !== course)
      });
    } else {
      setFilters({
        ...filters,
        courses: [...filters.courses, course]
      });
    }
  };
  
  // Toggle type filter
  const toggleTypeFilter = (type: string) => {
    if (filters.types.includes(type)) {
      setFilters({
        ...filters,
        types: filters.types.filter(t => t !== type)
      });
    } else {
      setFilters({
        ...filters,
        types: [...filters.types, type]
      });
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      courses: [],
      types: []
    });
    setSearchTerm('');
  };

  // Check if any filters are active
  const hasActiveFilters = filters.courses.length > 0 || filters.types.length > 0 || searchTerm.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Races</h1>
          <p className="text-white/80 max-w-2xl">
            Explore upcoming horse racing events with AI-powered insights and personalized recommendations.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search races or venues..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${filterOpen ? 'bg-blue-50 text-blue-700 border-blue-200' : 'border-gray-200'}`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-1 bg-blue-500 text-white border-none">
                  {filters.courses.length + filters.types.length + (searchTerm ? 1 : 0)}
                </Badge>
              )}
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Find Races
            </Button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-bold text-blue-900 mb-3">Racecourses</h3>
                <div className="grid grid-cols-2 gap-2">
                  {courses.map(course => (
                    <div key={course} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`course-${course}`}
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 mr-2"
                        checked={filters.courses.includes(course)}
                        onChange={() => toggleCourseFilter(course)}
                      />
                      <label htmlFor={`course-${course}`} className="text-sm text-gray-700">{course}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-md font-bold text-blue-900 mb-3">Race Types</h3>
                <div className="flex gap-3">
                  {types.map(type => (
                    <Badge 
                      key={type}
                      className={`cursor-pointer ${
                        filters.types.includes(type) 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                      onClick={() => toggleTypeFilter(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:bg-blue-50 mr-2"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Tabs for race timing */}
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="grid grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All Races</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          {/* All Races Tab */}
          <TabsContent value="all">
            <RaceGrid races={filteredRaces} />
          </TabsContent>
          
          {/* Today's Races Tab */}
          <TabsContent value="today">
            {todayRaces.length > 0 ? (
              <RaceGrid races={todayRaces} />
            ) : (
              <EmptyState message="No races scheduled for today with your current filters." />
            )}
          </TabsContent>
          
          {/* Tomorrow's Races Tab */}
          <TabsContent value="tomorrow">
            {tomorrowRaces.length > 0 ? (
              <RaceGrid races={tomorrowRaces} />
            ) : (
              <EmptyState message="No races scheduled for tomorrow with your current filters." />
            )}
          </TabsContent>
          
          {/* Upcoming Races Tab */}
          <TabsContent value="upcoming">
            {upcomingRaces.length > 0 ? (
              <RaceGrid races={upcomingRaces} />
            ) : (
              <EmptyState message="No upcoming races match your current filters." />
            )}
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

// Race Grid Component
const RaceGrid = ({ races }: { races: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {races.map(race => (
        <Link href={`/races/${race.id}`} key={race.id} className="transition-transform hover:scale-[1.02]">
          <Card className="overflow-hidden h-full border-none shadow-lg">
            <div className="relative h-48">
              <img 
                src={race.image} 
                alt={race.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {race.featured && (
                    <Badge className="bg-purple-500 border-none text-white">
                      Featured
                    </Badge>
                  )}
                  {race.televised && (
                    <Badge className="bg-blue-500 border-none text-white">
                      Televised
                    </Badge>
                  )}
                  <Badge className={`${
                    race.type === 'Flat' 
                      ? 'bg-green-500 border-none text-white' 
                      : 'bg-amber-500 border-none text-white'
                  }`}>
                    {race.type}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white">{race.name}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/90 mt-1">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {race.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {race.venue}
                  </div>
                  <div>
                    {race.distance}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-blue-700">{race.horses} runners</div>
                <div className="text-sm font-medium text-purple-700">Prize: {race.prize}</div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-purple-900">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    AI Recommendation
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    {race.aiTipConfidence}% match
                  </Badge>
                </div>
                <p className="text-sm text-purple-800">{race.aiTip}</p>
              </div>
              
              <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center group">
                View Race Details
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

// Empty State Component
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-700 mb-2">No Races Found</h3>
      <p className="text-gray-500 max-w-md mx-auto">{message}</p>
      <Button 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => window.location.reload()}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default RacesList;