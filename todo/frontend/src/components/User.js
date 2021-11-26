import React from "react";
import App from "../App";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{ user.username }</td>
            <td>{ user.email }</td>
            <td>{ user.first_name }</td>
            <td>{ user.last_name }</td>
        </tr>
    )
}
const UserList = ({users}) => {

    return (
        <table>
            <th> User name </th>
            <th> Email </th>
            <th> First name </th>
            <th> Last name </th>
            {users.map((user) => < UserItem user = {user} />)}
        </table>
    )
}

export default UserList;
//