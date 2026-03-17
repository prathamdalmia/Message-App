import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
        return (
                <Stack>
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        <Skeleton height="45px" variant={"pulse"} />
                        {/* <Skeleton height="45px" variant={"pulse"} /> */}

                </Stack>
        )
}

export default ChatLoading