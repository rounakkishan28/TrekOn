import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import { Button } from './components/ui/button.jsx';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel } from './components/ui/sidebar.jsx';
import { toast } from './hooks/use-toast.js';
import axios from 'axios';
import { images } from './assets/index.js';

function App({ children }) {

  const token = localStorage.getItem('trekon');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const url = 'http://localhost:5000';

  async function loadDashboard() {
    try {
      const response = await axios.get(`${url}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.user);
        setLoading(false);
      } else{
        navigate('/sign-in');
      } 
    } catch (error) {
      // toast({ title: 'Errorkjn.' });
    }
  };

  useEffect(() => {
    if (!token) navigate('/sign-in');
    else loadDashboard();
  }, []);

  return (
    <SidebarProvider className="flex-col">
      <Sidebar className="md:hidden h-screen md:h-0 md:w-0 bg-gray-800 text-gray-100">
        <SidebarHeader className="p-4 px-6 bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900 shadow-md">
          <Link to="/">
            <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-white to-gray-900">
              TrekOn
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="bg-gray-800 pl-2">
          <SidebarGroup className='py-0'>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className='py-0'>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/deals'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Deals</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className='py-0'>
            <SidebarGroupLabel className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-white to-gray-400'>Destinations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/trending-places'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Trending places</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/explore-region'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Explore by region</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/city-tours'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">City Tours</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className='py-0'>
            <SidebarGroupLabel className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-white to-gray-400'>Activities</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${0}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Mountain Trekking</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${1}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Aerial Activities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${2}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Beach Activities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${3}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Nature and Wildlife</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${4}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">City and Urban Activities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${5}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Winter Activities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/activities/${6}`}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Desert Activities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className='py-0'>
            <SidebarGroupLabel className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-white to-gray-400'>Contact</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to={'/contact'}
                      className="flex items-center p-3 py-6 rounded-full transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                    >
                      <span className=" text-base font-medium">Contact Us</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className='bg-gray-800'>
          {!user ? <Link to={'/sign-in'}>
            <Button className="bg-gray-800 text-gray-200 hover:text-white hover:bg-gradient-to-br hover:from-gray-900 hover:via-gray-500 hover:to-gray-900 transition-colors duration-300 rounded-full px-4 py-2 shadow-md">
              Sign In
            </Button>
          </Link> : <Link to={'/profile'}>
            <Button className="flex py-7 w-full justify-start bg-gray-700 hover:bg-slate-300 text-gray-100 hover:text-gray-900">
              <img src={user.photo? `${url}/images/` + user.photo: images.profile} alt='dp' className="w-9 h-9" />
              <span className='ml-3 text-base'>{user.username}</span>
            </Button>
          </Link>}
        </SidebarFooter>
      </Sidebar>
      <main>
        {children}
        <Header url={url} user={user} />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  )
}

export default App;
