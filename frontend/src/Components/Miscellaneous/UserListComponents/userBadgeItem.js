import { Badge, CloseButton } from '@chakra-ui/react'
import React from 'react'
import { getRandomColor } from '../../../Config/getRandomColor'

const UserBadgeItem = ({ user, handlerFunction, color }) => {
        // console.log(user);

        return (
                <Badge size="sm" colorPalette={color ? color : getRandomColor()} >{user?.name} <CloseButton size={"2xs"} onClick={handlerFunction} /></Badge>
        )
}

export default UserBadgeItem