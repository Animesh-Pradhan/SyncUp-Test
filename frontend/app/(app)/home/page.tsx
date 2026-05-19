"use client"

import { createSocketConnection } from "@/libs/socket";
import { getFeeds } from "@/service/feed.service";
import { Alert, Box, Flex, GridItem, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

interface Feed {
    id: string;
    message: string;
    createdAt: string;
}

export default function Page() {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const fetchFeeds = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);

            const response = await getFeeds();
            if (response.status) {
                setFeeds(response.data);
            } else {
                setError(response.message || "Failed to fetch feeds");
            }
        } catch (error) {
            console.log(error)
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [])

    // useEffect(() => {
    //     fetchFeeds();
    // }, [fetchFeeds])

    useEffect(() => {
        const socket = createSocketConnection()
        socket.on("connect", () => {
            console.log("Socket Connected:", socket.id)
            fetchFeeds();
        })

        socket.on("new-feed", (feed: Feed) => {
            setFeeds((prev) => {
                const exists = prev.some((f) => f.id === feed.id);
                console.log(feed, exists)
                if (exists) {
                    return prev;
                }
                return [feed, ...prev]
            })
        })

        socket.on("disconnect", () => {
            console.log("Socket Disconnected")
        })

        return () => {
            socket.off("connect")
            socket.off("new-feed")
            socket.off("disconnect")

            socket.disconnect()
        }

    }, [fetchFeeds])

    if (error) {
        return (<Flex h={'100%'} w={'100%'} alignItems={'start'} justifyContent={'center'}>
            <Alert.Root status="error" w={'60%'}>
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>{error}</Alert.Title>
                </Alert.Content>
            </Alert.Root>
        </Flex>)
    }

    return (<Box w={'100%'}>
        <Text fontSize={'20px'}>Feeds</Text>

        <SimpleGrid w={'100%'} columns={{ base: 1, md: 3, lg: 4 }} gap={4} mt={4}>
            {loading ?
                Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} h={"150px"} />)
                : feeds?.map((feed) => (
                    <GridItem key={feed?.id} p={4} border={"1px solid #e2e8f0"}
                        borderRadius={"sm"} boxShadow={"sm"}
                        direction={"column"}
                        gap={2}
                    >

                        <Text fontWeight={"600"}>{feed?.message}</Text>
                        <Text fontSize={"sm"} color={"gray.500"}>{new Date(feed?.createdAt).toLocaleString()}</Text>
                    </GridItem>
                ))
            }
        </SimpleGrid>
    </Box>)
}
