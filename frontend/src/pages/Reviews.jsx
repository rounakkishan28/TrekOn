"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { toast } from "../hooks/use-toast.js";
import { IoMdCloseCircleOutline } from "react-icons/io";

function Reviews({ url }) {
    const [reviews, setReviews] = useState([]);

    async function loadReviews(token) {
        try {
            const response = await axios.get(`${url}/api/review/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) setReviews(response.data.reviews);
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occurred.' });
        }
    };

    async function onDelete(id) {
        try{
            const response = await axios.delete(`${url}/api/review/delete/${id}`);
            if(response.data.success) toast({ title: 'Review removed.' });
            else toast({ title: 'Error Occured.' });
        } catch (error) {
            toast({ title: 'Failed to delete review.' });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('trekon');
        loadReviews(token);
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Reviews</h2>
            <Table className="w-full text-left border-collapse bg-gray-800 text-gray-200">
                <TableCaption className="text-lg text-gray-400">A list of your given reviews.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-28 sm:w-1/3">Deal Image</TableHead>
                        <TableHead className='w-1/5'>Deal Name</TableHead>
                        <TableHead className='w-1/6'>Comment</TableHead>
                        <TableHead className='w-1/5'>Rating</TableHead>
                        <TableHead className='w-1/5'>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review._id} className="hover:bg-gray-700 transition-colors duration-300">
                            <TableCell className="w-1/3">
                                <img src={`${url}/images/`+review.image} alt={review.dealName} className="w-28 h-20 object-cover rounded-lg mx-auto sm:w-32 lg:w-40 lg:h-28" />
                            </TableCell>
                            <TableCell className='w-1/5'>{review.dealName}</TableCell>
                            <TableCell className='w-1/6'>{review.comment}</TableCell>
                            <TableCell className="w-1/5">{review.rating}</TableCell>
                            <TableCell className="w-1/5"><IoMdCloseCircleOutline onClick={() => onDelete(review._id)} className="w-5 h-5 cursor-pointer" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Reviews;
