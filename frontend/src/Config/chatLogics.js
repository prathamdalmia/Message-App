export const getSender = (loggedUser, users) => {
        // console.log(users);
        // console.log(loggedUser.name);
        // console.log(users[1], users[0]);
        return users[0].name === loggedUser.name ? users[1] : users[0];
}


export const isSameSender = (messages, m, i, userId) => {
        if (i >= messages.length - 1) return false;

        const nextSenderId = messages[i + 1]?.sender?._id;

        return (
                nextSenderId !== m.sender._id &&
                m.sender._id !== userId
        );
};


export const isLastMessage = (messages, i, userId) => {
        if (i !== messages.length - 1) return false;

        return messages[i]?.sender?._id !== userId;
};

export const isSameSenderMargin = (messages, m, i, userId) => {
        const isNextSameUser =
                i < messages.length - 1 &&
                messages[i + 1]?.sender?._id === m.sender._id;

        const isCurrentUser = m.sender._id === userId;

        // Same sender (grouped messages)
        if (isNextSameUser && !isCurrentUser) {
                return 33;
        }

        // Different sender OR last message (show avatar space)
        if (
                (!isNextSameUser && !isCurrentUser) ||
                (i === messages.length - 1 && !isCurrentUser)
        ) {
                return 0;
        }

        // Current user's message
        return "auto";
};



export const isSameUser = (messages, m, i) => {
        return i > 0 && messages[i - 1].sender._id === m.sender._id;
}