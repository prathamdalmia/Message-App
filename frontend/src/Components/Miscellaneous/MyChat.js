import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/chatProvider'
import { toaster } from '../ui/toaster';
import axios from 'axios';

const MyChat = () => {

        const [loggedUser, setLoggedUser] = useState();
        const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();


        const fetchChats = async () => {
                try {
                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`,
                                },
                        };

                        const { data } = await axios.get('/api/chat', config);
                        console.log(data);
                        setChats(data);
                } catch (error) {
                        toaster.create({
                                title: "Error Occured",
                                description: "Failed to Load Chats",
                                type: "error",
                                closable: true,
                        });
                }
        }

        useEffect(() => {
                setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
                fetchChats();

        }, [])

        return (
                <div>MyChat</div>
        )
}

export default MyChat