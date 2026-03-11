import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailMarketingLandingPage from '../../imports/EmailMarketingLandingPage';

export function LandingPage() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);

  // Calculate responsive scale based on viewport width
  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      // Design is 1440px wide, scale proportionally for smaller screens
      const calculatedScale = Math.min(screenWidth / 1440, 1);
      setScale(calculatedScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Handle clicks on the landing page to navigate to email client
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Get the text content of the clicked element
    const clickedText = target.textContent?.toLowerCase() || '';

    // Check if clicking on any interactive elements that should navigate to email app
    const shouldNavigate =
      clickedText.includes('features') ||
      clickedText.includes('best features') ||
      clickedText.includes('get started') ||
      clickedText.includes('start now') ||
      clickedText.includes('try it') ||
      clickedText.includes('try out') ||
      clickedText.includes('demo') ||
      clickedText.includes('learn more') ||
      clickedText.includes('sign up') ||
      clickedText.includes('explore') ||
      clickedText.includes('pricing') ||
      // Check for specific button/link areas by checking parent elements
      target.closest('[data-name*="btn"]') !== null ||
      target.closest('[data-name*="Button"]') !== null ||
      target.closest('[data-name*="features"]') !== null ||
      target.closest('[data-name="menu"]') !== null;

    if (shouldNavigate) {
      e.preventDefault();
      e.stopPropagation();
      navigate('/inbox');
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickedText = target.textContent?.toLowerCase() || '';

    const isClickable =
      clickedText.includes('features') ||
      clickedText.includes('best features') ||
      clickedText.includes('get started') ||
      clickedText.includes('start now') ||
      clickedText.includes('try it') ||
      clickedText.includes('try out') ||
      clickedText.includes('demo') ||
      clickedText.includes('learn more') ||
      clickedText.includes('sign up') ||
      clickedText.includes('explore') ||
      clickedText.includes('pricing') ||
      target.closest('[data-name*="btn"]') !== null ||
      target.closest('[data-name*="Button"]') !== null ||
      target.closest('[data-name*="features"]') !== null ||
      target.closest('[data-name="menu"]') !== null;

    if (isClickable) {
      target.style.cursor = 'pointer';
    }
  };

  const scaledHeight = 7934 * scale;

  return (
    <div
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      className="w-full bg-white overflow-x-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Responsive wrapper with scaling */}
      <div
        style={{
          transform: scale < 1 ? `scale(${scale})` : 'none',
          transformOrigin: 'top center',
          width: scale < 1 ? `${1440}px` : '100%',
          height: scale < 1 ? `${scaledHeight}px` : 'auto',
          margin: scale < 1 ? '0 auto' : '0',
        }}
      >
        <EmailMarketingLandingPage />
      </div>

      {/* Mobile-optimized fallback message */}
      {scale < 0.6 && (
        <div className="text-center py-8 px-4 text-gray-600">
          <p className="text-sm mb-4">Landing page is best viewed on larger screens</p>
          <button
            onClick={() => navigate('/inbox')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Email Client →
          </button>
        </div>
      )}
    </div>
  );
}
