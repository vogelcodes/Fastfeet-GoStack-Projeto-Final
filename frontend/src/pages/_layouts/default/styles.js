import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  justify-content: center;
  align-items: center;

  .login-box {
    margin: 30px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    max-width: 315px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    strong {
      text-align: left;
      margin: 15px 0 15px 0;
    }

    input {
      border: 1px solid #ddd;
      height: 45px;
      border-radius: 4px;
      padding: 0 15px;
      font-weight: 300;
      margin: 0 0 15px;

      &::placeholder {
        color: #bbb;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
export const Content = styled.div`
  width: 100%;
`;
