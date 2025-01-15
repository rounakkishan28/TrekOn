import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';
import { images } from '../assets/index.js';

function AddCity({ url }) {

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        country: '',
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!data.name || !data.description || !data.country || !image) {
            toast({ title: 'All fields are required.' });
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('country', data.country);
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/city/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    country: '',
                });
                setImage(null);
                setImagePreview(null);
                toast({ title: 'City has been successfully added.', type: 'success' });
            } else {
                toast({ title: response.data.message, type: 'error' });
            }
        } catch (error) {
            toast({ title: 'An error occurred while adding the city.', type: 'error' });
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 px-4 md:px-8">
            <Card className="w-full max-w-7xl p-8 bg-gray-800 shadow-lg rounded-lg shadow-white border-0 my-10">

                {/* Heading section */}
                <CardHeader className="text-center flex flex-col justify-center items-center mb-4">
                    <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                        Add City
                    </CardTitle>
                    <CardDescription className="text-gray-300">Fill in the details to add a new city.</CardDescription>
                </CardHeader>

                {/* Form section */}
                <CardContent>
                    <form
                        className="flex flex-col lg:flex-row gap-10"
                        onSubmit={onSubmitHandler}
                        encType="multipart/form-data"
                    >
                        {/* Image Upload */}
                        <div className="flex flex-col w-full lg:w-1/3">
                            <p className="text-gray-300 mb-2 font-medium text-lg">Image Upload</p>
                            <label
                                htmlFor="image"
                                className="cursor-pointer h-60 flex justify-center items-center p-10 border-2 border-dashed border-gray-500 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all"
                            >
                                <img
                                    className="w-full h-60 rounded-lg object-cover"
                                    src={imagePreview || images.upload_area}
                                    alt="City Preview"
                                />
                            </label>
                            <input
                                type="file"
                                id="image"
                                hidden
                                accept="image/*"
                                onChange={onImageChange}
                            />
                        </div>

                        {/* City Information */}
                        <div className="flex flex-col gap-6 w-full lg:w-2/3">
                            <p className="text-gray-300 mb-2 font-medium text-lg">City Information</p>
                            <input
                                className="p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform"
                                onChange={onChangeHandler}
                                value={data.name}
                                type="text"
                                name="name"
                                placeholder="City Name"
                                required
                            />
                            <textarea
                                className="p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform"
                                onChange={onChangeHandler}
                                value={data.description}
                                name="description"
                                rows="4"
                                placeholder="City Description"
                                required
                            ></textarea>
                            <input
                                className="p-3 text-gray-100 bg-gray-800 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform"
                                onChange={onChangeHandler}
                                value={data.country}
                                type="text"
                                name="country"
                                placeholder="Country"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 text-lg font-semibold bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white rounded-full shadow-md hover:shadow-xl border-2 border-transparent hover:border-gray-500 transition-all duration-200"
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

export default AddCity;
