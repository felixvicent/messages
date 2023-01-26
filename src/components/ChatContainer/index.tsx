import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { api } from "../../services/api";
import { Contact } from "../../types/Contact";
import { Message } from "../../types/Message";
import { User } from "../../types/User";
import { toastError } from "../../utils/toast";
import { ChatInput } from "../ChatInput";
import { Logout } from "../Logout";

import * as S from "./styles";

interface ChatContainerProps {
  currentChat?: Contact;
  currentUser?: User;
  socket: React.MutableRefObject<Socket | undefined>;
}

export function ChatContainer({
  currentChat,
  currentUser,
  socket,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await api.get("/api/messages", {
        params: {
          from: currentUser?._id,
          to: currentChat?._id,
        },
      });

      setMessages(data);
    }

    fetchMessages();
  }, [currentChat, currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-received", (data) => {
        console.log("received");
        setMessages((prevState) => {
          if (!prevState.find((message) => message._id === data._id)) {
            return [
              ...prevState,
              { text: data.message, sender: data.sender, _id: data._id },
            ];
          } else {
            return [...prevState];
          }
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(message: string) {
    try {
      const { data } = await api.post("/api/messages", {
        message,
        from: currentUser?._id,
        to: currentChat?._id,
      });

      socket.current?.emit("send-message", {
        to: currentChat?._id,
        from: currentUser?._id,
        message,
        _id: data._id,
      });

      setMessages((prevState) => [
        ...prevState,
        { text: message, sender: currentUser?._id || "", _id: data._id },
      ]);
    } catch (error) {
      toastError("Mensagem não enviada! Tente novamente!");
    }
  }

  return (
    <S.Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt={currentChat?.username}
            />
          </div>

          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>

        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === currentUser?._id ? "sended" : "received"
            }`}
          >
            <div className="content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </S.Container>
  );
}
