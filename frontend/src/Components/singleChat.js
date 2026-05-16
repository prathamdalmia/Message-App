import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { Box, Field, IconButton, Input, Spinner, Text, useStatStyles } from '@chakra-ui/react';
import { getSender } from '../Config/chatLogics';
import ProfileModal from './Miscellaneous/profileModal'
import UpdateGroupChatModal from './Miscellaneous/updateGroupChatModal';
import axios from 'axios';
import { toaster } from './ui/toaster';
import './styles.css'
import ScrollableMessages from './scrollableMessages';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from "../Animations/Typing.json";


const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

        const [messages, setMessages] = useState([]);
        const [loading, setLoading] = useState(false);
        const [newMessage, setNewMessage] = useState("");
        const [socketConnected, setSocketConnected] = useState(false);
        const [typing, setTyping] = useState(false);
        const [isTyping, setIsTyping] = useState(false)

        const lastTypingTimeRef = useRef(null);
        const typingRef = useRef(false);

        const defaultOptions = {
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                },
        };

        const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();


        const fetchMessages = async () => {
                if (!selectedChat) {
                        return;
                }

                try {
                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`
                                }
                        };
                        setLoading(true);
                        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

                        setMessages(data);
                        setLoading(false);
                        socket.emit('join chat', selectedChat._id);

                } catch (error) {
                        toaster.create({
                                title: 'Error Occured',
                                description: 'Failed to Load the Messages!!!!!',
                                type: 'error',
                                closable: true
                        });
                }
        }

        useEffect(() => {

                socket = io(ENDPOINT);
                socket.emit("setup", user);
                socket.on('connected', () => setSocketConnected(true));
                socket.on('typing', () => setIsTyping(true))
                socket.on('stop typing', () => setIsTyping(false))

        }, []);


        useEffect(() => {
                fetchMessages();
                // console.log(messages);
                selectedChatCompare = selectedChat;

        }, [selectedChat]);


        useEffect(() => {
                socket.on('message receieved', (newMessageRecieved) => {
                        if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                                //give notification
                                if (!notification.includes(newMessageRecieved)) {
                                        setNotification([newMessageRecieved, ...notification]);
                                        setFetchAgain(!fetchAgain);
                                }

                        } else {
                                setMessages([...messages, newMessageRecieved]);
                        }


                });
        })



        const sendMessage = async (event) => {
                if (event.key === "Enter" && newMessage) {
                        socket.emit('stop typing', selectedChat._id);
                        try {
                                const config = {
                                        headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${user.token}`
                                        }
                                };
                                setNewMessage("");
                                const { data } = await axios.post('/api/message', { content: newMessage, chatId: selectedChat._id }, config);

                                // console.log(data);
                                // console.log(messages);
                                socket.emit("new message", data)

                                setMessages([...messages, data]);

                                // console.log(messages);


                        } catch (error) {
                                toaster.create({
                                        title: 'Error Occured',
                                        description: 'Failed to Send the Message',
                                        type: 'error',
                                        closable: true
                                });
                        }
                }
        }







        const typingHandler = (e) => {
                setNewMessage(e.target.value);

                if (!socketConnected) return;

                if (!typingRef.current) {
                        typingRef.current = true;
                        setTyping(true);
                        socket.emit("typing", selectedChat._id);
                }

                lastTypingTimeRef.current = new Date().getTime();

                const timerLength = 1000;

                setTimeout(() => {
                        const timeNow = new Date().getTime();
                        const timeDiff = timeNow - lastTypingTimeRef.current;

                        if (timeDiff >= timerLength && typingRef.current) {
                                socket.emit("stop typing", selectedChat._id);
                                typingRef.current = false;
                                setTyping(false);
                        }
                }, timerLength);
        };


        return (
                <>
                        {
                                selectedChat ? (
                                        <>
                                                <Text
                                                        fontSize={{ base: "28px", md: "30px" }}
                                                        pb={3}
                                                        px={2}
                                                        w="100%"
                                                        fontFamily={"Work sans"}
                                                        display="flex"
                                                        justifyContent={{ base: "space-between" }}
                                                        alignItems={"center"}

                                                >
                                                        <IconButton variant="outline" display={{ base: "flex", md: "none" }} onClick={() => setSelectedChat("")}>
                                                                <i className="fas fa-arrow-left"></i>
                                                        </IconButton>


                                                        {!selectedChat.isGroupChat ? (
                                                                <>
                                                                        {getSender(user, selectedChat.users).name}
                                                                        <ProfileModal user={getSender(user, selectedChat.users)} />
                                                                </>
                                                        ) :
                                                                (
                                                                        <>
                                                                                {selectedChat.chatName.toUpperCase()}
                                                                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                                                                        </>
                                                                )}

                                                </Text>

                                                <Box
                                                        display={"flex"}
                                                        flexDir={"column"}
                                                        justifyContent={"flex-end"}
                                                        p={3}
                                                        bg={"#E8E8E8"}
                                                        w={"100%"}
                                                        h={"100%"}
                                                        borderRadius={"lg"}
                                                        overflowY={"hidden"}
                                                >

                                                        {loading ? (
                                                                <Spinner size={'xl'} alignSelf={'center'} margin={'auto'} h={20} w={20} />
                                                        ) : (<div className='messages'>
                                                                <ScrollableMessages messages={messages} />
                                                        </div>

                                                        )}

                                                        <Field.Root onKeyDown={sendMessage} required marginTop={2}>
                                                                {isTyping ? (
                                                                        <div>
                                                                                <Lottie
                                                                                        options={defaultOptions}
                                                                                        width={70}
                                                                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                                                                />
                                                                        </div>) : <></>}
                                                                <Input variant="filled" bg='#d6d5d5' placeholder='Enter a Message...' onChange={typingHandler} value={newMessage} />
                                                        </Field.Root>


                                                </Box>

                                        </>






                                ) : (
                                        <Box
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                h={"100%"}
                                        >
                                                <Text fontSize="3xl" pb={3} fontFamily={"Work sans"}>
                                                        Click on a User to Start Chatting
                                                </Text>
                                        </Box>)}
                </>
        )
}

export default SingleChat