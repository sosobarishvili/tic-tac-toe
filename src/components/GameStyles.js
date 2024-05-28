import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282c34;
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
`;

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin: 20px 0;
`;

export const SquareButton = styled.button`
  background: ${(props) => (props.value === 'X' ? '#ff6f61' : props.value === 'O' ? '#6ab7ff' : '#f2f2f2')};
  border: none;
  color: ${(props) => (props.value ? 'white' : 'black')};
  font-size: 3rem;
  font-weight: bold;
  width: 100px;
  height: 100px;
  cursor: ${(props) => (props.value ? 'default' : 'pointer')};
  transition: background-color 0.3s;
  
  &:hover {
    background: ${(props) => (props.value ? '' : '#e0e0e0')};
  }
`;

export const GameInfo = styled.div`
  margin-top: 20px;
`;

export const Status = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

export const Score = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

export const ModeButton = styled.button`
  background: #61dafb;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 1rem;
  margin: 5px 10px;
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background: #21a1f1;
  }
`;

export const RestartButton = styled.button`
  background: #ff6f61;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin: 5px 10px;
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background: #e05449;
  }
`;