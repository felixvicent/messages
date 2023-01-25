import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { User } from "../../types/User";
import * as S from "./styles";

export function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

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

          console.log(data);
        } else {
          navigate("set-avatar");
        }
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);

  return (
    <S.Container>
      <div className="container"></div>
    </S.Container>
  );
}
