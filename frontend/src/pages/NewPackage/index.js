import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import history from '../../services/history';

export default function NewPackage() {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o id do destinatáio'),
    courier_id: Yup.number().required('Informe o id do entregador'),
    product: Yup.string().required('Informe o nome do produto'),
  });

  async function handleSubmit({ recipient_id, courier_id, product }) {
    try {
      await api.post('packages', {
        recipient_id,
        courier_id,
        product,
      });
      toast.success('Encomenda cadastrada');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Encomenda não cadastrada');
    }
  }
  return (
    <div className="login-box">
      <h2>Cadastrar Encomenda</h2>
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>Destinatário</strong>
        <Input name="recipient_id" placeholder="ID do Destinatário" />
        <strong>Entregador</strong>
        <Input name="courier_id" placeholder="ID do Entregador" />
        <strong>Produto</strong>
        <Input name="product" placeholder="Nome do Produto" />

        <button type="submit">Salvar</button>
      </Form>
    </div>
  );
}
