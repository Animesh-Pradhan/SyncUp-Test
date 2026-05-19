"use client"

import { useState } from "react"
import { Box, Button, Flex, Separator, Text, Textarea } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md"
import { addFeed } from "@/service/feed.service"
import { toaster } from "@/components/ui/toaster"

export default function Page() {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const handleSubmit = async () => {
        try {
            setError(null)
            setLoading(true)

            const response = await addFeed({ message });
            if (response.status) {
                setMessage("");
                toaster.create({
                    title: "Feed Added",
                    description: "The feed has been added successfully.",
                    type: "success"
                })
            } else {
                setError(response.message || "Failed to add feed");
            }
        }
        catch (error) {
            console.log(error)
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
        finally {
            setLoading(false)
        }
    }

    return (<Box w={'100%'}>
        <Text fontSize={'20px'}>Add Feed</Text>

        <Separator my={4} />

        <Flex direction={'column'} gap={2} as="form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Textarea
                placeholder="Enter feed message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minH={"200px"}
                resize={"none"}
            />

            {error && <Text color={"red.500"}>{error}</Text>}

            <Button w={'200px'} size={'sm'} type="submit" loading={loading} loadingText="Adding Feed" colorPalette={"blue"}><MdAdd /> Add Feed</Button>
        </Flex>


    </Box>)
}