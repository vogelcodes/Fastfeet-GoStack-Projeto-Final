import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {} from '../NewPackage/styles';
import history from '../../services/history';

export default function NewCourier() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome do entregador'),
    email: Yup.string().email().required('Informe o email do entregador'),
  });

  async function handleSubmit({ name, email }) {
    try {
      await api.post('couriers', {
        name,
        email,
      });
      toast.success('Entregador cadastrado');
      history.push('/couriers');
    } catch (err) {
      toast.error('Entregador não cadastrado');
    }
  }
  return (
    <div className="login-box">
      <h2>Cadastrar Entregador</h2>
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>Nome</strong>
        <Input name="name" placeholder="Nome do Entregador" />
        <strong>Email</strong>
        <Input name="email" type="email" placeholder="E-mail do Entregador" />

        <button type="submit">Salvar</button>
      </Form>
    </div>
  );
}
