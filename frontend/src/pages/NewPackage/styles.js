import styled from 'styled-components';
import { darken } from 'polished';

export const Cadastra = styled.button`
  background: #7d40e7;
  color: #fff;
  border: 0;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#7d40e7')};
  }
`;
