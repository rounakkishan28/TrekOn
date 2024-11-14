import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import store from './redux/store.js';
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
import Message from './pages/Message.jsx';
import Bookings from './pages/Bookings.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Reviews from './pages/Reviews.jsx';
import HostedDeals from './pages/HostedDeals.jsx';
import HostDeal from './pages/Host.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const url = import.meta.env.BACKEND_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const browserRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home url={url} /> },
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
      { path: '/message', element: <Message url={url} /> },
      { path: '/bookings', element: <Bookings url={url} /> },
      { path: '/wishlist', element: <Wishlist url={url} /> },
      { path: '/reviews', element: <Reviews url={url} /> },
      { path: '/hosted-deals', element: <HostedDeals url={url} /> },
      { path: '/host', element: <HostDeal url={url} /> },
    ]
  },
  { path: '/sign-in', element: <SignInPage url={url} /> },
  { path: '/sign-up', element: <SignUpPage url={url} /> }
]);

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{ variables: '#393939' }}>
    <Provider store={store} >
      <RouterProvider router={browserRouter} />
    </Provider>
  </ClerkProvider>
);
