'use client';

import { useRouter } from 'next/navigation';
import EmailMarketingLandingPage from '@/imports/EmailMarketingLandingPage';

export default function LandingPage() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if click is on a button or link
    if (target.closest('button') || target.closest('a')) {
      router.push('/email');
    }
  };

  return (
    <div onClick={handleClick}>
      <EmailMarketingLandingPage />
    </div>
  );
}
