import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button.jsx';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu.jsx';
import { SidebarTrigger } from '../ui/sidebar.jsx';
import { images } from '@/assets/index.js';

const destinations = [
    { title: "Trending deals", href: "/trending-deals" },
    { title: "Explore by region", href: "/explore-region" },
    { title: "City Tours", href: "/city-tours" }
];

const activities = [
    { title: "Mountain Trekking" },
    { title: "Aerial Activities" },
    { title: "Beach Activities" },
    { title: "Nature and Wildlife" },
    { title: "City and Urban Activities" },
    { title: "Winter Activities" },
    { title: "Desert Activities" }
];

function Header({ url, user }) {

    return (
        <div className="p-4 px-6 flex justify-between items-center shadow-lg bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100">
            
            <SidebarTrigger className='md:hidden' />

            {/* Logo */}
            <Link to={'/'}>
                <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-white to-gray-900">
                    TrekOn
                </h1>
            </Link>

            {/* Navigation Menu */}
            <NavigationMenu className='hidden md:block'>
                <NavigationMenuList className="flex space-x-3 lg:space-x-6 text-sm font-semibold text-gray-200">
                    <NavigationMenuItem>
                        <Link to="/">
                            <Button className="bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-900 transition-colors rounded-full px-4 py-2 shadow-md">
                                Home
                            </Button>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/deals">
                            <Button className="bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-900 transition-colors rounded-full px-4 py-2 shadow-md">
                                Deals
                            </Button>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-gray-800 text-gray-200 hover:text-white rounded-full hover:bg-gray-900 transition-colors shadow-md px-4 py-2">
                            Destinations
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[550px] gap-2 p-3 bg-gray-800 rounded-lg shadow-xl text-gray-100">
                                {destinations.map((item, index) => (
                                    <Link key={index} to={item.href}>
                                        <li className="text-center hover:bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:text-white cursor-pointer py-2 rounded-md transition-colors duration-200">
                                            {item.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-gray-800 text-gray-200 hover:text-white rounded-full hover:bg-gray-900 transition-colors shadow-md px-4 py-2">
                            Activities
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[550px] gap-2 p-3 bg-gray-800 rounded-lg shadow-xl text-gray-100">
                                {activities.map((item, index) => (
                                    <Link key={index} to={`/activities/${index}`}>
                                        <li className="text-center hover:bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:text-white cursor-pointer py-2 rounded-md transition-colors duration-200">
                                            {item.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/contact">
                            <Button className="bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-900 transition-colors rounded-full py-2 shadow-md">
                                Contact
                            </Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* User Profile / Sign In */}
            {!user ? <Link to={'/sign-in'}>
                <Button className="bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-900 transition-colors rounded-full px-4 py-2 shadow-md">
                    Sign In
                </Button>
            </Link> : <Link to={'/profile'}>
                <Button className="hidden md:flex items-center bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-900 transition-colors rounded-full pl-3 py-2 pr-0 shadow-md">
                    <span>{user.username}</span>
                    <img src={user.photo ? `${url}/images/` + user.photo : images.profile} alt='dp' className='w-8 h-8 rounded-full' />
                </Button>
                <div className='md:hidden'>
                    <img src={user.photo ? `${url}/images/` + user.photo : images.profile} alt='dp' className='w-9 h-9 rounded-full' />
                </div>
            </Link>}
        </div>
    );
}

export default Header;
