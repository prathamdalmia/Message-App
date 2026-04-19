import { Box, Button, CloseButton, Dialog, HStack, Image, Input, Portal, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/chatProvider'
import { toaster } from '../ui/toaster'
import UserBadgeItem from './UserListComponents/userBadgeItem'
import UserListItem from './UserListComponents/userListItem'
import { getRandomColor } from '../../Config/getRandomColor'
import axios from 'axios'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

        const [groupChatName, setGroupChatName] = useState("");
        const [search, setSearch] = useState("");
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const [renameLoading, setRenameLoading] = useState(false);

        const { selectedChat, setSelectedChat, user } = ChatState();


        const handleRemove = async (userToDelete) => {
                if (!userToDelete) {
                        return;
                }

                if (!selectedChat.users.find((u) => u._id === userToDelete._id)) {

                        toaster.create({
                                title: "User Not in Group",
                                type: "warning",
                                closable: true
                        });
                        return;
                }


                if (selectedChat.groupAdmin._id !== user._id && user._id !== userToDelete._id) {


                        toaster.create({
                                title: 'Only Admins can Remove Someone!',
                                type: "error",
                                closable: true

                        });
                        return;
                }


                try {
                        setLoading(true);

                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`,
                                },
                        };

                        const { data } = await axios.put('/api/chat/groupremove', { chatId: selectedChat._id, userId: userToDelete._id }, config)
                        console.log(data);

                        user._id === userToDelete._id ? setSelectedChat() : setSelectedChat(data.group);
                        setFetchAgain(!fetchAgain);
                        setLoading(false);


                } catch (error) {
                        toaster.create({
                                title: 'Error Occured',
                                description: error.message,
                                type: "error",
                                closable: true

                        });
                        setLoading(false);
                }



        }
        const handleRename = async () => {

                if (!groupChatName) {
                        return;
                }

                try {
                        setRenameLoading(true)

                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`,
                                },
                        };

                        const { data } = await axios.put('/api/chat/rename', { chatId: selectedChat._id, chatName: groupChatName }, config);


                        // console.log(data)
                        setSelectedChat(data.group);
                        setFetchAgain(!fetchAgain);
                        setRenameLoading(false);


                } catch (error) {
                        toaster.create({
                                title: "Error Occured",
                                description: error.message,
                                type: "error",
                                closable: true
                        })
                        setRenameLoading(false);
                        return;
                } finally {
                        setGroupChatName("")
                }


        }


        const handleGroupAdd = async (userToAdd) => {

                if (!userToAdd) {
                        return;
                }

                if (selectedChat.users.find((u) => u._id === userToAdd._id)) {

                        toaster.create({
                                title: "User Already in Group",
                                type: "warning",
                                closable: true
                        });
                        return;
                }


                if (selectedChat.groupAdmin._id !== user._id) {


                        toaster.create({
                                title: 'Only Admins can Add Someone!',
                                type: "error",
                                closable: true

                        });
                        return;
                }




                try {
                        setLoading(true);

                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`,
                                },
                        };

                        const { data } = await axios.put('/api/chat/addgroup', { chatId: selectedChat._id, userId: userToAdd._id }, config)
                        console.log(data);

                        setSelectedChat(data.group);
                        setFetchAgain(!fetchAgain);
                        setLoading(false);


                } catch (error) {
                        toaster.create({
                                title: 'Error Occured',
                                description: error.message,
                                type: "error",
                                closable: true

                        });
                        setLoading(false);
                }

        }

        const handleSearch = async (query) => {
                setSearch(query);
                if (!query) {
                        return;
                }

                try {
                        setLoading(true);
                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`
                                },
                        }
                        const { data } = await axios.get(`/api/user/search?search=${search}`, config);
                        // console.log(data);
                        setLoading(false);
                        setSearchResult(data);


                } catch (error) {
                        toaster.create({
                                title: "Error Occured",
                                description: "Failed to Load the Search Results",
                                type: "error",
                                closable: true,
                        });
                }
        }


        return (
                <Dialog.Root placement={"center"} size={{ md: "md", sm: "xs" }}>
                        <Dialog.Trigger asChild>


                                <Button variant="ghost">
                                        <i className="fas fa-eye" style={{ fontSize: "20px" }}></i>
                                </Button>

                        </Dialog.Trigger>
                        <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                        <Dialog.Content>
                                                <Dialog.Header>
                                                        <Dialog.Title fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>{selectedChat.chatName}</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
                                                        <Box display={"flex"} width={"100%"} flexWrap={"wrap"} pb={3} gap={1}>
                                                                {selectedChat.users.map(u => {
                                                                        return (<UserBadgeItem key={u._id} user={u} handlerFunction={() => handleRemove(u)} />)
                                                                })}
                                                        </Box>




                                                        <HStack display={"flex"} w={"100%"} gap={1} alignItems={'center'} >
                                                                <Input placeholder='Chat Name'
                                                                        disabled={selectedChat.groupAdmin._id !== user._id}
                                                                        value={groupChatName}
                                                                        onChange={(e) => setGroupChatName(e.target.value)}
                                                                />

                                                                <Button disabled={selectedChat.groupAdmin._id !== user._id} variant={"solid"} bg={"teal"} loading={renameLoading} onClick={handleRename}>Update</Button>
                                                        </HStack>

                                                        <Input placeholder='Add Users' mb={1} mt={2} onChange={(e) => handleSearch(e.target.value)} disabled={selectedChat.groupAdmin._id !== user._id} />

                                                        {/* This Part is for the Search Results for the users to be displayed as a list*/}
                                                        <Box mt={2} width={"100%"}>

                                                                {loading ? <Spinner ml={"auto"} display={"flex"} /> : (
                                                                        searchResult?.slice(0, 4).map(user => (
                                                                                <UserListItem key={user._id} user={user} handlerFunction={() => handleGroupAdd(user)} color={getRandomColor()} />
                                                                        ))
                                                                )}
                                                        </Box>



                                                </Dialog.Body>
                                                <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                                <Button variant="solid" bg={"red"} onClick={() => handleRemove(user)}>Leave Group</Button>
                                                        </Dialog.ActionTrigger>
                                                </Dialog.Footer>
                                                <Dialog.CloseTrigger asChild>
                                                        <CloseButton size="sm" />
                                                </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                </Dialog.Positioner>
                        </Portal>
                </Dialog.Root>
        )
}

export default UpdateGroupChatModal