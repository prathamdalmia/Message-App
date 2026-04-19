import { Box, Button, CloseButton, Dialog, Fieldset, Input, Portal, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { toaster } from '../ui/toaster'
import { ChatState } from '../../Context/chatProvider'
import axios from 'axios'
import UserListItem from './UserListComponents/userListItem'
import { getRandomColor } from '../../Config/getRandomColor'
import UserBadgeItem from './UserListComponents/userBadgeItem'

const GroupChatModal = ({ children }) => {


        const [groupChatName, setGroupChatName] = useState();
        const [selectedUsers, setSelectedUsers] = useState([]);
        const [search, setSearch] = useState("");
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const { user, chats, setChats } = ChatState();



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



        const handleSubmit = async () => {
                if (!groupChatName || !selectedUsers) {
                        toaster.create({
                                title: "Please Fill All The Fields",
                                type: "warning",
                                closable: true
                        });
                        return;
                }

                try {
                        const config = {
                                headers: {
                                        Authorization: `Bearer ${user.token}`
                                },
                        }

                        const { data } = await axios.post('/api/chat/group', { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) }, config);


                        setChats([data.fullGroupChat, ...chats])
                        // console.log(data);

                } catch (error) {
                        toaster.create({
                                title: "Failed to Create Chat",
                                description: error.message,
                                type: "error",
                                closable: true
                        });
                        return;
                }

        }



        const handleGroup = (userToAdd) => {
                if (selectedUsers.includes(userToAdd)) {
                        toaster.create({
                                title: "User Already Added",
                                type: "warning",
                                closable: true
                        });
                        return;
                }
                setSelectedUsers([...selectedUsers, userToAdd]);

        }

        const handleDelete = (userToDelete) => {
                setSelectedUsers(selectedUsers.filter((sel) => sel._id != userToDelete._id))
        }


        return (
                <Dialog.Root placement={"center"}>
                        <Dialog.Trigger asChild>
                                {children}
                        </Dialog.Trigger>
                        <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                        <Dialog.Content>
                                                <Dialog.Header>
                                                        <Dialog.Title fontSize={"35px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>Create Group Chat</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body display={"flex"} flexDir={"column"} alignItems={"center"}>
                                                        <Fieldset.Root>
                                                                <Fieldset.Content >
                                                                        <Input placeholder='Enter Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
                                                                </Fieldset.Content>
                                                        </Fieldset.Root>

                                                        <Fieldset.Root>
                                                                <Fieldset.Content >
                                                                        <Input placeholder='Add Users' mb={1} onChange={(e) => handleSearch(e.target.value)} />
                                                                </Fieldset.Content>

                                                                {/* This part hors the selected users as badges */}
                                                                <Box w={"100%"} display={"flex"} flexWrap={"wrap"} gap={1}>

                                                                        {selectedUsers.map(u => {
                                                                                return (<UserBadgeItem key={u._id} user={u} handlerFunction={() => handleDelete(u)} color={getRandomColor()} />)
                                                                        })}
                                                                </Box>



                                                                {/* This Part is for the Search Results for the users to be displayed as a list*/}
                                                                <Box mt={2}>

                                                                        {loading ? <Spinner ml={"auto"} display={"flex"} /> : (
                                                                                searchResult?.slice(0, 4).map(user => (
                                                                                        <UserListItem key={user._id} user={user} handlerFunction={() => handleGroup(user)} color={getRandomColor()} />
                                                                                ))
                                                                        )}
                                                                </Box>


                                                        </Fieldset.Root>


                                                </Dialog.Body>
                                                <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                                <Button variant="outline" colorPalette={"red"}>Cancel</Button>
                                                        </Dialog.ActionTrigger>

                                                        <Dialog.ActionTrigger asChild>
                                                                <Button color={"white"} bg={"#38B2AC"} onClick={handleSubmit}>Create Chat</Button>
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

export default GroupChatModal