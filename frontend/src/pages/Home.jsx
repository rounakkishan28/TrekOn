import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCog, FaDollarSign, FaMapMarkedAlt, FaRegCommentDots } from 'react-icons/fa';
import Autoplay from 'embla-carousel-autoplay';
import Footer from '../components/custom/Footer.jsx';
import { assets, images } from '../assets/index.js';
import { Button } from '../components/ui/button.jsx';
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion.jsx';
import Header from '../components/custom/Header.jsx';
import { toast } from '@/hooks/use-toast.js';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel } from '../components/ui/sidebar.jsx';

const working = [
    { title: 'Discover destinations', description: 'Explore a variety of destinations around the world, from popular attractions to hidden gems. Browse locations by type (e.g., mountains, beaches, cities) or explore trending destinations curated by our team.' },
    { title: 'Customize your experience', description: 'TrekOn offers flexible packages and customizable options to cater to your unique travel needs. Get in touch with our support team to tailor your trip, from daily schedules to special requests.' },
    { title: 'Share your experience', description: 'After your trip, don’t forget to share your feedback! Leave a review to help future travelers and share photos to inspire others. Your insights help us continually improve our offerings.' },
    { title: 'Host deals', description: 'With TrekOn, you can host exclusive deals directly on our platform, reaching a wide audience. Simply create an account, submit your deal details, and gain visibility among travelers searching for their next adventure.' }
];

const faqs = [
    { question: 'What is TrekOn?', answer: 'TrekOn is a travel platform that helps you discover amazing destinations, tours, and activities to make your trips memorable.' },
    { question: 'How can I book a tour?', answer: 'Simply browse our tours section, select the tour you are interested in, and follow the booking process on the page.' },
    { question: 'Is TrekOn available internationally?', answer: 'Yes! TrekOn offers travel experiences across multiple countries. You can explore destinations globally and find exciting tours and activities around the world.' },
    { question: 'How do I find best deals on TrekOn?', answer: 'Check our "Deals" page for seasonal discounts and special offers. Signing up for our newsletter will also keep you updated on the latest deals.' },
    { question: 'Is TrekOn safe for solo travelers?', answer: 'Absolutely! We have curated safe and enjoyable experiences for solo travelers, including guided tours and group activities where you can meet like-minded explorers.' },
    { question: 'Can I customize my itinerary?', answer: 'Absolutely! We offer customized itineraries for travelers looking for unique experiences. Reach out to our support team to discuss your travel plans.' },
    { question: 'How can I get more information about a specific destination?', answer: 'Each destination page has detailed information. If you need more specifics, feel free to reach out to our support team.' }
];

function Home({ children }) {
    
    const token = localStorage.getItem('trekon');
    const bannerPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
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
            } else toast({ title: 'Failed to load user profile.', variant: 'destructive' });
        } catch (error) {
            toast({ title: 'Error fetching user profile.', variant: 'destructive' });
        }
    };

    useEffect(() => {
        if (token) loadDashboard();
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
                            <img src={user.photo? `${url}/images/` + user.photo : images.profile} alt='dp' className="w-9 h-9" />
                            <span className='ml-3 text-base'>{user.username}</span>
                        </Button>
                    </Link>}
                </SidebarFooter>
            </Sidebar>
            <main>
                {children}
                <Header url={url} user={user} />
                <div className="bg-gray-800 flex-col min-h-screen text-gray-100">

                    {/* Hero Section */}
                    <Carousel plugins={[bannerPlugin.current]} className="relative w-full bg-opacity-70">
                        <CarouselContent>
                            {assets.map((item, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative">
                                        <img src={item} alt="background" className="object-cover w-full h-[300px] sm:h-[400px] md:h-[600px] opacity-80" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-70 flex items-center justify-center px-6 text-center">
                            <div className="max-w-2xl">
                                <h3 className="text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-white to-gray-600 font-extrabold mb-4">
                                    Discover Your Next Adventure
                                </h3>
                                <p className="text-md sm:text-lg md:text-2xl mb-4">Explore Trending Places And Unforgettable Experiences</p>
                                <Link to="/deals">
                                    <Button className="mt-5 bg-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 text-gray-200 hover:text-white transition-colors duration-300 rounded-full px-4 sm:px-6 py-3 shadow-lg">
                                        Explore Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel>

                    {/* Explore Section */}
                    <section className="my-10 sm:my-20 py-5 sm:py-10 mx-auto max-w-screen-xl px-4 sm:px-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all shadow-gray-500">
                        <Card>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Explore The World By Destination</h2>
                            <CardContent className="flex justify-center items-center p-0 h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
                                <img src={images.worldMap} alt="worldmap" className="object-cover w-full h-full rounded-lg shadow-lg" loading='lazy' />
                            </CardContent>
                        </Card>
                    </section>

                    {/* How It Works Section */}
                    <section className="flex flex-col items-center my-10 sm:my-20 py-5 sm:py-10 mx-auto max-w-screen-xl px-4 sm:px-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all shadow-gray-500">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400">How it Works?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-auto">
                            {working.map((item, index) => (
                                <Card key={index} className="w-full text-center border-0 bg-gradient-to-br from-gray-600 to-gray-800 shadow-md rounded-lg p-6">
                                    <CardHeader className='flex flex-col items-center'>
                                        {index === 0 && <FaMapMarkedAlt className="text-4xl text-gray-400 mb-2" />}
                                        {index === 1 && <FaCog className="text-4xl text-gray-400 mb-2" />}
                                        {index === 2 && <FaRegCommentDots className="text-4xl text-gray-400 mb-2" />}
                                        {index === 3 && <FaDollarSign className="text-4xl text-gray-400 mb-2" />}
                                        <CardTitle className="text-lg sm:text-xl mt-2 text-gray-200">{item.title}</CardTitle>
                                        <CardDescription className="text-sm text-gray-400 mt-2">
                                            {item.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="flex flex-col items-center my-10 sm:my-20 py-5 sm:py-10 mx-auto max-w-screen-xl px-4 sm:px-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl transition-all shadow-gray-500">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full sm:w-3/4 flex flex-col gap-2">
                            {faqs.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className='border-0'>
                                    <AccordionTrigger className="text-lg font-normal text-gray-300 hover:no-underline px-16 py-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-xl transition duration-300">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-gray-400 px-4 py-2">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                    <Footer />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Home;
