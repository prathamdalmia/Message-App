import { Portal } from "@ark-ui/react";
import { Avatar, AvatarGroup, Box, Button, Code, HStack, Stack, Text, Menu, defineStyle } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./profileModal";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DrawerComponent from "./drawerComponent";
import { getRandomColor } from "../../Config/getRandomColor";

const SideDrawer = () => {
        const [search, setSearch] = useState("");
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const [loadingChat, setLoadingChat] = useState(false);
        const [notiOpen, setNotiOpen] = useState(false);
        const [profileOpen, setProfileOpen] = useState(false);
        const history = useHistory();
        const { user } = ChatState();

        const logoutHangler = () => {
                localStorage.removeItem("userInfo");
                history.push("/")
        }







        return (
                <>
                        <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                bg={"white"}
                                w={"100%"}
                                p="5px 10px 5px 10px"
                                borderWidth={"5px"}
                        >
                                <DrawerComponent userToken={user.token} />
                                <Text fontSize={{ lg: "2xl", md: "xl" }} display={{ base: "none", md: "flex" }} fontFamily={"Work sans"}> Radio Chat</Text>
                                <Text fontSize={{ md: "2xl", sm: "xs" }} display={{ base: "flex", md: "none" }} fontFamily={"Work sans"}> Radio</Text>
                                <div style={{ display: "flex", gap: "10px" }}>
                                        <Stack gap="4" align="flex-start">
                                                <Menu.Root open={notiOpen} onOpenChange={(e) => setNotiOpen(e.open)}>
                                                        <Menu.Trigger asChild>
                                                                <Button variant="ghost">
                                                                        <i className="fas fa-bell" style={{ fontSize: "20px" }}></i>
                                                                </Button>
                                                        </Menu.Trigger>
                                                        <Portal>
                                                                <Menu.Positioner>
                                                                        <Menu.Content>
                                                                                <Menu.Item value="new-txt">New Text File</Menu.Item>
                                                                                <Menu.Item value="new-file">New File...</Menu.Item>
                                                                                <Menu.Item value="new-win">New Window</Menu.Item>
                                                                                <Menu.Item value="open-file">Open File...</Menu.Item>
                                                                                <Menu.Item value="export">Export</Menu.Item>
                                                                        </Menu.Content>
                                                                </Menu.Positioner>
                                                        </Portal>
                                                </Menu.Root>
                                        </Stack>

                                        <Stack gap="4" align="flex-start">
                                                <Menu.Root open={profileOpen} onOpenChange={(e) => setProfileOpen(e.open)}>
                                                        <Menu.Trigger asChild>
                                                                <Button variant="ghost">
                                                                        <HStack gap="2">
                                                                                <Avatar.Root
                                                                                        style={{
                                                                                                width: "40px",
                                                                                                height: "40px",
                                                                                                borderRadius: "9999px",
                                                                                                overflow: "hidden",
                                                                                        }}

                                                                                        colorPalette={getRandomColor()}
                                                                                >
                                                                                        <Avatar.Fallback name={user?.name} />

                                                                                        <Avatar.Image
                                                                                                src={user?.pic}
                                                                                                style={{
                                                                                                        width: "100%",
                                                                                                        height: "100%",
                                                                                                        objectFit: "cover",
                                                                                                }}
                                                                                        />
                                                                                </Avatar.Root>

                                                                                <i className="fas fa-chevron-down"></i>
                                                                        </HStack>
                                                                </Button>
                                                        </Menu.Trigger>
                                                        <Portal>
                                                                <Menu.Positioner>
                                                                        <Menu.Content >
                                                                                <ProfileModal user={user}>
                                                                                        <Menu.Item value="myprofile" closeOnSelect={false}> My Profile</Menu.Item>
                                                                                </ProfileModal>
                                                                                <Menu.Separator />
                                                                                <Menu.Item value="logout" onClick={logoutHangler}>Logout</Menu.Item>
                                                                        </Menu.Content>
                                                                </Menu.Positioner>
                                                        </Portal>
                                                </Menu.Root>
                                        </Stack>
                                </div>
                        </Box >
                </>
        )
}

export default SideDrawer