import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from 'react-native';
import {Container, Title, Form, Input, SubmitButton} from './styles';
import api from '../../services/api';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    courierID: '',
    courierData: {},
  };

  handleLogin = async () => {
    const {courierID} = this.state;
    const response = await api.post('/signin', {id: courierID});
    this.setState({courierData: response.data});
  };

  render() {
    const {courierID, courierData} = this.state;
    const {name, email} = courierData;
    return (
      <Container>
        <Title> FastFeet Inc.</Title>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            value={courierID}
            onChangeText={(text) => this.setState({courierID: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />
          <Input value={name} />
          <Input value={email} />
          <SubmitButton onPress={this.handleLogin}>
            <Text>Entrar no sistema</Text>
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
