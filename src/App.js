import HomePage from './pages/HomePage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <HomePage />
      </div>
    </>
  );
}

export default App;
