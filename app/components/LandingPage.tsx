import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmailMarketingLandingPage from '../../imports/EmailMarketingLandingPage';

export function LandingPage() {
  const navigate = useNavigate();

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

  return (
    <div
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      className="w-full min-h-screen bg-white overflow-x-hidden"
    >
      <EmailMarketingLandingPage />
    </div>
  );
}
