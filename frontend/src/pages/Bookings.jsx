"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "../hooks/use-toast.js";

function Bookings({ url }) {
    const [bookings, setBookings] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    async function loadBookings() {
        try {
            const response = await axios.get(`${url}/api/booking/get`);
            if (response.data.success) {
                setBookings(response.data.bookings);
                setTotalAmount(response.data.totalAmount);
            } else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Bookings</h2>
            <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                <TableCaption className="text-lg text-gray-400">A list of your recent bookings.</TableCaption>
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
                    {bookings.map((booking) => (
                        <TableRow key={booking._id} className="hover:bg-gray-700 transition-colors duration-300">
                            <TableCell className="font-medium">
                                <img src={booking.deal.image} alt={booking.deal.name} className="w-20 h-20 object-cover rounded-lg" />
                            </TableCell>
                            <TableCell>{booking.deal.name}</TableCell>
                            <TableCell>{booking.deal.city.name}, {booking.deal.city.country}</TableCell>
                            <TableCell>{booking.deal.description}</TableCell>
                            <TableCell className="text-right">₹ {booking.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="font-semibold text-lg">Total</TableCell>
                        <TableCell className="text-right font-semibold text-lg">₹ {totalAmount}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default Bookings;
