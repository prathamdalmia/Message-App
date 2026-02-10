import React, { useState } from 'react'
import { Button, Field, Fieldset, For, Input, NativeSelect, Stack, FileUpload, Flex, Box } from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { PasswordInput } from "../ui/password-input"

const Signup = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("")
        const [confirmPassword, setConfirmPassword] = useState("")
        const [pic, setPic] = useState(null)

        const postDetails = (pic) => { setPic(pic) }

        const submitHandler = () => { console.log({ name, email, password, confirmPassword, pic }) }


        return (
                <Fieldset.Root size="lg" maxW="100%">

                        <Fieldset.Content>
                                <Field.Root >
                                        <Field.Label>Name</Field.Label>
                                        <Input name="name" placeholder='Enter Your Name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                        <Field.Label>Email address</Field.Label>
                                        <Input name="email" type="email" placeholder='Enter Your Email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                </Field.Root>

                                <Field.Root>
                                        <Field.Label>Password</Field.Label>
                                        <PasswordInput value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                                </Field.Root>
                                <Field.Root>
                                        <Field.Label>Confirm Password</Field.Label>
                                        <PasswordInput value={confirmPassword} placeholder='Confirm Your Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Field.Root>


                                <Field.Root>
                                        <Field.Label>Profile Picture</Field.Label>
                                        <FileUpload.Root
                                                maxFiles={1}
                                                onFileChange={(detail) => {
                                                        const file = detail.acceptedFiles?.[0];
                                                        postDetails(file);

                                                }}
                                        >
                                                <FileUpload.HiddenInput accept="image/*" />

                                                <Flex align={"center"} gap={3} maxW={"100%"}>
                                                        <FileUpload.Trigger asChild>
                                                                <Button variant="outline" size="sm">

                                                                        <HiUpload /> Upload Image
                                                                </Button>
                                                        </FileUpload.Trigger>

                                                        <Box flex="1" maxW="300px" overflow="hidden" >
                                                                <FileUpload.List
                                                                        sx={{
                                                                                "& span": {
                                                                                        whiteSpace: "nowrap",
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis"
                                                                                }
                                                                        }}
                                                                />
                                                        </Box>
                                                </Flex>
                                        </FileUpload.Root>
                                </Field.Root>

                        </Fieldset.Content>

                        <Button type="signup" width={"100%"} mb={"10px"} alignSelf="flex-" color={"black"} bg={"#41c8f1"} onClick={submitHandler}>
                                Sign Up
                        </Button>
                </Fieldset.Root >
        )
}

export default Signup