"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form.jsx';
import { Input } from '../components/ui/input.jsx';
import { useToast } from '../hooks/use-toast.js';

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

function SignInPage({ url }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: ""
    }
  });

  async function onSubmit(values) {

    try {
      const response = await axios.post(`${url}/api/user/login`, values);
      if (response.data.success){
        localStorage.setItem('trekon', response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Error occured.' });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
      <Card className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
        <CardHeader className="text-center flex flex-col justify-center items-center">
          <CardTitle className="text-3xl w-fit font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">Sign In to TrekOn</CardTitle>
          <CardDescription className="text-gray-300">Get ready to tour with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email or Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email or username" {...field} className="border-gray-300 text-gray-100 focus:ring-gray-500 focus:border-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" {...field} className="border-gray-300 text-gray-100 focus:ring-gray-500 focus:border-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className='text-sm mt-4 text-gray-400'>
                Create a new account?{' '}
                <Link
                  to={'/sign-up'}
                  className='text-gray-300 font-medium cursor-pointer hover:underline'
                >
                  Sign Up
                </Link>
              </p>
              <Button type="submit" className="w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white py-2 px-4 rounded-full transition-all duration-200">
                Sign In
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
