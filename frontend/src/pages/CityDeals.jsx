"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';

function CityDeals({ url }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [deals, setDeals] = useState([]);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');

    function handleSearch() {
        setResult(deals.filter(deal => deal.name.toLowerCase().includes(query.toLowerCase()) || deal.region.toLowerCase().includes(query.toLowerCase()) || deal.city.name.toLowerCase().includes(query.toLowerCase())));
    }

    async function loadCityDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/get/${id}`);
            if (response.data.success) {
                setCity(response.data.cityName);
                setCountry(response.data.cityCountry);
                setDeals(response.data.deals);
                setResult(response.data.result);
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
                {city}
            </h2>
            <p className='text-3xl font-semibold text-center'>{country}</p>
            <div className="flex items-center justify-center mb-8">
                <div className="flex border border-gray-600 rounded-full w-full md:w-2/3 lg:w-1/2 p-2 bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search by activity, or region..."
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
                            <Link to={`deals/${deal._id}`}>
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

export default CityDeals;
