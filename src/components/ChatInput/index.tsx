import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

import * as S from "./styles";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  function handleEmojiPickerToggle() {
    setShowEmojiPicker((prevState) => !prevState);
  }

  function handleEmojiSelect(emoji: EmojiClickData) {
    setMessage((prevState) => `${prevState}${emoji.emoji}`);
  }

  function handleSendChat(event: FormEvent) {
    event.preventDefault();

    if (message) {
      onSendMessage(message);
      setMessage("");
      setShowEmojiPicker(false);
    }
  }

  return (
    <S.Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerToggle} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiSelect}
              theme={Theme.DARK}
              searchPlaceHolder={"Busca"}
            />
          )}
        </div>
      </div>

      <form className="input-container" onSubmit={handleSendChat}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </S.Container>
  );
}
