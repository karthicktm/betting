"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Trophy,
  Tag
} from "lucide-react";
import Link from 'next/link';
import Navigation from './Navigation';

const Calendar = () => {
  // Current date for the calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Helper function to get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Helper function to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Helper function to get day of week (0 = Sunday, 6 = Saturday)
  const getDayOfWeek = (date: Date) => {
    return date.getDay();
  };
  
  // Get first day of current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayOfWeek = getDayOfWeek(firstDayOfMonth);
  
  // Get days in current month
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  // Get previous month for filling in the calendar
  const daysInPreviousMonth = getDaysInMonth(
    currentDate.getFullYear(), 
    currentDate.getMonth() - 1
  );
  
  // Move to previous month
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Move to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Check if a date has races (simulated)
  const hasRaces = (date: Date) => {
    // Simulated race data - in a real app this would come from an API
    const raceDays = [1, 3, 5, 8, 12, 15, 17, 19, 22, 25, 28, 30];
    return raceDays.includes(date.getDate());
  };
  
  // Check if a date is the selected date
  const isSelectedDate = (date: Date) => {
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Get races for selected date (simulated)
  const getRacesForSelectedDate = () => {
    // Simulated race data - in a real app this would come from an API
    const racesByDate: Record<string, any[]> = {
      "2025-03-01": [
        {
          id: 101,
          name: "Spring Stakes",
          time: "14:30",
          venue: "Ascot",
          distance: "1 mile 2 furlongs",
          type: "Flat",
          featured: true,
          horses: 10,
          aiTip: "Morning Star",
          odds: "3/1"
        },
        {
          id: 102,
          name: "Maiden Handicap",
          time: "16:15",
          venue: "Ascot",
          distance: "6 furlongs",
          type: "Flat",
          featured: false,
          horses: 12,
          aiTip: "Swift Runner",
          odds: "5/1"
        }
      ],
      "2025-03-03": [
        {
          id: 103,
          name: "Newbury Chase",
          time: "15:00",
          venue: "Newbury",
          distance: "2 miles",
          type: "Jump",
          featured: false,
          horses: 8,
          aiTip: "High Flyer",
          odds: "7/2"
        }
      ],
      "2025-03-05": [
        {
          id: 104,
          name: "Champion Hurdle",
          time: "14:15",
          venue: "Cheltenham",
          distance: "2 miles",
          type: "Jump",
          featured: true,
          horses: 12,
          aiTip: "Winter Wind",
          odds: "4/1"
        },
        {
          id: 105,
          name: "Mares' Novices' Hurdle",
          time: "16:45",
          venue: "Cheltenham",
          distance: "2 miles 1 furlong",
          type: "Jump",
          featured: false,
          horses: 14,
          aiTip: "Elegant Lady",
          odds: "6/1"
        }
      ],
      "2025-03-08": [
        {
          id: 106,
          name: "Gold Cup",
          time: "15:30",
          venue: "Cheltenham",
          distance: "3 miles 2 furlongs",
          type: "Jump",
          featured: true,
          horses: 12,
          aiTip: "Mountain King",
          odds: "7/2"
        }
      ]
    };
    
    // Format selected date to a string key (YYYY-MM-DD)
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    return racesByDate[dateKey] || [];
  };
  
  // Get races for the selected date
  const selectedDateRaces = getRacesForSelectedDate();
  
  // Week days labels
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Build calendar grid
  const calendarDays = [];
  
  // Previous month days
  for (let i = 0; i < startingDayOfWeek; i++) {
    const day = daysInPreviousMonth - startingDayOfWeek + i + 1;
    calendarDays.push({
      day,
      month: 'previous',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    calendarDays.push({
      day: i,
      month: 'current',
      date,
      hasRaces: hasRaces(date),
      isToday: isToday(date),
      isSelected: isSelectedDate(date)
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows x 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      month: 'next',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
    });
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Racing Calendar</h1>
          <p className="text-white/80 max-w-2xl">
            Browse upcoming races and get personalized AI recommendations.
          </p>
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl">{getMonthName(currentDate)} {currentDate.getFullYear()}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {/* Week days headers */}
                  {weekDays.map((day) => (
                    <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, index) => (
                    <div 
                      key={index}
                      className={`aspect-square p-1 ${
                        day.month === 'current' 
                          ? 'bg-white border border-gray-100' 
                          : 'bg-gray-50 border border-gray-100 opacity-40'
                      } rounded-md overflow-hidden ${
                        day.isSelected ? 'ring-2 ring-purple-500' : ''
                      }`}
                      onClick={() => day.month === 'current' && setSelectedDate(day.date)}
                    >
                      <div className={`h-full w-full flex flex-col p-1 ${
                        day.month === 'current' ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}>
                        <div className={`flex justify-between items-start ${
                          day.isToday ? 'font-bold text-purple-700' : ''
                        }`}>
                          <span>{day.day}</span>
                          {day.hasRaces && (
                            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                          )}
                        </div>
                        {day.hasRaces && day.month === 'current' && (
                          <div className="mt-auto">
                            <div className="text-xs bg-purple-100 text-purple-800 p-0.5 rounded">
                              Races
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Races for selected date */}
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <CalendarIcon className="mr-2 h-5 w-5 text-purple-700" />
                <h2 className="text-xl font-bold text-gray-800">
                  Races on {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
              </div>
              
              {selectedDateRaces.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateRaces.map((race) => (
                    <Link href={`/races/${race.id}`} key={race.id}>
                      <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className={`p-4 md:w-2/3 ${race.featured ? 'border-l-4 border-l-purple-500' : ''}`}>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge className={`${
                                  race.type === 'Flat' 
                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                    : 'bg-amber-100 text-amber-800 border-amber-200'
                                }`}>
                                  {race.type}
                                </Badge>
                                {race.featured && (
                                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-bold text-gray-900">{race.name}</h3>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                                <div className="flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {race.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-1" />
                                  {race.venue}
                                </div>
                                <div className="flex items-center">
                                  <Trophy size={14} className="mr-1" />
                                  {race.horses} runners
                                </div>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 md:w-1/3 border-t md:border-t-0 md:border-l border-gray-100">
                              <div className="text-sm text-gray-700 mb-1">AI Recommendation</div>
                              <div className="font-medium text-purple-900">{race.aiTip}</div>
                              <div className="flex items-center mt-1">
                                <Tag size={14} className="mr-1 text-blue-500" />
                                <span className="text-sm text-blue-700">{race.odds}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="border-none shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No Races Scheduled</h3>
                    <p className="text-gray-500">
                      There are no races scheduled for this date. Please select a different date or check back later.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  Featured Events
                </CardTitle>
                <CardDescription className="text-white/80">
                  Major upcoming racing events
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  <div className="p-4 hover:bg-blue-50/50 transition-colors">
                    <div className="font-medium text-gray-900">Cheltenham Festival</div>
                    <div className="text-sm text-gray-500 mb-2">March 15-18, 2025</div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      4 days
                    </Badge>
                  </div>
                  <div className="p-4 hover:bg-blue-50/50 transition-colors">
                    <div className="font-medium text-gray-900">Grand National</div>
                    <div className="text-sm text-gray-500 mb-2">April 5, 2025</div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      Major Event
                    </Badge>
                  </div>
                  <div className="p-4 hover:bg-blue-50/50 transition-colors">
                    <div className="font-medium text-gray-900">Royal Ascot</div>
                    <div className="text-sm text-gray-500 mb-2">June 16-20, 2025</div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      5 days
                    </Badge>
                  </div>
                  <div className="p-4 hover:bg-blue-50/50 transition-colors">
                    <div className="font-medium text-gray-900">Epsom Derby</div>
                    <div className="text-sm text-gray-500 mb-2">June 5, 2025</div>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Classic
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                  View All Major Events
                </Button>
              </div>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Favorites</CardTitle>
                <CardDescription>
                  Races with high interest
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">Gold Cup</div>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        8 days
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Cheltenham, March 18</div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">Champion Hurdle</div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        5 days
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Cheltenham, March 15</div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-900">Queen Mother Chase</div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        6 days
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Cheltenham, March 16</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple-500 to-blue-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarIcon className="h-16 w-16 text-white/50" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Never Miss a Race</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Subscribe to race reminders and get notifications before your favorite events.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Set Up Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4 text-center text-sm text-white/80 mt-auto">
        <p>© 2025 BetSmart • Responsible Gambling • Terms & Conditions • Privacy Policy</p>
      </footer>
    </div>
  );
};

export default Calendar;