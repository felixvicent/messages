import { useNavigate } from "react-router-dom";

import { BiPowerOff } from "react-icons/bi";

import * as S from "./styles";

export function Logout() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();

    navigate("/login");
  }

  return (
    <S.Button onClick={handleLogout}>
      <BiPowerOff />
    </S.Button>
  );
}
