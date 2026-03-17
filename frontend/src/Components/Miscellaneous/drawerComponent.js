import React, { useState } from 'react'
import { Box, Button, CloseButton, Drawer, Input, Portal, Text } from "@chakra-ui/react"
import { Tooltip } from "../ui/tooltip"
import { toaster } from '../ui/toaster';
import axios from 'axios';
import ChatLoading from './chatLoading';
import UserListItem from './userListItem';

const DrawerComponent = ({ userToken }) => {
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState("");
        const [loading, setLoading] = useState(false);
        const [searchResult, setSearchResult] = useState([]);

        const searchHandler = async () => {

                if (!search) {
                        toaster.create({
                                description: "Please Enter a Valid Name or Email",
                                type: "warning",
                                closable: true,
                        });
                        return
                }

                try {
                        setLoading(true);
                        const config = {
                                headers: {
                                        Authorization: `Bearer ${userToken}`
                                },
                        }
                        const { data } = await axios.get(`/api/user/search?search=${search}`, config);
                        setLoading(false);
                        setSearchResult(data);


                } catch (error) {
                        toaster.create({
                                title: "Error Occured",
                                description: error.message,
                                type: "error",
                                closable: true,
                        });
                }
        }

        const accessChat = () => {
                setOpen(false);
        };


        return (
                <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={"start"} size={"sm"} >
                        <Tooltip showArrow positioning={{ placement: "bottom-end" }} content="Search User to Chat">
                                <Drawer.Trigger asChild>
                                        <Button variant="ghost">
                                                <i className="fas fa-search"></i>
                                                <Text display={{ base: "none", md: "flex" }} px="4px">
                                                        Search User
                                                </Text>

                                        </Button>
                                </Drawer.Trigger>
                        </Tooltip>
                        <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                        <Drawer.Content >
                                                <Drawer.Header>
                                                        <Drawer.Title>Search User</Drawer.Title>
                                                </Drawer.Header>
                                                <Drawer.Body>
                                                        <Box display={"flex"} pb={"5"}>
                                                                <Input placeholder='Name or Email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                                                                <Button onClick={searchHandler} variant={"ghost"}><i className="fas fa-arrow-right"></i></Button>
                                                        </Box>

                                                        {loading ? <ChatLoading /> : (
                                                                searchResult.map((user) => {
                                                                        return (

                                                                                <UserListItem key={user._id} user={user} handlerFunction={accessChat} />)
                                                                })
                                                        )}
                                                </Drawer.Body>

                                                <Drawer.CloseTrigger asChild>
                                                        <CloseButton size="sm" />
                                                </Drawer.CloseTrigger>
                                        </Drawer.Content>
                                </Drawer.Positioner>
                        </Portal>
                </Drawer.Root >
        )
}

export default DrawerComponent