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

    // List of keywords that should navigate to email app
    const navigationKeywords = [
      'features', 'best features', 'get started', 'start now',
      'try it', 'try out', 'demo', 'learn more', 'sign up',
      'explore', 'pricing', 'our product', 'tutorials', 'our service',
      'about us', 'careers', 'contact us', 'news', 'blog',
      'visit', 'go to', 'app', 'platform', 'mail', 'email'
    ];

    // Check if any keyword matches
    const hasNavigationKeyword = navigationKeywords.some(keyword =>
      clickedText.includes(keyword)
    );

    // Check for specific button/link areas by checking parent elements
    const isInNavElement =
      target.closest('[data-name*="btn"]') !== null ||
      target.closest('[data-name*="Button"]') !== null ||
      target.closest('[data-name*="features"]') !== null ||
      target.closest('[data-name="menu"]') !== null ||
      target.closest('[data-name="company"]') !== null ||
      target.closest('[data-name="solution"]') !== null ||
      target.closest('[data-name="left"]') !== null ||
      target.closest('[data-name="subscribe input"]') !== null ||
      target.closest('p') !== null; // Any paragraph that might be a nav link

    // Navigate if it's a navigation element or has a navigation keyword
    if (hasNavigationKeyword || (isInNavElement && clickedText.trim().length > 0)) {
      e.preventDefault();
      e.stopPropagation();
      navigate('/inbox');
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickedText = target.textContent?.toLowerCase() || '';

    // Keywords that indicate clickable elements
    const clickableKeywords = [
      'features', 'best features', 'get started', 'start now',
      'try it', 'try out', 'demo', 'learn more', 'sign up',
      'explore', 'pricing', 'our product', 'tutorials', 'our service',
      'about us', 'careers', 'contact us', 'news', 'blog',
      'visit', 'go to', 'app', 'platform', 'mail', 'email'
    ];

    const hasClickableKeyword = clickableKeywords.some(keyword =>
      clickedText.includes(keyword)
    );

    // Check for nav elements
    const isInNavElement =
      target.closest('[data-name*="btn"]') !== null ||
      target.closest('[data-name*="Button"]') !== null ||
      target.closest('[data-name*="features"]') !== null ||
      target.closest('[data-name="menu"]') !== null ||
      target.closest('[data-name="company"]') !== null ||
      target.closest('[data-name="solution"]') !== null ||
      target.closest('[data-name="left"]') !== null ||
      target.closest('[data-name="subscribe input"]') !== null;

    // Also check if the direct parent is a clickable nav element
    const isNavLink = target.tagName === 'P' &&
      (target.closest('[data-name*="company"]') !== null ||
       target.closest('[data-name*="solution"]') !== null ||
       target.closest('[data-name="left"]') !== null);

    if (hasClickableKeyword || isInNavElement || isNavLink) {
      target.style.cursor = 'pointer';
      // Add visual feedback
      target.style.transition = 'all 0.2s ease';
      target.style.opacity = '0.8';
      target.style.transform = 'scale(1.02)';
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.style.cursor === 'pointer') {
      target.style.opacity = '1';
      target.style.transform = 'scale(1)';
    }
  };

  const scaledHeight = 7934 * scale;

  return (
    <div
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="w-full bg-white overflow-x-hidden"
      style={{
        minHeight: '100vh',
        cursor: 'default'
      }}
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
