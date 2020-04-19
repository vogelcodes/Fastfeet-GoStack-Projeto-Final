import React, { useState, useEffect } from 'react';

import PkgStatus from '../../components/PkgStatus';

import api from '../../services/api';

import {
  Container,
  PackageList,
  Package,
  TableHeader,
  Top,
  Busca,
  Cadastra,
} from './styles';
import history from '../../services/history';

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    async function loadPackages() {
      const response = await api.get('packages');
      setPackages(response.data);
    }
    loadPackages();
  }, []);
  function cadastrar() {
    history.push('/newpackage');
  }

  return (
    <Container>
      <PackageList>
        <h2>Gerenciando Encomendas</h2>
        <Top>
          <Busca visible="false" placeholder="Buscar Encomenda" />
          <Cadastra onClick={cadastrar}>Cadastrar</Cadastra>
        </Top>
        <TableHeader>
          <span>ID</span>
          <span>Destinatário</span> <span>Entregador</span>
          <span>Cidade</span>
          <span>Estado</span>
          <span>Status</span>
          <span />
        </TableHeader>
        {packages.map((pkg) => (
          <Package key={pkg.id}>
            <span>#{pkg.id}</span> <span>{pkg.recipient.name}</span>{' '}
            <span>{pkg.courier.name}</span>
            <span>{pkg.recipient.city}</span>
            <span>{pkg.recipient.state}</span>
            <PkgStatus pkg={pkg} />
            <span>...</span>
          </Package>
        ))}
      </PackageList>
    </Container>
  );
}
