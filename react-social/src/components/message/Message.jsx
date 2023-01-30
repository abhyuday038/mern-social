import "./message.css"
import { format } from "timeago.js"

const Message = ({ message, own }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={PF + "person/4.jpeg"} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    );
}

export default Message;
