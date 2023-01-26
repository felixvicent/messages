import { Contact } from "../../types/Contact";
import { Logout } from "../Logout";

import * as S from "./styles";

interface ChatContainerProps {
  currentChat?: Contact;
}

export function ChatContainer({ currentChat }: ChatContainerProps) {
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

      <div className="chat-messages"></div>
      <div className="chat-input"></div>
    </S.Container>
  );
}
