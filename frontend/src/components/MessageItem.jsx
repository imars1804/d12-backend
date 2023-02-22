import React from "react";

const MessageItem = ({item}) => {
    return <div className="message-item">
        <img src={item.author.avatar} alt={`foto de ${item.author.alias}`} />
        <p>{`${item.author.alias} dice: ${item.text} // ${item.author.id}`}</p>
    </div>
}

export default MessageItem;