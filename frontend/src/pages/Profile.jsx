"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";
import { FaComments, FaHeart, FaStar, FaCalendarCheck, FaPlusSquare } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "../components/ui/chart.jsx";
import { toast } from "../hooks/use-toast.js";

const chartConfig = {
    bookings: { label: "Bookings", color: "#393939" },
    reviews: { label: "reviews", color: "#919191" }
}

function Profile({ url }) {
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState(0);
    const [wishlist, setWishlist] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [hosted, setHosted] = useState(0);
    const [monthly, setMonthly] = useState(null);

    async function loadDashboard() {
        try {
            const response = await axios.get(`${url}/api/user/dashboard`);
            if (response.data.success) {
                setBookings(response.data.bookings);
                setWishlist(response.data.wishlist);
                setReviews(response.data.reviews);
                setHosted(response.data.hosted);
                setMonthly(response.data.monthly);
                setLoading(false);
            } else toast({ title: 'Error Occured.' });
        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div>
            {loading ? (
                <div className='flex justify-center mt-20'>
                    <RotatingLines height='80' width='80' strokeColor='#393939' strokeWidth='4' />
                </div>
            ) : (
                <div className="p-4 sm:p-6 min-h-screen bg-gray-800 text-gray-100">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center my-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">Dashboard</h2>
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <Link to={'/bookings'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Total Bookings</CardDescription>
                                        <FaCalendarCheck className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{bookings}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link to={'/reviews'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Total Reviews</CardDescription>
                                        <FaStar className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{reviews}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link to={'/wishlist'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Wishlist Items</CardDescription>
                                        <FaHeart className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{wishlist}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link to={'/hosted-deals'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Hosted Deals</CardDescription>
                                        <FaCalendarCheck className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{hosted}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link to={'/messages'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Messages</CardDescription>
                                        <FaComments className="text-3xl text-gray-400" />
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                        <Link to={'/host'}>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Host Deal</CardDescription>
                                        <FaPlusSquare className="text-3xl text-gray-400" />
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>

                    {/* Chart Section */}
                    <div className="mt-16 mx-auto max-w-4xl p-6 sm:p-8 bg-gray-800 rounded-lg shadow-md shadow-white">
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">Monthly Engagement</h2>
                        </div>
                        <ChartContainer config={chartConfig} className="h-80 min-h-[200px] w-full">
                            <BarChart data={monthly}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                    stroke="#CBD5E1"
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="bookings" fill="#60A5FA" radius={4} />
                                <Bar dataKey="reviews" fill="#FBBF24" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
