import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import { toastError } from "../../utils/toast";

import * as S from "./styles";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chatappuser")) {
      navigate("/");
    }
  }, [navigate]);

  function handleValidation() {
    if (!username || !password) {
      toastError("O nome do usuário e a senha são obrigatórios");

      return false;
    }

    return true;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const { data } = await api.post("/api/auth", {
          username,
          password,
        });

        localStorage.setItem("chatappuser", JSON.stringify(data));
      } catch (error) {
        toastError("Não foi possivel o cadastro, tente novamente!");
      }
    }
  }

  return (
    <>
      <S.FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logoImg} alt="Snappy" />
            <h1>snappy</h1>
          </div>

          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Entrar</button>

          <span>
            Ainda não conta? <Link to="/register">Registre-se aqui</Link>
          </span>
        </form>
      </S.FormContainer>
    </>
  );
}
