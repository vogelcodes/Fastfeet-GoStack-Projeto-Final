import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  justify-content: center;
`;
export const PackageList = styled.div`
  width: 100%;
  margin: auto;
  max-width: 900px;
`;
export const TableHeader = styled.div`
  height: 30px;
  margin-top: 2px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  span {
    width: 96px;
    max-width: 96px;
    overflow: hidden;
    text-align: center;
  }
`;
export const Package = styled.div`
  height: auto;
  min-height: 36px;
  margin-top: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  span {
    width: 96px;
    max-width: 96px;
    text-align: center;
  }
`;
export const Cadastra = styled.button`
  background: #7d40e7;
  color: #fff;
  border: 0;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background 0.2s;
`;
export const Top = styled.div`
  height: 32px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
