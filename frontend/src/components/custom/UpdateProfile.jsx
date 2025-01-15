import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '../ui/button.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { images } from '@/assets/index.js';
import { toast } from '@/hooks/use-toast.js';

function UpdateProfile({ url, setShowUpdatePic }) {
    const token = localStorage.getItem('trekon');
    const [image, setImage] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.put(`${url}/api/user/update-pic`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("eee")

            if (response.data.success) setImage(null);
            else toast({ title: response.data.message });

        } catch (error) {
            toast({ title: 'Error Occured.' });
        }
    };
    return (
        <div className="fixed inset-0 bg-black/[0.565] flex items-center justify-center z-50">
            <Card className="w-full max-w-sm p-4 bg-gray-800 shadow-lg rounded-lg">
                <CardHeader className="text-center flex-row justify-between items-center">
                    <CardTitle className="text-3xl w-fit font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                        Upload Image
                    </CardTitle>
                    <div onClick={() => setShowUpdatePic(false)} className='text-white rounded-full cursor-pointer font-semibold text-3xl tracking-widest'><IoMdCloseCircleOutline /></div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
                        <div>
                            <div className='h-32 flex justify-center items-center'>
                                <label htmlFor="image" className='cursor-pointer border border-gray-100 rounded-full'>
                                    <img
                                        className='h-32 w-32 rounded-lg object-cover transition-shadow duration-300'
                                        src={image ? URL.createObjectURL(image) : images.upload_area}
                                        alt="Product"
                                    />
                                </label>
                            </div>
                            <input
                                type="file"
                                id='image'
                                hidden
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                            <Button
                                type='submit'
                                className='w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white mt-4 py-2 px-4 rounded-full transition-all duration-200'
                            >
                                Update Pic
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProfile
