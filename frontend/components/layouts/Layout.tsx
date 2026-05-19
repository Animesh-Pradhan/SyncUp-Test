"use client"

import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <Flex direction={"column"} h="100vh" w={'100%'}>
            <Flex justifyContent={'center'} borderBottom={"1px solid #c6c6c6"} boxShadow={'md'} alignItems={'center'} h={'60px'}>
                <Flex gap={4}>
                    <Box cursor={'pointer'} _hover={{ scale: "1.02", color: "blue" }} onClick={() => router.push("/admin")}>Admin</Box>
                    <Box cursor={'pointer'} _hover={{ scale: "1.02", color: "blue" }} onClick={() => router.push("/home")}>Home</Box>
                </Flex>
            </Flex>

            <Flex dir='column' h={'calc(100vh - 60px)'} w={'100%'} overflowY={'auto'} p={4}>
                {children}
            </Flex>
        </Flex>
    )
}
