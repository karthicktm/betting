"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  RefreshCw, 
  Zap, 
  Award, 
  DollarSign, 
  Clock,
  Bell,
  ChevronDown
} from "lucide-react";

interface DemoControllerProps {
  onTriggerAction: (action: string, params?: any) => void;
}

const DemoController: React.FC<DemoControllerProps> = ({ onTriggerAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Demo scenarios
  const scenarios = [
    {
      id: 'new-recommendation',
      name: 'New AI Recommendation',
      description: 'Trigger a new AI-generated recommendation',
      icon: <Zap className="text-yellow-500" />
    },
    {
      id: 'race-starting',
      name: 'Race Starting Soon',
      description: 'Simulate a race about to begin',
      icon: <Clock className="text-blue-500" />
    },
    {
      id: 'winning-bet',
      name: 'Winning Bet',
      description: 'Simulate a winning bet notification',
      icon: <Award className="text-green-500" />
    },
    {
      id: 'deposit-completed',
      name: 'Deposit Completed',
      description: 'Simulate a successful deposit',
      icon: <DollarSign className="text-purple-500" />
    },
    {
      id: 'notification',
      name: 'New Notification',
      description: 'Trigger a system notification',
      icon: <Bell className="text-red-500" />
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg border-none bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Play size={16} /> Demo Controller
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                onClick={() => setIsOpen(false)}
              >
                <ChevronDown />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-3">
            <Tabs defaultValue="scenarios" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-3">
                <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="scenarios" className="space-y-2">
                {scenarios.map(scenario => (
                  <Button 
                    key={scenario.id}
                    variant="outline" 
                    className="w-full justify-start text-left border-gray-200 hover:bg-gray-50"
                    onClick={() => onTriggerAction(scenario.id)}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex items-center justify-center mr-2">
                        {scenario.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{scenario.name}</p>
                        <p className="text-xs text-gray-500">{scenario.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-700 mb-2">Demo Speed</p>
                    <div className="flex gap-2">
                      {['Slow', 'Normal', 'Fast'].map(speed => (
                        <Button 
                          key={speed}
                          variant="outline" 
                          size="sm"
                          className={speed === 'Normal' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                          onClick={() => onTriggerAction('set-speed', speed)}
                        >
                          {speed}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => onTriggerAction('reset-demo')}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Reset Demo
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Button 
          className="rounded-full h-12 w-12 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-0"
          onClick={() => setIsOpen(true)}
        >
          <Play size={24} />
        </Button>
      )}
    </div>
  );
};

export default DemoController;