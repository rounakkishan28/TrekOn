"use client"

import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FaHome, FaSearch, FaComments, FaClipboardList, FaHeart, FaStar, FaPlusSquare } from "react-icons/fa";
import { Button } from "../components/ui/button.jsx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast.js";

const items = [
    { title: "Home", url: '/', icon: <FaHome /> },
    { title: "Search", url: '/search', icon: <FaSearch /> },
    { title: "Messages", url: '/messages', icon: <FaComments /> },
    { title: "Bookings", url: '/bookings', icon: <FaClipboardList /> },
    { title: "Wishlist", url: '/wishlist', icon: <FaHeart /> },
    { title: "Reviews", url: '/reviews', icon: <FaStar /> },
    { title: "Host Deal", url: '/host', icon: <FaPlusSquare /> }
];

function Wishlist({ url }) {
    const [wishlist, setWishlist] = useState([]);

    async function loadWishlist() {
        try {
            const response = await axios.get(`${url}/api/wishlist/get`);
            if (response.data.success) setWishlist(response.data.wishlist);
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        <SidebarProvider>
            <Sidebar className="h-screen bg-gray-800 text-gray-100">
                <SidebarHeader className="p-4 px-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 shadow-md">
                    <Link to="/">
                        <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-slate-600 via-white to-slate-600">
                            TrekOn
                        </h1>
                    </Link>
                </SidebarHeader>

                {/* Sidebar Content */}
                <SidebarContent className="pt-4 bg-gray-800">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to={item.url}
                                                className="flex items-center p-3 py-6 rounded-lg transition-colors duration-300 text-gray-100 hover:bg-slate-300"
                                            >
                                                <div className="mr-3 text-xl">{item.icon}</div>
                                                <span className=" text-base font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className='bg-gray-800'>
                    <Button className="flex py-7 justify-start bg-gray-800 hover:bg-slate-300 text-gray-100 hover:text-gray-900">
                        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
                        <span>Username</span>
                    </Button>
                </SidebarFooter>
            </Sidebar>

            <main className="w-full">
                <SidebarTrigger className="md:hidden" />
                <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
                    <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Wishlist</h2>
                    <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                        <TableCaption className="text-lg text-gray-400">Deals saved to wishlist.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Place</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wishlist.map((item) => (
                                <TableRow key={item._id} className="hover:bg-gray-700 transition-colors duration-300">
                                    <TableCell className="font-medium">
                                        <img src={item.deal.image} alt={item.deal.name} className="w-20 h-20 object-cover rounded-lg" />
                                    </TableCell>
                                    <TableCell>{item.deal.name}</TableCell>
                                    <TableCell>{item.deal.city.name}, {item.deal.city.country}</TableCell>
                                    <TableCell>{item.deal.description}</TableCell>
                                    <TableCell className="text-right">₹ {item.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </SidebarProvider>
    );
}

export default Wishlist;
