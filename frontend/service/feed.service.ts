const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getFeeds = async () => {
    const response = await fetch(`${API_URL}/feeds`);
    const data = await response.json();
    return data;
}

export const addFeed = async (feedData: {
    message: string;
}) => {
    const response = await fetch(`${API_URL}/feeds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: feedData.message })
    });
    const data = await response.json();
    return data;
}