import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { images } from '../assets/index.js';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';

function HostDeal({ url }) {

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        region: '',
        city: '',
        country: '',
        price: '',
        mountain: false,
        aerial: false,
        beach: false,
        nature: false,
        urban: false,
        winter: false,
        desert: false,
    });

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prevData) => ({ ...prevData, [name]: (type === 'checkbox') ? checked : value }));
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!data.name || !data.description || !data.region || !data.city || !data.country || !data.price || !image) {
            toast({ title: 'Fill in all the details.' });
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('region', data.region);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('price', Number(data.price));
        formData.append('image', image);
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'boolean') {
                formData.append(key, data[key]);
            }
        });

        try {
            console.log(formData);
            const token = localStorage.getItem('trekon');
            const response = await axios.post(`${url}/api/deal/create-deal`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    region: '',
                    city: '',
                    country: '',
                    price: '',
                    mountain: false,
                    aerial: false,
                    beach: false,
                    nature: false,
                    urban: false,
                    winter: false,
                    desert: false,
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

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 px-4 md:px-8'>
            <Card className="w-full max-w-7xl p-8 bg-gray-800 shadow-lg rounded-lg shadow-white border-0 my-10">

                {/* Heading section */}
                <CardHeader className="text-center flex flex-col justify-center items-center mb-4">
                    <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                        Host a Deal
                    </CardTitle>
                    <CardDescription className="text-gray-300">Fill in the details to showcase your unique adventure.</CardDescription>
                </CardHeader>

                {/* Form section */}
                <CardContent>
                    <form className='flex flex-col lg:flex-row gap-10' onSubmit={onSubmitHandler} encType='multipart/form-data'>
                        <div className="flex flex-col w-full lg:w-1/3">
                            <p className='text-gray-300 mb-2 font-medium text-lg'>Image Upload</p>
                            <label htmlFor="image" className='cursor-pointer h-60 flex justify-center items-center p-10 border-2 border-dashed border-gray-500 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all'>
                                    <img
                                        className='w-full h-60 rounded-lg object-cover'
                                        src={imagePreview || images.upload_area}
                                        alt="Deal Preview"
                                    />
                            </label>
                            <input
                                type="file"
                                id='image'
                                hidden
                                accept="image/*"
                                onChange={onImageChange}
                            />
                        </div>
                        <div className='flex flex-col gap-6 w-full lg:w-2/3'>
                            <p className='text-gray-300 mb-2 font-medium text-lg'>Deal Information</p>

                            <input
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform'
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                name="name"
                                placeholder='Deal Name'
                                required
                            />

                            <textarea
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform'
                                onChange={onChangeHandler}
                                value={data.description}
                                name="description"
                                rows='4'
                                placeholder='Deal Description'
                                required
                            ></textarea>

                            <div className="flex gap-4 flex-col sm:flex-row">
                                <select
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform w-full'
                                    onChange={onChangeHandler}
                                    value={data.region}
                                    name="region"
                                    required
                                >
                                    <option value="" disabled>Select Region</option>
                                    <option value='Beaches'>Beaches</option>
                                    <option value='Forests'>Forests</option>
                                    <option value='Deserts'>Deserts</option>
                                    <option value='Lakes and Rivers'>Lakes and Rivers</option>
                                    <option value='Waterfalls'>Waterfalls</option>
                                    <option value='Islands and Archipelagos'>Islands and Archipelagos</option>
                                    <option value='Caves and Caverns'>Caves and Caverns</option>
                                    <option value='Wetlands and Marshes'>Wetlands and Marshes</option>
                                    <option value='Glaciers and Gorges'>Glaciers and Gorges</option>
                                    <option value='Canyons and Gorges'>Canyons and Gorges</option>
                                    <option value='Volcanoes'>Volcanoes</option>
                                </select>

                                <input
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform w-full'
                                    onChange={onChangeHandler}
                                    value={data.city}
                                    type="text"
                                    name='city'
                                    placeholder='City'
                                    required
                                />

                                <input
                                    className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform w-full'
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
                                {[
                                    { name: 'mountain', label: 'Mountain Trekking' },
                                    { name: 'aerial', label: 'Aerial Activities' },
                                    { name: 'beach', label: 'Beach Activities' },
                                    { name: 'nature', label: 'Nature and Wildlife' },
                                    { name: 'urban', label: 'City and Urban Activities' },
                                    { name: 'winter', label: 'Winter Activities' },
                                    { name: 'desert', label: 'Desert Activities' },
                                ].map((activity) => (
                                    <label className="flex items-center text-gray-300" key={activity.name}>
                                        <input
                                            className="mr-2"
                                            onChange={onChangeHandler}
                                            checked={data[activity.name]}
                                            type="checkbox"
                                            name={activity.name}
                                        />
                                        {activity.label}
                                    </label>
                                ))}
                            </div>
                            <input
                                className='p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform'
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name='price'
                                placeholder='Price (₹)'
                                required
                            />
                            {console.log(data)}
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
