import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MailLayout } from './components/MailLayout';
import { EmailDetailWrapper, EmailDetailPlaceholder } from './components/EmailDetailWrapper';
import { LandingPage } from './components/LandingPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/email",
    element: <Navigate to="/email/inbox" replace />,
  },
  {
    path: "/email/:folder",
    element: <MailLayout />,
    children: [
      {
        index: true,
        element: <EmailDetailPlaceholder />,
      },
      {
        path: ":emailId",
        element: <EmailDetailWrapper />,
      },
    ],
  },
  {
    path: "/:folder",
    element: <MailLayout />,
    children: [
      {
        index: true,
        element: <EmailDetailPlaceholder />,
      },
      {
        path: ":emailId",
        element: <EmailDetailWrapper />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
