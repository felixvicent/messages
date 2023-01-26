import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Contact } from "../../types/Contact";
import { Message } from "../../types/Message";
import { User } from "../../types/User";
import { toastError } from "../../utils/toast";
import { ChatInput } from "../ChatInput";
import { Logout } from "../Logout";
import { Messages } from "../Messages";

import * as S from "./styles";

interface ChatContainerProps {
  currentChat?: Contact;
  currentUser?: User;
}

export function ChatContainer({
  currentChat,
  currentUser,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);

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

  async function handleSendMessage(message: string) {
    try {
      await api.post("/api/messages", {
        message,
        from: currentUser?._id,
        to: currentChat?._id,
      });
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
        {messages.map((message) => (
          <div
            className={`message ${
              message.sender === currentUser?._id ? "sended" : "received"
            }`}
          >
            <div className="content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </S.Container>
  );
}
