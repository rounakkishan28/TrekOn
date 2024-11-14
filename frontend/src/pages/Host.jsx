import React, { useState } from 'react';
import axios from 'axios';
import { toast } from '../hooks/use-toast.js';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { images } from '../assets/index.js';

function HostDeal({ url }) {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        region: '',
        city: '',
        country: '',
        activities: [],
        price: '',
    });

    const onTickHandler = (e) => {
        const { name, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            activities: checked
                ? [...prevData.activities, name]
                : prevData.activities.filter(activity => activity !== name)
        }));
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!data.name || !data.description || !data.region || !data.city || !data.country || data.activities.length === 0 || !data.price || !image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('region', data.region);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('activities', data.activities);
        formData.append('price', Number(data.price));
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/deal/create-deal`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    region: '',
                    city: '',
                    country: '',
                    activities: [],
                    price: '',
                });
                setImage(null);
                toast({ title: 'Your deal has been added.' });
            } else {
                toast({ title: response.data.message });
            }
        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 px-4 md:px-8'>
            <Card className="w-full max-w-7xl p-8 bg-gray-800 shadow-lg rounded-lg shadow-white border-0 my-10">
                <CardHeader className="text-center flex flex-col justify-center items-center mb-4">
                    <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                        Host a Deal
                    </CardTitle>
                    <CardDescription className="text-gray-300">Fill in the details to showcase your unique adventure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='flex flex-col lg:flex-row gap-10' onSubmit={onSubmitHandler} encType='multipart/form-data'>
                        <div className="flex flex-col w-full lg:w-1/3">
                            <p className='text-gray-300 mb-2 font-medium text-lg'>Image Upload</p>
                            <label htmlFor="image" className='cursor-pointer'>
                                <img
                                    className='w-full rounded-lg object-cover hover:shadow-xl transition-shadow duration-300'
                                    src={image ? URL.createObjectURL(image) : images.beach}
                                    alt="Product"
                                />
                            </label>
                            <input
                                type="file"
                                id='image'
                                hidden
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-6 w-full lg:w-2/3'>
                            <p className='text-gray-300 mb-2 font-medium text-lg'>Deal Information</p>

                            <input
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105'
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                name="name"
                                placeholder='Deal Name'
                                required
                            />

                            <textarea
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105'
                                onChange={onChangeHandler}
                                value={data.description}
                                name="description"
                                rows='4'
                                placeholder='Deal Description'
                                required
                            ></textarea>

                            <div className="flex gap-4 flex-col sm:flex-row">
                                <select
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105 w-full'
                                    onChange={onChangeHandler}
                                    value={data.region}
                                    name="region"
                                    required
                                >
                                    <option value="" disabled>Select Region</option>
                                    {/* Add other region options here */}
                                </select>

                                <input
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105 w-full'
                                    onChange={onChangeHandler}
                                    value={data.city}
                                    type="text"
                                    name='city'
                                    placeholder='City'
                                    required
                                />

                                <input
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105 w-full'
                                    onChange={onChangeHandler}
                                    value={data.country}
                                    type="text"
                                    name='country'
                                    placeholder='Country'
                                    required
                                />
                            </div>

                            <p className='text-gray-300 font-medium'>Activities</p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3'>
                                {["Mountain Trekking", "Aerial Activities", "Beach Activities", "Nature and Wildlife", "City and Urban Activities", "Winter Activities", "Desert Activities"].map((activity, index) => (
                                    <label key={index} className='flex items-center text-gray-300'>
                                        <input
                                            className='mr-2'
                                            onChange={onTickHandler}
                                            type="checkbox"
                                            name={activity}
                                        />
                                        {activity}
                                    </label>
                                ))}
                            </div>

                            <input
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform focus:scale-105'
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name='price'
                                placeholder='Price (₹)'
                                required
                            />

                            <button
                                type='submit'
                                className='w-full py-3 text-lg font-semibold bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white rounded-full shadow-md hover:shadow-xl border-2 border-transparent hover:border-gray-500 transition-all duration-200'
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default HostDeal;
