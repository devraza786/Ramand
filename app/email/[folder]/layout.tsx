'use client';

import React from 'react';
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
  return (
    <PanelGroup direction="horizontal" className="w-full h-full">
      {/* Email List */}
      <Panel defaultSize={34} minSize={25} maxSize={40} className="min-w-[300px]">
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
