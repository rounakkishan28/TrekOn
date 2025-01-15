import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Home from './pages/Home.jsx';
import App from './App.jsx';
import Deals from './pages/Deals.jsx';
import Deal from './pages/Deal.jsx';
import TrendingDeals from './pages/TrendingDeals.jsx';
import Explore from './pages/Explore.jsx';
import RegionDeals from './pages/RegionDeals.jsx';
import CityTours from './pages/CityTours.jsx';
import CityDeals from './pages/CityDeals.jsx';
import Activities from './pages/Activities.jsx';
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Messages from './pages/Messages';
import User from './pages/User';
import Bookings from './pages/Bookings.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Reviews from './pages/Reviews.jsx';
import HostedDeals from './pages/HostedDeals.jsx';
import HostDeal from './pages/Host.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import AddCity from './pages/AddCity';
import Booking from './pages/Booking';

const url = "http://localhost:5000";

const browserRouter = createBrowserRouter([
  { path: '/', element: <Home url={url} /> },
  {
    element: <App />,
    children: [
      { path: '/deals', element: <Deals url={url} /> },
      { path: '/deals/:id', element: <Deal url={url} /> },
      { path: '/trending-deals', element: <TrendingDeals url={url} /> },
      { path: '/explore-region', element: <Explore url={url} /> },
      { path: '/explore-region/:id', element: <RegionDeals url={url} /> },
      { path: '/city-tours', element: <CityTours url={url} /> },
      { path: '/city-tours/:id', element: <CityDeals url={url} /> },
      { path: '/activities/:id', element: <Activities url={url} /> },
      { path: '/contact', element: <Contact url={url} /> },
      { path: '/profile', element: <Profile url={url} /> },
      { path: '/messages', element: <Messages url={url} /> },
      { path: '/profile/:id', element: <User url={url} /> },
      { path: '/bookings', element: <Bookings url={url} /> },
      { path: '/bookings/:id', element: <Booking url={url} /> },
      { path: '/wishlist', element: <Wishlist url={url} /> },
      { path: '/reviews', element: <Reviews url={url} /> },
      { path: '/hosted-deals', element: <HostedDeals url={url} /> },
      { path: '/host', element: <HostDeal url={url} /> },
      { path: '/add-city', element: <AddCity url={url} /> },
    ]
  },
  { path: '/sign-up', element: <SignUpPage url={url} /> },
  { path: '/sign-in', element: <SignInPage url={url} /> },
], {
  future: {
    v7_normalizeFormMethod: true,
    v7_startTransition: true,
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
