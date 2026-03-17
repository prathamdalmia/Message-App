import React from 'react'
import { Button, Center, CloseButton, Dialog, Image, Portal, Text } from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {


        return (
                <Dialog.Root placement={"center"} size={{ md: "lg", sm: "xs" }}>
                        <Dialog.Trigger asChild>
                                {children ? (
                                        children
                                ) :
                                        (
                                                <Button variant="ghost">
                                                        <i className="fas fa-eye" style={{ fontSize: "20px" }}></i>
                                                </Button>
                                        )}
                        </Dialog.Trigger>
                        <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                        <Dialog.Content>
                                                <Dialog.Header>
                                                        <Dialog.Title fontSize={"40px"} fontFamily={"Work sans"} display={"flex"} justifyContent={"center"}>Profile</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Body display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
                                                        <Image src={user.pic} borderRadius={"full"} boxSize={"150px"} alt='user.name'></Image>
                                                        <Text fontSize={{ base: "20px", md: "25px", lg: "30px" }} fontFamily={"Work sans"} paddingTop={"40px"}>{user.name}</Text>
                                                        <Text fontSize={{ base: "16px", md: "25px", lg: "30px" }} fontFamily={"Work sans"} paddingTop={"30px"}>Email : {user.email}</Text>
                                                </Dialog.Body>
                                                <Dialog.Footer>
                                                        <Dialog.ActionTrigger asChild>
                                                                <Button variant="outline">Cancel</Button>
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

export default ProfileModal             