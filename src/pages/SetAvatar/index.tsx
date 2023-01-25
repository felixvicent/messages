import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import * as S from "./styles";
import { toastError } from "../../utils/toast";
import loadingImg from "../../assets/loader.gif";
import { api } from "../../services/api";

const avatarSource = "https://api.multiavatar.com/45678945";

export function SetAvatar() {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chatappuser")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchAvatars() {
      const data = [];

      for (let index = 0; index < 4; index++) {
        const image = await axios.get(
          `${avatarSource}/${Math.round(Math.random() * 1000)}`
        );

        const buffer = new Buffer(image.data);

        data.push(buffer.toString("base64"));
      }

      setAvatars(data);
      setIsLoading(false);
    }

    fetchAvatars();
  }, []);

  async function setProfileAvatar() {
    try {
      if (selectedAvatar === undefined) {
        toastError("Selecione um avatar");
        return;
      }

      const storedUser = localStorage.getItem("chatappuser") ?? "";

      const user = await JSON.parse(storedUser);

      await api.put(`/api/users/${user._id}/avatar`, {
        image: avatars[selectedAvatar],
      });

      user.isAvatarImageSet = true;
      user.avatarImage = avatars[selectedAvatar];

      localStorage.setItem("chatappuser", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      toastError("Algo deu errado! tente novamente mais tarde!");
    }
  }

  return (
    <S.Container>
      {isLoading ? (
        <img src={loadingImg} alt="Loader" />
      ) : (
        <>
          <div className="title-container">
            <h1>Selecione um avatar</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="Avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>

          <button className="submit-btn" onClick={setProfileAvatar}>
            Salvar
          </button>
        </>
      )}
    </S.Container>
  );
}
