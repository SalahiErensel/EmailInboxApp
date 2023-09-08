import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const jwt = localStorage.getItem('jwt');

const Message = () => {
    const [message, setMessage] = useState(null);
    const { id } = useParams();

useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setMessage(response.data.message);

        // Update isRead status when message is viewed
        await axios.put(`http://localhost:5000/messages/${id}/changeIsRead`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
              },
        });
      } catch (error) {
        console.error('Error updating message:', error);
      }
    };

    getMessage();
  }, [id]);

  return (
    <div>
      <div className="container" style={{display: "flex",justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
        <div className="card mt-5 col-md-6 bg-dark" style={{ borderRadius: "20px" }}>
          <div className="card-body">
            <h2 className="mt-2 text-light">{message?.subject}</h2>
            <h5 className="mt-4 text-light">{message?.content}</h5>
            <Link to="/inbox">
              <button className="btn btn-light mt-4" style={{ borderRadius: "15px" }}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;