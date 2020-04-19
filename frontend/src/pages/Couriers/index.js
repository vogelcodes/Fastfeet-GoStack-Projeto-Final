import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import {
  Container,
  PackageList,
  Package,
  Top,
  TableHeader,
  Cadastra,
} from './styles';
import history from '../../services/history';

export default function Couriers() {
  const [couriers, setCouriers] = useState([]);
  useEffect(() => {
    async function loadCouriers() {
      const response = await api.get('couriers');
      setCouriers(response.data);
    }
    loadCouriers();
  }, []);
  function cadastrar() {
    history.push('/newcourier');
  }

  return (
    <Container>
      <Top>
        <Cadastra onClick={cadastrar}>Cadastrar</Cadastra>
      </Top>
      <PackageList>
        <TableHeader>
          <span>ID</span>
          <span>Nome</span>
          <span>Email</span>
          <span />
        </TableHeader>
        {couriers.map((courier) => (
          <Package key={courier.id}>
            <span>#{courier.id}</span> <span>{courier.name}</span>{' '}
            <span>{courier.email}</span>
            <span>...</span>
          </Package>
        ))}
      </PackageList>
    </Container>
  );
}
