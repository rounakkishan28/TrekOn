import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';

function Message() {
    const socket = useMemo(() => io('http://localhost:5000', {
        withCredentials: true,
    }), []);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('general');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Join the room on component mount
        socket.emit('join-room', room);

        // Listen for previous messages when joining a room
        socket.on('previous-messages', (prevMessages) => {
            setMessages(prevMessages);
        });

        // Listen for messages from the server
        socket.on('receive-message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Clean up on component unmount
        return () => {
            socket.off('previous-messages');
            socket.off('receive-message');
            socket.disconnect();
        };
    }, [room]);

    const sendMessage = () => {
        if (message.trim()) {
            const sender = 'User';
            socket.emit('send-message', { room, sender, content: message });
            setMessages((prevMessages) => [...prevMessages, { room, sender, content: message, self: true }]);
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <div className='bg-gray-800'>
            <div className="flex flex-col h-screen max-w-lg mx-auto p-4">
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-500 overflow-hidden">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg max-w-xs shadow-md ${msg.self ? 'bg-gray-600 text-gray-200 self-end' : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white'
                                }`}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="flex mt-4 space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 px-4 py-5 border border-gray-300 text-gray-100 rounded-lg focus:ring-gray-500 focus:border-gray-500"
                    />
                    <Button
                        onClick={sendMessage}
                        className="px-4 py-5 text-white bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900 rounded-lg hover:via-gray-800"
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Message;
