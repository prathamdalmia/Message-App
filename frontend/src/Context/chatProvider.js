import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const ChatContext = createContext();


const ChatProvider = ({ children }) => {
        const [userToken, setUserToken] = useState();

        const history = useHistory();

        useEffect(() => {
                const userToken = JSON.parse(localStorage.getItem("userToken"));
                setUserToken(userToken);
                if (!userToken) {
                        history.push('/');
                }
        }, [history]);

        return (
                <ChatContext.Provider value={{ userToken, setUserToken }}>
                        {children}
                </ChatContext.Provider>
        );
}
export const ChatState = () => {
        return useContext(ChatContext);
}

export default ChatProvider;