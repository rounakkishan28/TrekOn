"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';

function CityTours({ url }) {

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCities = async () => {
        try {
            const response = await axios.get(`${url}/api/city/get`);
            if (response.data.success) {
                setCities(response.data.cities);
            } else {
                toast({ title: response.data.message, type: 'error' });
            }
        } catch (error) {
            toast({ title: 'Failed to load cities. Please try again later.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCities();
    }, [url]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
                <div className="text-gray-300">Loading cities...</div>
            </div>
        );
    }

    if (cities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-gray-100">
                <h2 className="text-4xl font-bold mb-4">City Tours</h2>
                <p className="text-xl text-gray-400">No cities available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 min-h-screen text-gray-100">

            {/* Heading section */}
            <h2 className="text-4xl font-bold text-center mb-8 sm:text-3xl lg:text-5xl">
                City Tours
            </h2>

            {/* Cities section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cities.map((city) => (
                    <div
                        key={city._id}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={`${url}/images/${city.image}`}
                            alt={city.name}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-semibold text-gray-100">{city.name}</h3>
                            <p className="text-xl font-medium text-gray-400">{city.country}</p>
                            <p className="text-gray-300 mt-2">{city.description}</p>
                            <Link to={`/city-tours/${city._id}`}>
                                <Button className="mt-4 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 rounded-full px-4 py-2">
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CityTours;
