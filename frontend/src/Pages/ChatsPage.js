import React, { useEffect, useState } from "react";
import axios from 'axios';

const ChatsPage = () => {

        const [chats, setChats] = useState([]);
        const fetchChats = async () => {
                const { data } = await axios.get("/api/chats");
                setChats(data);

        }
        useEffect(() => {
                fetchChats();
        }, [])

        useEffect(() => {
                console.log(chats);
        }, [chats])
        return <div>{
                chats.message

        }</div>

};

export default ChatsPage;