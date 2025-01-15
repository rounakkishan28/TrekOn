"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "../hooks/use-toast.js";
import { IoMdCloseCircleOutline } from "react-icons/io";

function HostedDeals({ url }) {
    
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadHostedDeals(token) {
        if (!token) {
            toast({ title: "Authorization token not found!" });
            return;
        }

        try {
            const response = await axios.get(`${url}/api/deal/hosted-deal`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setDeals(response.data.deals);
            } else {
                toast({ title: response.data.message });
            }
        } catch (error) {
            toast({ title: "Error Occurred." });
        } finally {
            setLoading(false);
        }
    }

    async function onRemove(id) {
        const token = localStorage.getItem("trekon");
        if (!token) {
            toast({ title: "Authorization token not found!" });
            return;
        }

        try {
            const response = await axios.delete(`${url}/api/deal/delete/${id}`);
            if (response.data.success) {
                toast({ title: 'Deal removed.' });
                setDeals((prevDeals) => prevDeals.filter((deal) => deal._id !== id));
            } else {
                toast({ title: 'Error Occurred.' });
            }
        } catch (error) {
            toast({ title: 'Failed to delete deal.' });
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("trekon");
        loadHostedDeals(token);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
                <RotatingLines height="80" width="80" strokeColor="#393939" strokeWidth="4" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            {/* Heading section */}
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">
                Hosted Deals
            </h2>

            {/* Deals section */}
            {deals.length === 0 ? (
                <div className="text-gray-400 text-lg">No hosted deals available.</div>
            ) : (
                <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                    <TableCaption className="text-lg text-gray-400">List of your hosted deals.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-28 sm:w-1/3">Image</TableHead>
                            <TableHead className="w-1/5">Name</TableHead>
                            <TableHead className="w-1/6">Description</TableHead>
                            <TableHead className="w-1/5">Place</TableHead>
                            <TableHead className="w-1/5">Amount</TableHead>
                            <TableHead className="w-1/5">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deals.map((deal) => (
                            <TableRow
                                key={deal._id}
                                className="hover:bg-gray-700 h-10 transition-colors duration-300"
                            >
                                <TableCell className="w-1/3 text-left">
                                    <Link to={`/deals/${deal._id}`}>
                                        <img
                                            src={`${url}/images/` + deal.image}
                                            alt={deal.name}
                                            className="w-28 h-20 object-cover rounded-lg mx-auto sm:w-32 sm:h-24 lg:w-40 lg:h-28 cursor-pointer"
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell className="w-1/5">{deal.name}</TableCell>
                                <TableCell className="w-1/6">{deal.description}</TableCell>
                                <TableCell className="w-1/5">
                                    {deal.cityName}, {deal.country}
                                </TableCell>
                                <TableCell className="w-1/5">₹ {deal.price}</TableCell>
                                <TableCell className="w-1/5">
                                    <IoMdCloseCircleOutline onClick={() => onRemove(deal._id)} className="w-5 h-5 cursor-pointer" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default HostedDeals;
