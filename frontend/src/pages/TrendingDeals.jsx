"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';

function TrendingDeals({ url }) {
    const [deals, setDeals] = useState([]);

    async function loadTrendingDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/trending`);
            if (response.data.success) setDeals(response.data.trendingDeals);
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };

    useEffect(() => {
        loadTrendingDeals();
    }, []);

    return (
        <div className="p-8 bg-gray-800 min-h-screen">
            <div className='flex flex-col items-center'>
                <h2 className="text-4xl font-bold text-center w-fit bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Trending Deals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {deals.map((deal) => (
                    <Card key={deal._id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-500 overflow-hidden">
                        <img src={deal.image} alt={deal.name} className="h-48 w-full object-cover" />
                        <div className="p-4">
                            <CardTitle className="text-2xl font-semibold text-gray-800">{deal.name}</CardTitle>
                            <p className="text-gray-600 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-800" /> {deal.city.name}, {deal.city.country}
                            </p>
                            <CardDescription className="mt-2 text-gray-700">{deal.description}</CardDescription>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-800">{deal.price}</span>
                                <Link to={`/deals/${deal._id}`}>
                                    <Button variant='secondary' className='bg-gray-200 flex items-center gap-2 text-gray-800 hover:text-gray-900' asChild>
                                        View Details <FaArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default TrendingDeals;
