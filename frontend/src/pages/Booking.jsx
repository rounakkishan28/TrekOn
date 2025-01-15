import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';

function Booking({ url }) {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const token = localStorage.getItem('trekon');
                const response = await axios.get(`${url}/api/booking/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setBooking(response.data.booking);
                } else {
                    toast({ title: response.data.message, type: 'error' });
                }
            } catch (error) {
                toast({ title: 'Failed to fetch booking details.', type: 'error' });
                console.error(error); // For debugging purposes
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [id, url]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
                <div className="loader border-t-4 border-gray-300 w-16 h-16 rounded-full animate-spin"></div>
                <p className="text-gray-300 text-lg ml-4">Loading booking details...</p>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
                <p className="text-gray-300 text-lg">Booking details not found.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 px-4 md:px-8">
            <Card className="w-full max-w-5xl p-8 bg-gray-800 shadow-lg rounded-lg shadow-white border-0 my-10">
                {/* Heading section */}
                <CardHeader className="text-center flex flex-col justify-center items-center mb-4">
                    <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                        Booking Details
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        All the information about your booking
                    </CardDescription>
                </CardHeader>

                {/* Booking details */}
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-1/3">
                            <img
                                src={`${url}/images/${booking.image || 'default-image.jpg'}`}
                                alt={booking.dealName || 'Deal Image'}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full lg:w-2/3">
                            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                                {booking.dealName || 'N/A'}
                            </h3>
                            <p className="text-gray-300 text-lg mb-2">
                                <strong>Description:</strong> {booking.dealDescription || 'N/A'}
                            </p>
                            <p className="text-gray-300 text-lg mb-2">
                                <strong>City:</strong> {booking.cityName || 'N/A'}
                            </p>
                            <p className="text-gray-300 text-lg mb-2">
                                <strong>Country:</strong> {booking.country || 'N/A'}
                            </p>
                            <p className="text-gray-300 text-lg mb-2">
                                <strong>Price:</strong> ₹ {booking.price || 'N/A'}
                            </p>
                            <p className="text-gray-300 text-lg mb-2">
                                <strong>Status:</strong>{' '}
                                {booking.isPaid ? (
                                    <span className="text-green-500">Paid</span>
                                ) : (
                                    <span className="text-red-500">Not Paid</span>
                                )}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Booking;
