import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { EmailList } from './EmailList';
import { ComposeModal } from './ComposeModal';
import { FolderType } from '../types';
import { Youtube, ExternalLink, ChevronLeft } from 'lucide-react';
import {
  PanelResizeHandle,
  Panel,
  PanelGroup
} from 'react-resizable-panels';

type ViewMode = 'list' | 'detail';

export function MailLayout() {
  const { folder, emailId } = useParams();
  const currentFolder = (folder as FolderType) || 'inbox';
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-switch to detail view when email is selected on mobile
  useEffect(() => {
    if (emailId && isMobile) {
      setViewMode('detail');
    }
  }, [emailId, isMobile]);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden font-sans relative">
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
      />

      {/* YouTube Channel CTA Banner - Hidden on mobile */}
      <div className="hidden sm:flex bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 items-center justify-center gap-2 sm:gap-3 shadow-md z-20 flex-wrap">
        <Youtube className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-medium">Ram and June Inocencio want to know more about this</span>
        <a
          href="https://youtube.com/@ramandjuneinocencio?si=aY8miu2KXnZrk65Q"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-red-600 px-2 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-1 sm:gap-2 flex-shrink-0"
        >
          Visit Channel
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Layout - Single pane with view switching */}
        {isMobile ? (
          <div className="w-full h-full flex flex-col">
            {viewMode === 'list' ? (
              <EmailList folder={currentFolder} />
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white">
                  <button
                    onClick={() => setViewMode('list')}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    title="Back to list"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <span className="text-sm font-medium text-gray-600">Back</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <Outlet />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tablet and Desktop Layout - Multi-pane */
          <PanelGroup direction="horizontal">

            {/* Sidebar - Hidden on tablet, visible on desktop */}
            {!isTablet && (
              <>
                <Panel defaultSize={6} minSize={4} maxSize={12} className="hidden lg:block min-w-[80px]">
                  <Sidebar onComposeClick={() => setIsComposeOpen(true)} />
                </Panel>

                <PanelResizeHandle className="hidden lg:block w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />
              </>
            )}

            {/* Sidebar + Email List - Shown on tablet */}
            {isTablet && (
              <Panel
                defaultSize={100}
                minSize={25}
                maxSize={100}
                className="min-w-full flex"
              >
                <div className="w-20 flex-shrink-0">
                  <Sidebar onComposeClick={() => setIsComposeOpen(true)} />
                </div>
                <div className="flex-1">
                  <EmailList folder={currentFolder} />
                </div>
              </Panel>
            )}

            {/* Email List - Shown on desktop */}
            {!isTablet && (
              <Panel
                defaultSize={34}
                minSize={25}
                maxSize={40}
                className="min-w-[300px]"
              >
                <EmailList folder={currentFolder} />
              </Panel>
            )}

            {/* Divider - Hidden on tablet */}
            {!isTablet && (
              <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />
            )}

            {/* Reading Pane - Hidden on tablet, visible on desktop */}
            {!isTablet && (
              <Panel defaultSize={60} minSize={30}>
                <div className="h-full bg-white">
                  <Outlet />
                </div>
              </Panel>
            )}

          </PanelGroup>
        )}
      </div>
    </div>
  );
}
