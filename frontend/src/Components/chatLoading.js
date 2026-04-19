import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
        return (
                <Stack gap={"5"}>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>
                        <HStack gap="5">
                                <SkeletonCircle size="12" />
                                <Stack flex="1">
                                        <Skeleton height="5" width="80%" />
                                        <Skeleton height="5" />
                                </Stack>
                        </HStack>

                        {/* <Skeleton height="45px" variant={"pulse"} /> */}

                </Stack>
        )
}

export default ChatLoading