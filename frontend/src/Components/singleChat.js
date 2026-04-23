import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { Box, Field, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { getSender } from '../Config/chatLogics';
import ProfileModal from './Miscellaneous/profileModal'
import UpdateGroupChatModal from './Miscellaneous/updateGroupChatModal';
import axios from 'axios';
import { toaster } from './ui/toaster';
import './styles.css'
import ScrollableMessages from './scrollableMessages';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

        const [messages, setMessages] = useState([]);
        const [loading, setLoading] = useState(false);
        const [newMessage, setNewMessage] = useState("")

        const { user, selectedChat, setSelectedChat } = ChatState();


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
                fetchMessages();
                // console.log(messages);


        }, [selectedChat])


        const sendMessage = async (event) => {
                if (event.key === "Enter" && newMessage) {
                        try {
                                const config = {
                                        headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${user.token}`
                                        }
                                };

                                const { data } = await axios.post('/api/message', { content: newMessage, chatId: selectedChat._id }, config);

                                // console.log(data);
                                // console.log(messages);

                                setNewMessage("");
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
                // Typing Logic
        }


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