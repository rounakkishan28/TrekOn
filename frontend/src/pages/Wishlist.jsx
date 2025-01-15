"use client"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast.js";
import { Link } from "react-router-dom";

function Wishlist({ url }) {
    const [wishlist, setWishlist] = useState([]);

    async function loadWishlist(token) {
        try {
            const response = await axios.get(`${url}/api/wishlist/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) setWishlist(response.data.wishlist);
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('trekon');
        loadWishlist(token);
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Wishlist</h2>
            <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                <TableCaption className="text-lg text-gray-400">Deals saved to wishlist.</TableCaption>
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
                    {wishlist.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-700 transition-colors duration-300">
                            <TableCell className="w-1/3">
                            <Link to={`/deals/${item._id}`}>
                                <img src={`${url}/images/`+item.dealImage} alt={item.dealName} className="w-28 h-20 object-cover rounded-lg mx-auto sm:w-32 sm:h-24 lg:w-40 lg:h-28" />
                            </Link>
                            </TableCell>
                            <TableCell className="w-1/5">{item.dealName}</TableCell>
                            <TableCell className="w-1/5">{item.dealdescription}</TableCell>
                            <TableCell className="w-1/6">{item.cityName}, {item.country}</TableCell>
                            <TableCell className="w-1/5 text-right">₹ {item.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Wishlist;
