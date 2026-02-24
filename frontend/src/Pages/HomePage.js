import React, { useEffect } from "react";
import { Box, Container, Text, Tabs } from "@chakra-ui/react"
import Login from "../Components/Authentication/login.js";
import Signup from "../Components/Authentication/signup.js";
import { useHistory } from "react-router-dom";

const HomePage = () => {

        const history = useHistory();

        useEffect(() => {
                const userToken = JSON.parse(localStorage.getItem("userToken"));
                if (userToken) history.push("/chats");
        }, [history]);

        return <Container maxW='xl'>
                <Box
                        display='flex'
                        justifyContent={'center'}
                        p={3}
                        bg={"white"}
                        w="100%"
                        m="40px 0 15px 0"
                        borderRadius={"lg"}
                        borderWidth={"1px"}
                >
                        <Text fontSize={"4xl"} fontFamily={"Work Sans"}>RADIO-CHAT</Text>
                </Box>
                <Box
                        display='flex'
                        justifyContent={'center'}
                        p={4}
                        bg={"white"}
                        w="100%"
                        m="40px 0 15px 0"
                        borderRadius={"lg"}
                        borderWidth={"1px"}>

                        <Tabs.Root
                                defaultValue="login"
                                variant="plain"
                                width={"100%"}
                                css={{
                                        "--tabs-indicator-bg": "colors.gray.subtle",
                                        "--tabs-indicator-shadow": "shadows.xs",
                                        "--tabs-trigger-radius": "radii.full",
                                }}
                        >
                                <Tabs.List mb={"1em"} width={"100%"}>
                                        <Tabs.Trigger value="login" _selected={{ color: "black", bg: "#caf1fd" }} width={"50%"} justifyContent={"center"}>Login</Tabs.Trigger>
                                        <Tabs.Trigger value="signup" _selected={{ color: "black", bg: "#caf1fd" }} width={"50%"} justifyContent={"center"}>Signup</Tabs.Trigger>
                                        <Tabs.Indicator bg="#caf1fd" />
                                </Tabs.List>
                                <Tabs.Content
                                        value="login"
                                        _open={{
                                                animationName: "fade-in, scale-in",
                                                animationDuration: "300ms",
                                        }}>
                                        <Login />
                                </Tabs.Content>
                                <Tabs.Content
                                        value="signup"
                                        _open={{
                                                animationName: "fade-in, scale-in",
                                                animationDuration: "300ms",
                                        }}>
                                        <Signup />
                                </Tabs.Content>

                        </Tabs.Root>

                </Box>
        </Container>

};

export default HomePage