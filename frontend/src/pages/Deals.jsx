import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { Card, CardDescription, CardTitle } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';

function Deals({ url }) {

    const [deals, setDeals] = useState([]);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = useCallback(() => {
        setResult(
            deals.filter(
                (deal) =>
                    deal.name.toLowerCase().includes(query.toLowerCase()) ||
                    deal.region.toLowerCase().includes(query.toLowerCase()) ||
                    deal.cityName.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, deals]);

    // Debounce search for better performance
    useEffect(() => {
        const debounce = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(debounce);
    }, [query, handleSearch]);

    const loadDeals = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/deal/get`);
            if (response.data.success) {
                setDeals(response.data.deals);
                setResult(response.data.deals);
            } else {
                toast({ title: response.data.message, description: 'Unable to fetch deals.', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error Occurred', description: error.message, variant: 'destructive' });
        }
    }, [url]);

    useEffect(() => {
        loadDeals();
    }, [loadDeals]);

    return (
        <div className="p-8 bg-gray-800 min-h-screen">

            {/* Heading section */}
            <div className="flex flex-col items-center">
                <h2 className="text-4xl font-bold text-center w-fit bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">
                    Exclusive Travel Deals
                </h2>
            </div>

            {/* Search section */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex border border-gray-600 rounded-full w-full md:w-2/3 lg:w-1/2 p-2 bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search by name, destination, or region..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
                    />
                    <button className="p-2 text-gray-100 hover:text-white transition-colors duration-300">
                        <FaSearch size={20} />
                    </button>
                </div>
            </div>

            {/* Deals section */}
            {result.length === 0 ? (
                <div className="text-center text-gray-400 text-lg mt-8">No deals found. Try a different search query.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {result.map((deal) => (
                        <Card key={deal._id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-500 overflow-hidden">
                            <img src={`${url}/images/${deal.image}`} alt={deal.name} className="h-48 w-full object-cover" />
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

export default Deals;
