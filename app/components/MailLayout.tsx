import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { EmailList } from './EmailList';
import { ComposeModal } from './ComposeModal';
import { FolderType } from '../types';
import { Youtube, ExternalLink } from 'lucide-react';
import {
  PanelResizeHandle,
  Panel,
  PanelGroup
} from 'react-resizable-panels';

export function MailLayout() {
  const { folder } = useParams();
  const currentFolder = (folder as FolderType) || 'inbox';
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 flex flex-col overflow-hidden font-sans relative">
        <ComposeModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
        />

        {/* YouTube Channel CTA Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 flex flex-col items-center justify-center gap-2 shadow-md z-20">
          <Youtube className="w-4 h-4" />
          <span className="text-xs font-medium text-center">Ram and June Inocencio want to know more about this</span>
          <a
            href="https://youtube.com/@ramandjuneinocencio?si=aY8miu2KXnZrk65Q"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Visit YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile single-pane layout */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar onComposeClick={() => setIsComposeOpen(true)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <EmailList folder={currentFolder} />
            <div className="flex-1 overflow-auto bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Panel defaultSize={6} minSize={4} maxSize={12}>
            <Sidebar onComposeClick={() => setIsComposeOpen(true)} />
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />

          {/* Email List */}
          <Panel defaultSize={34} minSize={25} maxSize={40}>
            <EmailList folder={currentFolder} />
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />

          {/* Reading Pane */}
          <Panel defaultSize={60} minSize={30}>
            <div className="h-full bg-white">
              <Outlet />
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}
