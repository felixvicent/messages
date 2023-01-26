import logoImg from "../../assets/logo.svg";

import * as S from "./styles";

interface HeaderProps {
  size?: "medium" | "small";
}

export function Header({ size = "medium" }: HeaderProps) {
  return (
    <S.Container size={size}>
      <img src={logoImg} alt="Logo" />
      <h1>snappy</h1>
    </S.Container>
  );
}
