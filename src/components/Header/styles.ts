import styled, { css } from "styled-components";

export const Container = styled.div<{ size: "small" | "medium" }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  img {
    height: 5rem;

    ${({ size }) =>
      size === "small" &&
      css`
        height: 2rem;
      `}
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
  }
`;
