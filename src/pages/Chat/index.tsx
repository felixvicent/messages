import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contacts } from "../../components/Contacts";
import { Welcome } from "../../components/Welcome";
import { api } from "../../services/api";
import { Contact } from "../../types/Contact";
import { User } from "../../types/User";
import * as S from "./styles";

export function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [currentChat, setCurrentChat] = useState<Contact | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chatappuser")) {
      navigate("/login");
    } else {
      const storagedUser = localStorage.getItem("chatappuser") || "";
      setCurrentUser(JSON.parse(storagedUser));
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await api.get(`/api/users/${currentUser._id}`);

          setContacts(data);
        } else {
          navigate("set-avatar");
        }
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);

  function handleChatChange(chat: Contact) {
    setCurrentChat(chat);
  }

  return (
    <S.Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          onChangeChat={handleChatChange}
        />

        <Welcome currentUser={currentUser} />
      </div>
    </S.Container>
  );
}
