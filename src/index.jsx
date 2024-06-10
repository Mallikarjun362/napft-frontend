// LIBRARY IMPORTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';

// APPLICATION IMPORTS
import MarketPlacePage from './pages/MarketPlacePage';
import NftDetailPage from './pages/NftDetailPage';
import PersonalPage from './pages/PersonalPage';
import About from './pages/About';
import App from './App';
import './index.css';

// PRIMARY APPLICATION ROUTE HANDLER
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'marketplace',
    element: <MarketPlacePage />,
  },
  {
    path: 'personalpage',
    element: <PersonalPage />,
  },
  {
    path: '/nft-detail-page/:tokenid',
    element: <NftDetailPage />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
