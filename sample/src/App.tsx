import { Global, css, Theme } from '@emotion/react';
import { Header } from './common/header';
import { Sample } from './sample';

function App() {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }

          * {
            box-sizing: border-box;
          }

          main {
            height: calc(100% - 60px);
            overflow: auto;
            width: 100%;
            padding: 8px;
          }

          :root {
            border-color: #e4e7ed;
          }
        `}
      />

      <Header />
      <main>
        <Sample />
      </main>
    </>
  );
}

export default App;
