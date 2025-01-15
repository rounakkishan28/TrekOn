"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { FaArrowRight, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '../components/ui/button.jsx';
import { Card, CardDescription, CardTitle } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';

function CityDeals({ url }) {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [cityInfo, setCityInfo] = useState({ city: '', country: '' });
    const [deals, setDeals] = useState([]);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const searchQuery = query.trim().toLowerCase();
        if (!searchQuery) {
            setResult(deals);
            return;
        }
        setResult(
            deals.filter(
                (deal) =>
                    deal.name.toLowerCase().includes(searchQuery) ||
                    deal.region.toLowerCase().includes(searchQuery) ||
                    deal.cityName.toLowerCase().includes(searchQuery)
            )
        );
    };

    const loadCityDeals = async () => {
        try {
            const response = await axios.get(`${url}/api/deal/get/${id}`);
            if (response.data.success) {
                setCityInfo({ city: response.data.cityName, country: response.data.cityCountry });
                setDeals(response.data.deals);
                setResult(response.data.deals);
                setLoading(false);
            } else {
                toast({ title: response.data.message, type: 'error' });
            }
        } catch (error) {
            toast({ title: 'Failed to load city deals. Please try again later.', type: 'error' });
        }
    };

    useEffect(() => {
        loadCityDeals();
    }, [url, id]);

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <RotatingLines height="80" width="80" strokeColor="#393939" strokeWidth="4" />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">
            
            {/* Heading section */}
            <h2 className="text-4xl font-bold text-center mb-8">
                {cityInfo.city}, {cityInfo.country}
            </h2>

            {/* Search section */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex border border-gray-600 rounded-full w-full md:w-2/3 lg:w-1/2 p-2 bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search by name, or region..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full px-4 py-2 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
                        aria-label="Search deals"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-2 text-gray-100 hover:text-white transition-colors duration-300"
                        aria-label="Search"
                    >
                        <FaSearch size={20} />
                    </button>
                </div>
            </div>

            {/* Search section */}
            {result.length === 0 ? (
                <div className="text-center text-gray-400 text-lg">No deals found for your search.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {result.map((deal) => (
                        <Card
                            key={deal._id}
                            className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-500 overflow-hidden"
                        >
                            <img
                                src={`${url}/images/${deal.image}`}
                                alt={deal.name}
                                className="h-48 w-full object-cover"
                                loading="lazy"
                            />
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
            )}
        </div>
    );
}

export default CityDeals;
