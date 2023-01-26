import { User } from "../../types/User";

import robotImg from "../../assets/robot.gif";

import * as S from "./styles";

interface WelcomeProps {
  currentUser?: User;
}

export function Welcome({ currentUser }: WelcomeProps) {
  return (
    <S.Container>
      <img src={robotImg} alt="Welcome" />
      <h1>
        Bem vindo, <span>{currentUser?.username}</span>
      </h1>
      <h3>Por favor selecione um contato para iniciar</h3>
    </S.Container>
  );
}
