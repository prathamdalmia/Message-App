import React, { useState } from 'react'
import { Button, Field, Fieldset, For, Input, NativeSelect, Stack, FileUpload } from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { PasswordInput } from "../ui/password-input"

const Login = () => {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("")


        const submitHandler = () => { console.log({ name, email, password }) }
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

                        <Button type="login" width={"100%"} mb={"10px"} alignSelf="flex" color={"black"} bg={"#41c8f1"} onClick={submitHandler}>
                                Login
                        </Button>
                </Fieldset.Root>
        )
}

export default Login