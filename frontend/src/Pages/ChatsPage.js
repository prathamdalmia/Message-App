import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import MyChat from "../Components/MyChat";
import ChatBox from "../Components/ChatBox";

const ChatsPage = () => {
        const { user } = ChatState();

        const [fetchAgain, setFetchAgain] = useState(false)

        return <div style={{ width: "100%" }}>
                {user && <SideDrawer />}
                <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        w={"100%"}
                        h={"91.5vh"}
                        p={"10px"}
                >
                        {user && <MyChat fetchAgain={fetchAgain} />}
                        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                </Box>
        </div>

};

export default ChatsPage;