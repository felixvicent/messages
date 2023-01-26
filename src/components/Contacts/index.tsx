import { useEffect, useState } from "react";

import { User } from "../../types/User";

import * as S from "./styles";
import { Header } from "../Header";
import { Contact } from "../../types/Contact";

interface ContactsProps {
  contacts: Contact[];
  currentUser?: User;
  onChangeChat: (chat: any) => void;
}

export function Contacts({
  contacts,
  currentUser,
  onChangeChat,
}: ContactsProps) {
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(
    undefined
  );
  const [currentUserImage, setCurrentUserImage] = useState<string | undefined>(
    undefined
  );
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  function changeCurrentChat(index: number, contact: Contact) {
    setCurrentSelected(index);
    onChangeChat(contact);
  }

  return (
    <>
      {currentUserImage && currentUserName && (
        <S.Container>
          <Header size="small" />

          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  currentSelected === index ? "selected" : ""
                }`}
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt={contact.username}
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt={currentUserName}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </S.Container>
      )}
    </>
  );
}
