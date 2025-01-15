import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { toast } from '@/hooks/use-toast.js';

function Messages({ url }) {

    const token = localStorage.getItem('trekon');
    const [fetchAgain, setFetchAgain] = useState(false);
    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    // Load user profile
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${url}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) setUser(response.data.user);
                else toast({ title: 'Failed.' });
            } catch (error) {
                toast({ title: 'Error loading user profile.' });
            }
        };

        loadData();
    }, [url, token]);

    // Initialize socket connection
    useEffect(() => {
        if (user && !socket) {
            const newSocket = io(url);
            setSocket(newSocket);
            newSocket.emit('setup', user);
            newSocket.on('connection', () => {
                setSocketConnected(true);
                console.log('Socket connected.');
            });
            newSocket.on('typing', () => setTyping(true));
            newSocket.on('stop typing', () => setTyping(false));
        }
    }, [user, url, socket]);

    // Load chats when 'fetchAgain' changes
    useEffect(() => {
        const loadChats = async () => {
            try {
                const response = await axios.get(`${url}/api/chat/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) setChats(response.data.chats);
                else toast({ title: 'Error loading chats.' });
            } catch (error) {
                toast({ title: 'Failed to load chats.', variant: 'destructive' });
            }
        };
        loadChats();
    }, [fetchAgain, url, token]);

    // Load messages for selected chat
    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedChat) return;
            try {
                setLoading(true);
                const response = await axios.get(`${url}/api/messages/${selectedChat._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setMessages(response.data.messages);
                    socket?.emit('join chat', selectedChat._id);
                } else {
                    toast({ title: 'Failed to load messages.' });
                }
            } catch (error) {
                toast({ title: 'Error loading messages.' });
            } finally {
                setLoading(false);
            }
        };
        loadMessages();
    }, [selectedChat, socket, url, token]);

    // Handle incoming messages via socket
    useEffect(() => {
        if (socket) {
            const handleMessageReceived = (newMessageReceived) => {
                setFetchAgain((prev) => !prev);
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            };
            socket.on('message received', handleMessageReceived);
            return () => {
                socket.off('message received', handleMessageReceived);
            };
        }
    }, [socket]);

    // Handle typing events with debouncing
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        if (!socketConnected || !selectedChat) return;
        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        const timerLength = 3000;
        const lastTypingTime = new Date().getTime();
        setTimeout(() => {
            const timeNow = new Date().getTime();
            if (timeNow - lastTypingTime >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    // Send a message
    const sendMessageByEnter = async (e) => {
        if (e.key === 'Enter' && newMessage.trim()) {
            try {
                socket.emit('stop typing', selectedChat._id);
                const response = await axios.post(`${url}/api/messages/send`, { content: newMessage, chatId: selectedChat._id }, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                });
                const data = response.data.message;
                setMessages([...messages, data]);
                socket.emit('new message', data);
                setNewMessage('');
            } catch (error) {
                toast({ title: 'Failed to send the message.' });
            }
        }
    };

    // Send a message
    const sendMessage = async (e) => {
        if (newMessage.trim()) {
            try {
                socket.emit('stop typing', selectedChat._id);
                const response = await axios.post(`${url}/api/messages/send`, { content: newMessage, chatId: selectedChat._id }, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                });
                const data = response.data.message;
                setMessages([...messages, data]);
                socket.emit('new message', data);
                setNewMessage('');
            } catch (error) {
                toast({ title: 'Failed to send the message.' });
            }
        }
    };

    // Search Users
    const handleSearch = async () => {
        if (!search.trim()) {
            toast({ title: 'Please enter something in search.', variant: "warning" });
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/user/get?search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) setUsers(response.data.users);
            else toast({ title: 'No users found.' });
        } catch (error) {
            toast({ title: 'Failed to load search results.' });
        } finally {
            setLoading(false);
        }
    };

    // Access chats
    const accessChat = async (id) => {
        try {
            setLoadingChat(true);
            const response = await axios.post(`${url}/api/chat/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!chats.find((c) => c._id === response.data.data._id)) setChats([response.data.data, ...chats]);
            setSelectedChat(response.data.data);
        } catch (error) {
            toast({ title: 'Error fetching chat.', variant: 'destructive' });
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <div className="bg-gray-900 flex min-h-screen">
            
            {/* Sidebar for chats */}
            <div className="w-1/4 p-4 border-r border-gray-800">
                <h2 className="text-gray-100 text-center text-2xl font-bold mb-4">My Chats</h2>
                {/* Search chats */}
                <div className="flex items-center justify-center mb-6">
                    <div className="flex border border-gray-700 rounded-full w-full px-3 bg-gray-800">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
                        />
                        <button onClick={handleSearch} className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                            <FaSearch size={18} />
                        </button>
                    </div>
                </div>

                {/* Chats section */}
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <RotatingLines width='30' strokeColor='#ffffff' />
                    </div>
                ) : (
                    <div className='space-y-2'>
                        {users?.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => accessChat(user._id)}
                                className='text-gray-100 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all duration-200'
                            >
                                {user.username}
                            </div>
                        ))}
                        {chats?.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`cursor-pointer text-gray-100 px-4 py-2 rounded-lg transition-all duration-200 ${selectedChat?._id === chat._id ? 'bg-gray-600 shadow-md' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {chat.users.map((x,i) => {
                                    if(x._id!==user._id) return <p key={i}>{x.username}</p>
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Messages section */}
            <div className="flex-1 p-6 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center mb-4">
                            <FaArrowLeft
                                className="text-gray-300 cursor-pointer mr-4 hover:text-white transition-colors duration-300"
                                onClick={() => setSelectedChat(null)}
                                size={20}
                            />
                            <h2 className="text-white text-lg font-semibold">
                                {selectedChat.users.map((x,i) => {
                                    if(x._id!==user._id) return <p key={i}>{x.username}</p>
                                })}
                            </h2>
                        </div>
                        {/* Messages container */}
                        <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-y-auto">
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <RotatingLines width="50" strokeColor='#ffffff' />
                                </div>
                            ) : (
                                <ScrollArea className='h-[500px] w-full rounded-md'>
                                    <div className='p-2'>
                                    {messages?.map((msg) => (
                                        <div key={msg._id} className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`px-3 py-2 rounded-lg text-sm shadow ${msg.sender._id === user._id
                                                    ? 'bg-gradient-to-br from-blue-600 to-blue-400 text-gray-100 rounded-tr-none'
                                                    : 'bg-gray-600 text-gray-200 rounded-tl-none'
                                                    }`}
                                            >
                                                <p>{msg.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </ScrollArea>
                            )}
                            {typing && (<div className='flex items-center mt-2'>
                                <RotatingLines width='30' strokeColor='#ffffff' />
                                <span className='ml-2 text-sm text-gray-400'>Typing...</span>
                            </div>)}
                        </div>

                        {/* Input box */}
                        <div className="mt-4 flex items-center">
                            <Input
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMessageByEnter}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 focus:outling-none"
                            />
                            <Button
                                onClick={sendMessage}
                                className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200"
                            >
                                Send
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-400 text-center flex items-center justify-center h-full">
                        <p>Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;
