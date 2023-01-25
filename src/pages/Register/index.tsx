import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import { toastError } from "../../utils/toast";

import * as S from "./styles";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleValidation() {
    if (password !== confirmPassword) {
      toastError("As senhas digitadas são diferentes");

      return false;
    } else if (username.length < 3) {
      toastError("O nome de usuário deve ser maior que 3 caracteres");

      return false;
    } else if (email.length < 3) {
      toastError("O email deve ser um email válido");

      return false;
    } else if (password.length < 8) {
      toastError("A senha deve ser maior que 8 caracteres");

      return false;
    }

    return true;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (handleValidation()) {
      try {
        const { data } = await api.post("/api/users/", {
          email,
          username,
          password,
        });

        localStorage.setItem("chatappuser", JSON.stringify(data));

        navigate("/");
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
            type="email"
            placeholder="Endereço de email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <button type="submit">Salvar</button>

          <span>
            Já tem conta? <Link to="/login">Entre aqui</Link>
          </span>
        </form>
      </S.FormContainer>
    </>
  );
}
