"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { FaComments, FaStar, FaCalendarCheck } from "react-icons/fa";
import axios from "axios";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { toast } from "../hooks/use-toast.js";
import { images } from "../assets/index.js";

function User({ url }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [hosted, setHosted] = useState(0);
    const [reviews, setReviews] = useState(0);

    async function loadDashboard() {
        try {
            const response = await axios.get(`${url}/api/user/${id}`);
            if (response.data.success) {
                setPhoto(response.data.photo);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setUsername(response.data.username);
                setHosted(response.data.hosted);
                setReviews(response.data.reviews);
                setLoading(false);
            } else toast({ title: 'Failed.' });
        } catch (error) {
            toast({ title: 'Error.' });
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <RotatingLines height="80" width="80" strokeColor="#393939" strokeWidth="4" />
                </div>
            ) : (
                <div>
                    <div className="p-4 sm:p-6 min-h-screen bg-gray-800 text-gray-100">

                        {/* User Profile Section */}
                        <div className="flex flex-col sm:flex-row max-w-6xl mx-auto items-center bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                            <img
                                src={photo ? `${url}/images/` + photo : images.profile}
                                alt="dp"
                                className="w-32 h-32 rounded-full shadow-lg mb-4 sm:mb-0"
                            />
                            <div className="text-center sm:text-left sm:ml-6">
                                <p className="text-2xl font-semibold text-gray-200">
                                    {firstname} {lastname}
                                </p>
                                <p className="text-gray-400 text-lg">@{username}</p>
                            </div>
                        </div>

                        {/* Dashboard Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                                Dashboard
                            </h2>
                        </div>

                        {/* Cards Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-6xl mx-auto">
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Hosted Deals</CardDescription>
                                        <FaCalendarCheck className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{hosted}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Total Reviews</CardDescription>
                                        <FaStar className="text-3xl text-gray-400" />
                                    </div>
                                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{reviews}</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/messages">
                                <Card className="w-fit bg-gradient-to-br from-gray-700 to-gray-800 border-0 rounded-full shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                                    <CardHeader>
                                        <div className="flex justify-between items-center gap-24">
                                            <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Message</CardDescription>
                                            <FaComments className="text-3xl text-gray-400" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default User;
