import React, { useEffect, useState } from 'react';
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

    function handleSearch() {
        setResult(deals.filter(deal => deal.name.toLowerCase().includes(query.toLowerCase()) || deal.region.toLowerCase().includes(query.toLowerCase()) || deal.city.name.toLowerCase().includes(query.toLowerCase())));
    }

    async function loadDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/get`);
            if (response.data.success) {
                setDeals(response.data.deals);
                setResult(response.data.deals);
            }
            else toast({ title: response.data.message });
        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };

    useEffect(() => {
        loadDeals();
    }, []);

    return (
        <div className="p-8 bg-gray-800 min-h-screen">
            <div className='flex flex-col items-center'>
                <h2 className="text-4xl font-bold text-center w-fit bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-8">Exclusive Travel Deals</h2>
            </div>
            <div className="flex items-center justify-center mb-8">
                <div className="flex border border-gray-600 rounded-full w-full md:w-2/3 lg:w-1/2 p-2 bg-gray-800">
                    <input
                        type="text"
                        placeholder="Search by destination, activity, or region..."
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

export default Deals;
