import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card.jsx';
import { toast } from '../hooks/use-toast.js';
import { images } from '../assets/index.js';

function SignUpPage({ url }) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.firstname || !data.lastname || !data.username || !data.email) {
      return;
    }

    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        setData({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
        });
        setImage(null);
      } else {
        toast({ title: response.data.message });
      }
    } catch (error) {
      toast({ title: 'Error Occured.' });
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900'>
      <Card className="w-full max-w-md p-4 bg-gray-800 shadow-lg rounded-lg">
        <CardHeader className="text-center flex flex-col justify-center items-center">
          <CardTitle className="text-3xl w-fit font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
            Sign Up to TrekOn
          </CardTitle>
          <CardDescription className="text-gray-300">Get ready to tour with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
            <p className='text-gray-300 font-medium text-base'>Profile Pic</p>
            <div>
              <div className='h-24 flex justify-center items-center'>
                <label htmlFor="image" className='cursor-pointer border border-gray-100 rounded-full'>
                  <img
                    className='h-24 w-24 rounded-lg object-cover transition-shadow duration-300'
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
            </div>
            <div className='flex flex-col gap-5 w-full mt-2'>
              <div className='flex gap-2'>
                <div className='w-full'>
                  <p className='text-gray-300 font-medium text-base'>Firstname</p>
                  <input
                    className='px-1 py-1.5 text-gray-100 text-sm placeholder-zinc-500 placeholder:text-sm w-full bg-gray-800 rounded-md border border-gray-100 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-transform transform'
                    onChange={onChangeHandler}
                    value={data.firstname}
                    type="text"
                    name="firstname"
                    placeholder='  Enter firstname'
                    required
                  />
                </div>
                <div className='w-full'>
                  <p className='text-gray-300 font-medium text-base'>Lastname</p>
                  <input
                    className='px-1 py-1.5 text-gray-100 text-sm placeholder-zinc-500 placeholder:text-sm w-full bg-gray-800 rounded-md border border-gray-100 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-transform transform'
                    onChange={onChangeHandler}
                    value={data.lastname}
                    type="text"
                    name="lastname"
                    placeholder='  Enter lastname'
                    required
                  />
                </div>
              </div>

              <div>
                <p className='text-gray-300 font-medium text-base'>Username</p>
                <input
                  className='px-1 py-1.5 text-gray-100 text-sm placeholder-zinc-500 placeholder:text-sm w-full bg-gray-800 focus:border-gray-500 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-transform transform'
                  onChange={onChangeHandler}
                  value={data.username}
                  type="text"
                  name='username'
                  placeholder='  Enter your username'
                  required
                />
              </div>
              <div>
                <p className='text-gray-300 font-medium text-base'>Email</p>
                <input
                  className='px-1 py-1.5 text-gray-100 text-sm placeholder-zinc-500 placeholder:text-sm w-full bg-gray-800 focus:border-gray-500 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-transform transform'
                  onChange={onChangeHandler}
                  value={data.email}
                  type="text"
                  name='email'
                  placeholder='  Enter your email'
                  required
                />
              </div>
              <div>
                <p className='text-gray-300 font-medium text-base'>Password</p>
                <input
                  className='px-1 py-1.5 text-gray-100 text-sm placeholder-zinc-500 placeholder:text-sm w-full bg-gray-800 focus:border-gray-500 rounded-md border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-transform transform'
                  onChange={onChangeHandler}
                  value={data.password}
                  type="text"
                  name='password'
                  placeholder='  Enter your password'
                  required
                />
              </div>
              <p className='text-sm text-gray-400'>
                Already have an account?{' '}
                <Link
                  to={'/sign-in'}
                  className='text-gray-300 font-medium cursor-pointer hover:underline'
                >
                  Sign In
                </Link>
              </p>
              <Button
                type='submit'
                className='w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white py-2 px-4 rounded-full transition-all duration-200'
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
