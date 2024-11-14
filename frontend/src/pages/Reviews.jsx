"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "@/hooks/use-toast.js";

function Reviews({ url }) {
    const [reviews, setReviews] = useState([]);

    async function loadReviews() {
        try {
            const response = await axios.get(`${url}/api/review/get`);
            if (response.data.success) setReviews(response.data.reviews);
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Reviews</h2>
            <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                <TableCaption className="text-lg text-gray-400">A list of your given reviews.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Deal Image</TableHead>
                        <TableHead>Deal</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead className='text-right'>Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review._id} className="hover:bg-gray-700 transition-colors duration-300">
                            <TableCell className="font-medium">
                                <img src={review.deal.image} alt={review.deal.name} className="w-20 h-20 object-cover rounded-lg" />
                            </TableCell>
                            <TableCell>{review.deal.name}</TableCell>
                            <TableCell>{review.comment}</TableCell>
                            <TableCell className="text-right">{review.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Reviews;
