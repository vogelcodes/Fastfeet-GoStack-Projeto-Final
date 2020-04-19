import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/fastfeet.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <nav>
          <Link to="/dashboard">Encomendas</Link>
          <Link to="/couriers">Entregadores</Link>
        </nav>
      </Content>
    </Container>
  );
}
