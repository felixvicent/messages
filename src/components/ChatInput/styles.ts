import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem 0.3rem;

  .button-container {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c7;
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: absolute;
        top: -480px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9a86f3;
            border-radius: 5rem;
          }
        }

        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }

        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 80%;
      height: 60%;
      background-color: transparent;
      color: #fff;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: 0;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: 0;
      cursor: pointer;

      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }
`;
