import React, { useState } from 'react'
import { Button, Field, Fieldset, For, Input, NativeSelect, Stack, FileUpload, Flex, Box } from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { PasswordInput } from "../ui/password-input";
import { toaster } from "../ui/toaster";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')
        const [pic, setPic] = useState()
        const [isLoading, setIsLoading] = useState(false)
        const history = useHistory();


        const postDetails = (pic) => {
                setIsLoading(true);

                if (pic === undefined) {
                        toaster.create({
                                description: "Please Upload an Image",
                                type: "warning",
                                closable: true
                        });
                        return;
                }

                if (pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg") {
                        const CLOUD_NAME = "dubtj7i1u";
                        const data = new FormData();
                        data.append("file", pic);
                        data.append("upload_preset", "chat-app")
                        data.append("cloud_name", CLOUD_NAME);

                        const uploadToCloudinary = fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                                method: "POST",
                                body: data,
                        }).then((res) => res.json()).then(data => {
                                setPic(data.url.toString());
                                setIsLoading(false);
                                return data;
                        }).catch((err) => {
                                setIsLoading(false);
                                throw err;
                        });


                        toaster.promise(uploadToCloudinary, {
                                success: {
                                        title: "Successfully uploaded!",
                                        description: "Looks great",
                                        closable: true
                                },
                                error: {
                                        title: "Upload failed",
                                        description: "Something wrong with the upload",
                                        closable: true
                                },
                                loading: { title: "Uploading...", description: "Please wait", closable: true },

                        })

                } else {
                        toaster.create({
                                description: "Please Select an Image of Type: .png, .jpg, .jpeg",
                                type: "error",
                                closable: true
                        });
                        setIsLoading(false);
                        return;
                }

        }

        const submitHandler = async () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                setIsLoading(true);
                if (!name || !email || !password || !confirmPassword) {
                        toaster.create({
                                description: "Please Enter All Fields",
                                type: "warning",
                                closable: true,
                        });
                        setIsLoading(false);
                        return;
                }
                if (password !== confirmPassword) {
                        toaster.create({
                                description: "Passwords do not Match",
                                type: "warning",
                                closable: true,
                        });
                        setIsLoading(false);
                        return;
                }
                if (!emailRegex.test(email)) {
                        toaster.create({
                                description: "Email is not Valid",
                                type: "warning",
                                closable: true,
                        });
                        setIsLoading(false);
                        return;
                }

                try {
                        const config = {
                                headers: {
                                        "content-type": "application/json",
                                }
                        };
                        const body = { name, email, password };
                        if (pic) body.pic = pic;
                        const { data } = await axios.post('/api/user/signup', body, config);
                        toaster.create({
                                description: "Registration is Successful",
                                type: "success",
                                closable: true
                        });

                        localStorage.setItem('userToken', JSON.stringify(data));
                        setIsLoading(false);
                        history.push('/chats');

                } catch (err) {
                        toaster.create({
                                title: "Error Occured",
                                description: err.response?.data?.message || err.message,
                                type: "error",
                                closable: true
                        })
                        // throw new Error(err);
                        setIsLoading(false);
                }
        }


        return (
                <Fieldset.Root size="lg" maxW="100%">

                        <Fieldset.Content>
                                <Field.Root required>
                                        <Field.Label>Name</Field.Label>
                                        <Input name="name" placeholder='Enter Your Name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                </Field.Root>

                                <Field.Root required>
                                        <Field.Label>Email address</Field.Label>
                                        <Input name="email" type="email" placeholder='Enter Your Email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                </Field.Root>

                                <Field.Root required>
                                        <Field.Label>Password</Field.Label>
                                        <PasswordInput value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                                </Field.Root>
                                <Field.Root required>
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

                                                        <Box flex="1" w={{ base: "150px", md: "300px", lg: "300px" }} overflow="hidden" >
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

                        <Button
                                type="signup"
                                width={"100%"}
                                mb={"10px"}
                                alignSelf="flex-"
                                color={"black"}
                                bg={"#41c8f1"}
                                onClick={submitHandler}
                                loading={isLoading}>
                                Sign Up
                        </Button>
                </Fieldset.Root >
        )
}

export default Signup