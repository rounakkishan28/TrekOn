"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { FaArrowRight, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { Button } from '../components/ui/button.jsx';
import { Card, CardDescription,CardTitle } from '@/components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';

function RegionDeals({ url }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState([]);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');
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

    function handleSearch() {
        if (!query.trim()) setResult(deals);
        setResult(deals.filter(deal => deal.name.toLowerCase().includes(query.toLowerCase()) || deal.region.toLowerCase().includes(query.toLowerCase()) || deal.cityName.toLowerCase().includes(query.toLowerCase())));
    }

    async function loadRegionDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/region/${id}`);
            if (response.data.success) {
                setDeals(response.data.deals);
                setResult(response.data.deals);
                setLoading(false);
            } else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error occured.' });
        }
    };

    useEffect(() => {
        loadRegionDeals();
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
            <div className="flex items-center justify-center mb-8">
                <div className="flex border border-gray-600 rounded-full w-full md:w-2/3 lg:w-1/2 p-2 bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search by name, or destination..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
                    />
                    <button onClick={handleSearch} className="p-2 text-gray-100 hover:text-white transition-colors duration-300">
                        <FaSearch size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.map((deal) => (
                    <Card key={deal._id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-500 overflow-hidden">
                        <img src={`${url}/images/` + deal.image} alt={deal.name} className="h-48 w-full object-cover" />
                        <div className="p-4">
                            <CardTitle className="text-2xl font-semibold text-gray-100">{deal.name}</CardTitle>
                            <p className="text-gray-100 flex items-center gap-2">
                                <FaMapMarkerAlt /> <span>{deal.cityName}, {deal.country}</span>
                            </p>
                            <CardDescription className="mt-2 text-gray-400">{deal.description}</CardDescription>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-100">₹ {deal.price}</span>
                                <Link to={`/deals/${deal._id}`}>
                                    <Button className="bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 rounded-full px-4 py-2">
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

export default RegionDeals;
