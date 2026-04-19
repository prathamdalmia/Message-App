export const getSender = (loggedUser, users) => {
        // console.log(users);
        // console.log(loggedUser.name);
        // console.log(users[1], users[0]);
        return users[0].name === loggedUser.name ? users[1] : users[0];
}