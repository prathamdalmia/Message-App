import { Badge, CloseButton } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handlerFunction, color }) => {
        // console.log(user);
        return (
                <Badge size="sm" colorPalette={color} >{user?.name} <CloseButton size={"2xs"} onClick={handlerFunction} /></Badge>
        )
}

export default UserBadgeItem