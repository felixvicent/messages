import { Contact } from "../../types/Contact";
import { ChatInput } from "../ChatInput";
import { Logout } from "../Logout";
import { Messages } from "../Messages";

import * as S from "./styles";

interface ChatContainerProps {
  currentChat?: Contact;
}

export function ChatContainer({ currentChat }: ChatContainerProps) {
  async function handleSendMessage(message: string) {
    alert(message);
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

      <Messages />
      <ChatInput onSendMessage={handleSendMessage} />
    </S.Container>
  );
}
