"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "../hooks/use-toast.js";
import { Link } from "react-router-dom";

function HostedDeals({ url }) {
    const [deals, setDeals] = useState([]);

    async function loadHostedDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/hosted`);
            if (response.data.success) {
                setDeals(response.data.deals);
            } else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    useEffect(() => {
        loadHostedDeals();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Hosted Deals</h2>
            <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                <TableCaption className="text-lg text-gray-400">List of your hosted deals.</TableCaption>
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
                    {deals.map((deal) => (
                        <Link to={`/deals/${deal._id}`}>
                            <TableRow key={deal._id} className="hover:bg-gray-700 transition-colors duration-300">
                                <TableCell className="font-medium">
                                    <img src={deal.image} alt={deal.name} className="w-20 h-20 object-cover rounded-lg" />
                                </TableCell>
                                <TableCell>{deal.name}</TableCell>
                                <TableCell>{deal.city.name}, {deal.city.country}</TableCell>
                                <TableCell>{deal.description}</TableCell>
                                <TableCell className="text-right">₹ {deal.price}</TableCell>
                            </TableRow>
                        </Link>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default HostedDeals;
