import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/ai-chatbot.css";
import { useUser } from "../context/UserContext";
import Navbar from "../components/navbar";
import { useHistory } from "../context/UserContext";


function MainApi({ selectedHistory }) {
  const [topic, setTopic] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useUser(); 
  const user_id = userId; 
  const {triggerRefresh} = useHistory();

  useEffect(() => {
  if (selectedHistory) {
    setTopic(selectedHistory.input_question);
    setBlog(selectedHistory.title);
  } else {
    setTopic(""); // Clear topic
    setBlog("");  // Clear blog
  }
}, [selectedHistory]);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
  return (
    window.location.href = "/login"
  );
  }
}, []);
  const generateBlog = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setBlog("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/ai-blog/api/chat", {
        topic,
      });
      const blogContent = response.data.blog;
      setBlog(blogContent);
      await axios.post("http://127.0.0.1:5000/history/v1/history", {
        user_id: user_id,
        input_question: topic,
        title: blogContent, // poora blog content save karen
       
      });
       triggerRefresh();
    } catch (error) {
      console.error("Error:", error);
      setBlog("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <Navbar />
        <div className="chat-wrapper mt-3">
        <div className="chat-messages">
          {blog && (
            <div className="chat-bubble ai-response">
              <h3 className="blog-title">📰 Blog Preview</h3>
              <p className="blog-content">{blog}</p>
            </div>
          )}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            className="input-glass"
            placeholder="Enter a topic (e.g., Benefits of Meditation)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
          <button
            className="btn-glass"
            onClick={generateBlog}
            disabled={loading || !topic.trim()}
          >
            {loading ? <div className="spinner"></div> : "Generate Blog"}
          </button>
        </div>

      </div>
    </>
  );
}

export default MainApi;
