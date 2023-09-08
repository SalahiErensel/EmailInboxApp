import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const [email] = useState("salahiexample@hotmail.com");
  const [password] = useState("salahiexample1234");
  const [userName, setUserName] = useState("");
  const [totalMessageCount, setTotalMessageCount] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(null);

  const showGreeting = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/unreadmessages",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setUserName(data?.username);
        setTotalMessageCount(data?.totalMessageCount);
        setUnreadMessageCount(data?.unreadMessageCount);
        localStorage.setItem("jwt", data?.jwt);
      } else {
        console.error("Authentication error:", data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    showGreeting();
  }, []);

  return (
    <div>
      <div className="container" style={{display: "flex",justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
        <div className="card mt-5 col-md-6 bg-dark" style={{ borderRadius: "20px" }}>
          <div className="card-body">
            <h3 className="mt-2 text-light">Hello, {userName}</h3>
            <h3 className="mt-2 text-light">Welcome to your Mailbox!</h3>
            <h6 className="mt-4 text-light">
              You have {unreadMessageCount} unread messages out of{" "} {totalMessageCount} total
            </h6>
            <Link to="/inbox">
              <button className="btn btn-light mt-4" style={{ borderRadius: "15px" }}>
                View Messages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
