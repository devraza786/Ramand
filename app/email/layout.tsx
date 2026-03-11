'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { ComposeModal } from '@/app/components/ComposeModal';
import { Youtube, ExternalLink } from 'lucide-react';
import { 
  PanelResizeHandle, 
  Panel, 
  PanelGroup 
} from 'react-resizable-panels';

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden font-sans relative">
      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
      
      {/* YouTube Channel CTA Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 flex items-center justify-center gap-3 shadow-md z-20">
        <Youtube className="w-5 h-5" />
        <span className="text-sm font-medium">Ram and June Inocencio want to know more about this</span>
        <a 
          href="https://youtube.com/@ramandjuneinocencio?si=aY8miu2KXnZrk65Q"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-red-600 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          Visit Our YouTube Channel
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <PanelGroup direction="horizontal">
          
          {/* Sidebar */}
          <Panel defaultSize={6} minSize={4} maxSize={12} className="min-w-[80px]">
            <Sidebar onComposeClick={() => setIsComposeOpen(true)} />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />
          
          {/* Email List and Reading Pane */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
          
        </PanelGroup>
      </div>
    </div>
  );
}
