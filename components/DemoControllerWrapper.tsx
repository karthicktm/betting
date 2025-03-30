"use client";

import React from 'react';
import DemoController from './DemoController';
import { useDemo } from './DemoContext';
import { Button } from '@/components/ui/button';
import { Play, StopCircle } from 'lucide-react';

const DemoControllerWrapper = () => {
  const { isDemoMode, toggleDemoMode, triggerAction } = useDemo();

  return (
    <>
      {/* Demo Mode Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button 
          onClick={toggleDemoMode}
          className={`rounded-full shadow-lg flex items-center gap-2 ${
            isDemoMode 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
          }`}
        >
          {isDemoMode ? (
            <>
              <StopCircle size={16} />
              <span>Stop Demo</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Start Demo</span>
            </>
          )}
        </Button>
      </div>

      {/* Only show controller when in demo mode */}
      {isDemoMode && (
        <DemoController onTriggerAction={triggerAction} />
      )}
    </>
  );
};

export default DemoControllerWrapper;