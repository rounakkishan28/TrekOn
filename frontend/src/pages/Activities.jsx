import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';

function Activities({ url }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState([]);
    var activity = null;
    if (id === '0') activity = 'Mountain Trekking';
    else if (id === '1') activity = 'Aerial Activities';
    else if (id === '2') activity = 'Beach Activities';
    else if (id === '3') activity = 'Nature and Wildlife';
    else if (id === '4') activity = 'City and Urban Activities';
    else if (id === '5') activity = 'Winter Activities';
    else if (id === '6') activity = 'Desert Activities';

    async function loadActivityDeals() {
        try {
            const response = await axios.get(`${url}/api/deal/activity/get`, activity);
            if (response.data.success) setDeals(response.data.deals);
            else {
                toast({ title: response.data.message });
            }
            setLoading(false);
        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };

    useEffect(() => {
        loadActivityDeals();
    }, []);

    if (loading) return (
        <div className='flex justify-center mt-20'>
            <RotatingLines height='80' width='80' strokeColor='#393939' strokeWidth='4' />
        </div>
    );

    return (
        <div className="p-6 sm:p-4 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-gray-100 min-h-screen">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">{activity}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {deals.map((deal) => (
                    <div key={deal._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover sm:h-60 md:h-64 lg:h-72" />
                        <div className="p-4">
                            <h3 className="text-xl sm:text-2xl font-semibold">{deal.name}</h3>
                            <p className="text-gray-300 mt-2 text-sm sm:text-base">{deal.description}</p>
                            <Link to={`/deals/${deal._id}`}>
                                <Button className="mt-4 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white transition duration-300 rounded-full px-3 sm:px-4 py-2">
                                    View Details <FaArrowRight className="inline-block ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;
