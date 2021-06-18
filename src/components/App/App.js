import Card from '../Card/Card';
import Text from '../Text/Text';
import styled from 'styled-components';

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Div>
      <Text />
      <Card />
    </Div>
  );
}

export default App;
