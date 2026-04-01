import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const ChatContext = createContext();


const ChatProvider = ({ children }) => {
        const [user, setUser] = useState();
        const [selectedChat, setSelectedChat] = useState()
        const [chats, setChats] = useState([]);

        const history = useHistory();

        useEffect(() => {
                const user = JSON.parse(localStorage.getItem("userInfo"));
                setUser(user);
                if (!user) {
                        history.push('/');
                }
        }, [history]);
        // console.log("PROVIDER RUNNING");

        return (
                <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
                        {children}
                </ChatContext.Provider>
        );
}
export const ChatState = () => {
        return useContext(ChatContext);
}

export default ChatProvider;