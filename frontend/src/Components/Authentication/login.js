import React, { useState } from 'react'
import { Button, Field, Fieldset, For, Input, NativeSelect, Stack, FileUpload } from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { PasswordInput } from "../ui/password-input"
import { toaster } from "../ui/toaster";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const history = useHistory();


        const submitHandler = async () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                setIsLoading(true);
                if (!name || !email || !password) {
                        toaster.create({
                                description: "Please Enter All Fields",
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

                        const { data } = await axios.post('/api/user/', body, config);


                        console.log(data);
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
                        setIsLoading(false);
                        // throw new Error(err);

                }
        }






        return (
                <Fieldset.Root size="lg" maxW="md">



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



                        </Fieldset.Content>

                        <Button type="login" width={"100%"} mb={"10px"} alignSelf="flex" color={"black"} bg={"#41c8f1"} onClick={submitHandler} loading={isLoading}>
                                Login
                        </Button>
                </Fieldset.Root>
        )
}

export default Login