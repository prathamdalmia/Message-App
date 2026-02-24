import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ChatState } from "../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import MyChat from "../Components/Miscellaneous/MyChat";
import ChatBox from "../Components/Miscellaneous/ChatBox";

const ChatsPage = () => {
        const { userToken } = ChatState();

        return <div style={{ width: "100%" }}>
                {userToken && <SideDrawer />}
                <Box>
                        {userToken && <MyChat />}
                        {userToken && <ChatBox />}
                </Box>
        </div>

};

export default ChatsPage;