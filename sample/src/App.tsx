import { Global, css, Theme } from '@emotion/react';
import Markdown from 'react-markdown';
import { Sample } from './sample';
import desp from '../../README.md';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Header } from './common/header';

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

          .desp {
            width: 800px;
            margin: 0 auto;
            padding-bottom: 24px;

            img {
              display: none;
            }
          }

          .sample {
            margin: 24px auto;
            border: 1px solid #e4e7ed;
            width: 1000px;
            padding: 10px;
            height: 500px;
          }

          :root {
            border-color: #e4e7ed;
          }
        `}
      />
      <Header />
      <div className="sample">
        <Sample />
      </div>
      <div className="desp">
        <Markdown
          components={{
            code({ className, children, ...rest }) {
              const _SyntaxHighlighter = SyntaxHighlighter as any;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <_SyntaxHighlighter PreTag="div" language={match[1]} style={vs} {...rest}>
                  {children}
                </_SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {desp}
        </Markdown>
      </div>
    </>
  );
}

export default App;
