import React from 'react';

// import { Container } from './styles';

export default function PkgStatus(props) {
  const { canceled_at, delivered } = props.pkg;
  let text = 'Em Andamento';
  if (delivered) {
    text = 'Entregue';
  } else if (canceled_at) {
    text = 'Cancelada';
  }

  return <span>{text}</span>;
}
