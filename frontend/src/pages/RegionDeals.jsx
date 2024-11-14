"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';

function RegionDeals() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState([]);
    var region = null;
    if (id === '0') region = 'Mountain Ranges';
    else if (id === '1') region = 'Beaches';
    else if (id === '2') region = 'Forests';
    else if (id === '3') region = 'Deserts';
    else if (id === '4') region = 'Lakes and Rivers';
    else if (id === '5') region = 'Waterfalls';
    else if (id === '6') region = 'Islands and Archipelagos';
    else if (id === '7') region = 'Caves and Caverns';
    else if (id === '8') region = 'Wetlands and Marshes';
    else if (id === '9') region = 'Glaciers and Polar';
    else if (id === '10') region = 'Canyons and Gorges';
    else if (id === '11') region = 'Volcanoes';

    async function loadCityDeals({ url }) {
        try {
            const response = await axios.get(`${url}/api/deal/region/get`, region);
            if (response.data.success) {
                setDeals(response.data.deals);
                setLoading(false);
            } else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error occured.' });
        }
    };

    useEffect(() => {
        loadCityDeals();
    }, []);

    if (loading) return (
        <div className='flex justify-center mt-20'>
            <RotatingLines height="80" width="80" strokeColor='#393939' strokeWidth='4' />
        </div>
    );

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            <h2 className="text-4xl font-bold text-center mb-8">
                {region}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {deals.map((deal) => (
                    <div key={deal._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <div className='flex justify-between'>
                                <h3 className="text-2xl font-semibold">{deal.name}</h3>
                                <h3 className="text-2xl font-semibold">{deal.price}</h3>
                            </div>
                            <p className='text-xl font-medium'>{deal.region}</p>
                            <p className="text-gray-300 mt-2">{deal.description}</p>
                            <Link to={`/deals/${deal._id}`}>
                                <Button className="mt-4 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 rounded-full px-4 py-2">
                                    View Details <FaArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RegionDeals;
