'use client';

import { useMemo } from 'react';
import { EmailDetail } from '@/app/components/EmailDetail';
import { mockEmails } from '@/app/data/mockEmails';

export default function EmailPage({ params }: { params: { emailId: string } }) {
  const email = useMemo(
    () => mockEmails.find((e) => e.id === params.emailId),
    [params.emailId]
  );

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <p className="text-lg font-medium">Email not found</p>
          <p className="text-sm mt-2">The email you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  return <EmailDetail email={email} />;
}
