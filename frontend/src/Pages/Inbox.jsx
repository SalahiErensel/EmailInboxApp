import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

const jwt = localStorage.getItem("jwt");

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
<div className="container" style={{display: "flex",justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
  <div className="row">
    <h2>Inbox <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon></h2>
    {messages?.map((message) => (
      <div className="col-md-4 mt-3" key={message?.id}>
        <div className="card mb-4 bg-dark" style={{ borderRadius: "20px" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#FFFFFF" }}>{message?.subject}</h5>
            <p className="card-text mt-4">{message?.content}</p>
            <p className="card-text">{message?.isRead ? <FontAwesomeIcon icon={faEnvelopeOpen}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>}</p>
            <Link to={`/message/${message.id}`}>
              <button className="btn btn-light">View Message</button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default Inbox;