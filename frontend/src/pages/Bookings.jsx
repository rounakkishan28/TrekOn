"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "../hooks/use-toast.js";

function Bookings({ url }) {

    const [bookings, setBookings] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const loadBookings = async (token) => {
        try {
            const response = await axios.get(`${url}/api/booking/get`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setBookings(response.data.bookings);
                setTotalAmount(response.data.totalAmount);
            } else {
                toast({ title: response.data.message, type: "error" });
            }
        } catch (error) {
            toast({ title: "Failed to fetch bookings. Please try again later.", type: "error" });
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("trekon");
        if (token) {
            loadBookings(token);
        } else {
            toast({ title: "You are not logged in. Please log in to view your bookings.", type: "warning" });
        }
    }, [url]);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            
            {/* Heading section */}
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">
                Bookings
            </h2>

            {/* Bookings section */}
            {bookings.length === 0 ? (
                <div className="text-gray-400 text-lg">No booked deals available.</div>
            ) : (
                <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                    <TableCaption className="text-lg text-gray-400">A list of your recent bookings.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-28 sm:w-1/3">Image</TableHead>
                            <TableHead className="w-1/5">Name</TableHead>
                            <TableHead className="w-1/5">Description</TableHead>
                            <TableHead className="w-1/6">Place</TableHead>
                            <TableHead className="w-1/5 text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow
                                key={booking._id}
                                className="hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                            >
                                <TableCell className="w-1/3">
                                    <Link to={`/bookings/${booking._id}`}>
                                        <img
                                            src={`${url}/images/${booking.image}`}
                                            alt={booking.dealName || "Deal Image"}
                                            className="w-28 h-20 object-cover rounded-lg mx-auto sm:w-32 sm:h-24 lg:w-40 lg:h-28"
                                            loading="lazy"
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell className="w-1/5">{booking.dealName}</TableCell>
                                <TableCell className="w-1/6">{booking.dealDescription}</TableCell>
                                <TableCell className="w-1/5">
                                    {booking.cityName}, {booking.country}
                                </TableCell>
                                <TableCell className="w-1/5 text-right">₹ {booking.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="font-semibold text-lg">
                                Total
                            </TableCell>
                            <TableCell className="text-right font-semibold text-lg">₹ {totalAmount}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </div>
    );
}

export default Bookings;
