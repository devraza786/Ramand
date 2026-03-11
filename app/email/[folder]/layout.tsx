'use client';

import React, { useState, useEffect } from 'react';
import { EmailList } from '@/app/components/EmailList';
import {
  PanelResizeHandle,
  Panel,
  PanelGroup
} from 'react-resizable-panels';

export default function FolderLayout({
  params,
  children,
}: {
  params: { folder: string };
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 overflow-auto">
          <EmailList folder={params.folder} />
        </div>
        <div className="flex-1 overflow-auto bg-white border-t">
          {children}
        </div>
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal" className="w-full h-full">
      {/* Email List */}
      <Panel defaultSize={34} minSize={25} maxSize={40}>
        <EmailList folder={params.folder} />
      </Panel>

      <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize z-10" />

      {/* Reading Pane */}
      <Panel defaultSize={66} minSize={30}>
        <div className="h-full bg-white">
          {children}
        </div>
      </Panel>
    </PanelGroup>
  );
}
