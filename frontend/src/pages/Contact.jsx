"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form.jsx';
import { Input } from '../components/ui/input.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { useToast } from '../hooks/use-toast.js';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message should be at least 10 characters" })
});

function Contact({ url }) {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    });

    async function onSubmit(values) {
        try {
            const response = await axios.post(`${url}/api/contact`, values);
            if (response.data.success) toast({ title: "Your message has been sent. " });
        } catch (error) {
            console.log(error);
            toast({ title: 'Error occured.' });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
            <Card className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
                <CardHeader className="text-center flex flex-col justify-center items-center">
                    <CardTitle className="text-3xl w-fit font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">Contact Us</CardTitle>
                    <CardDescription className="text-gray-300">We'd love to hear from you</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} className="border-gray-300 text-gray-100 focus:ring-gray-500 focus:border-gray-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} className="border-gray-300 text-gray-100 focus:ring-gray-500 focus:border-gray-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type your message here" {...field} className="border-gray-300 text-gray-100 focus:ring-gray-500 focus:border-gray-500" rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white py-2 px-4 rounded-full transition-all duration-200">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Contact;
