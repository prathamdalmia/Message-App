import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { toaster } from './ui/toaster';
import axios from 'axios';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { RiAddLine } from "react-icons/ri";
import ChatLoading from './chatLoading';
import { getSender } from '../Config/chatLogics';
import GroupChatModal from './Miscellaneous/groupChatModal';

const MyChat = ({ fetchAgain }) => {

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
                        // console.log(data);
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

        }, [fetchAgain])

        return (
                <Box
                        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                        flexDir={"column"}
                        alignItems={"center"}
                        p={3}
                        bg={"white"}
                        w={{ base: "100%", md: "31%" }}
                        borderRadius={"lg"}
                        borderWidth={"1px"}
                >
                        <Box
                                pb={3}
                                px={3}
                                fontSize={{ base: "28px", md: "30px" }}
                                fontFamily={"Work sans"}
                                display="flex"
                                w="100%"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                        >
                                My Chats
                                <GroupChatModal>
                                        <Button
                                                display={"flex"}
                                                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                                                variant={'surface'}
                                                colorPalette={'gray'}
                                        >
                                                <Text fontSize={{ base: "0px", md: "10px", lg: "17px" }}>New Groupchat</Text> <RiAddLine />
                                        </Button>
                                </GroupChatModal>
                        </Box>



                        <Box
                                display={"flex"}
                                flexDir={"column"}
                                p={3}
                                bg={'#F8F8F8'}
                                w={"100%"}
                                h={"100%"}
                                borderRadius={"lg"}
                                overflowY={"hidden"}
                        >
                                {chats ? (
                                        <Stack overflowY={"scroll"}>
                                                {chats.map((chat) => (
                                                        <Box
                                                                onClick={() => { setSelectedChat(chat) }}
                                                                cursor={"pointer"}
                                                                bg={selectedChat?._id === chat._id ? "#38B2AC" : "#E8E8E8"}
                                                                color={selectedChat?._id === chat._id ? "white" : "black"}
                                                                px={3}
                                                                py={2}
                                                                borderRadius={"lg"}
                                                                key={chat._id}
                                                        >
                                                                <Text>{!chat.isGroupChat ? (getSender(loggedUser, chat.users).name) : (chat.chatName)}</Text>
                                                        </Box>
                                                ))}
                                        </Stack>) :
                                        (<ChatLoading />)}
                        </Box>
                </Box>
        )
}

export default MyChat