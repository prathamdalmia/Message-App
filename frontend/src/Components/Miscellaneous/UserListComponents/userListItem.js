import { Avatar, Box, defineStyle, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handlerFunction, color }) => {



        const ringCss = defineStyle({
                outlineWidth: "2px",
                outlineColor: color,
                outlineOffset: "2px",
                outlineStyle: "solid",
        })

        return (
                <Box
                        onClick={handlerFunction}
                        cursor={"pointer"}
                        bg={"#E8E8E8"}
                        _hover={{ background: "#38B2AC", color: "white" }}
                        width={"100%"}
                        display={"flex"}
                        alignItems={"center"}
                        color={"black"}
                        gap={3}
                        px={3}
                        py={2}
                        mb={2}
                        borderRadius={"lg"}>
                        <Avatar.Root
                                style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "9999px",
                                        overflow: "hidden",
                                }}

                                css={ringCss} colorPalette={color}
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

                        <Box pr={4}>
                                <Text>{user.name}</Text>
                                <Text fontSize={"xs"}><b>Email : </b>{user.email}</Text>
                        </Box>
                </Box>
        )
}

export default UserListItem