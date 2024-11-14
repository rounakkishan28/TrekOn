import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { RotatingLines } from 'react-loader-spinner';

function Deal({ url }) {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadDeal() {
    try {
      const response = await axios.get(`${url}/api/deal/${id}`);
      if (response.data.success) {
        setDeal(response.data.deal);
        setLoading(false);
      }
      else toast({ title: response.data.success });
    } catch (error) {
      toast({ title: 'Error Occured.' });
    }
  };

  useEffect(() => {
    loadDeal();
  }, []);

  if (loading) return (
    <div className='flex justify-center mt-20'>
      <RotatingLines height='80' width='80' strokeColor='#393939' strokeWidth='4' />
    </div>
  );

  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900'>
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{deal.name}</h1>
        <p className="text-gray-100 text-sm mb-4">Region: {deal.region}</p>
        <p className="text-lg text-gray-100 mb-6">{deal.description}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">${deal.price}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Activities</h2>
          <div className="flex flex-wrap gap-2">
            {deal.activities.map((activity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {deal.trending && (
          <p className="text-sm font-bold text-red-600">Trending Deal</p>
        )}

        <Link to={'/book'}>
          <Button className="mt-6 bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600 transition duration-200">
            Book Now
          </Button></Link>
      </div>
    </div>
  );
}

export default Deal;
