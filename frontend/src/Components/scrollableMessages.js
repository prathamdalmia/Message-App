import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../Config/chatLogics'
import { ChatState } from '../Context/chatProvider'
import { Tooltip } from './ui/tooltip'
import { Avatar } from '@chakra-ui/react'


const ScrollableMessages = ({ messages }) => {
        const { user } = ChatState();

        return (
                <ScrollableFeed>
                        {messages && messages.map((m, i) => {
                                return (<div style={{ display: "flex" }} key={m._id}>
                                        {
                                                ((isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                                                        <Tooltip
                                                                content={m.sender.name}
                                                                showArrow
                                                                positioning={{ placement: "bottom-end" }}

                                                        >
                                                                <span>


                                                                        <Avatar.Root
                                                                                mt='7px'
                                                                                mr={1}
                                                                                size='sm'
                                                                                cursor="pointer"
                                                                        >
                                                                                <Avatar.Fallback name={m.sender.name} />
                                                                                <Avatar.Image src={m.sender.pic} />
                                                                        </Avatar.Root>

                                                                </span>

                                                        </Tooltip>
                                                ))}

                                        <span style={{
                                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                                                borderRadius: "20px",
                                                padding: "5px 15px",
                                                maxWidth: "75%",
                                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10

                                        }}>
                                                {m.content}
                                        </span>

                                </div>)
                        })}
                </ScrollableFeed>
        )
}

export default ScrollableMessages