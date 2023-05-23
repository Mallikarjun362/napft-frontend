import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './pages/About'
import MarketPlacePage from './pages/MarketPlacePage'
import PersonalPage from './pages/PersonalPage'
import NftDetailPage from './pages/NftDetailPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "marketplace",
    element: <MarketPlacePage />,
  },
  {
    path: "personalpage",
    element: <PersonalPage />,
  },
  {
    path: "/nft-detail-page/:tokenid",
    element: <NftDetailPage />,
  },
])

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
)