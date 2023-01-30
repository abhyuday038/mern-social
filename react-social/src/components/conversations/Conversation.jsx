import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css"

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axios.get("/users?userId=" + friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="conversation">
            <img src={user ? (user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png") : ""} alt="" className="conversationImg" />
            <span className="conversationName">{user ? user.username : ""} </span>
        </div>
    );
}

export default Conversation;
