import styled from '@emotion/styled';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theme';
import { Schema, CompInfoType } from '../types/schema';
import { PlaygroundProvider } from './context';
import { ToolBar } from './toolbar';
import { Canvas } from './canvas';
import { Config } from './config';

const PlaygroundWrapper = styled.div`
  display: flex;
  min-width: 1000px;
  width: 100%;
  height: 100%;

  & > * {
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #00000026;
      border-radius: 10px;
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const Playground: React.FC<{
  schema?: Schema;
  setSchema?: (schema: Schema) => void;
  list: CompInfoType[];
}> = ({ schema = { type: 'object' }, setSchema, list, ...props }) => {
  const [_schema, _setSchema] = useState(schema);

  useEffect(() => {
    _setSchema(schema);
  }, [schema]);

  return (
    <ThemeProvider theme={theme}>
      <PlaygroundProvider
        {...props}
        schema={_schema}
        setSchema={(v) => {
          _setSchema(v);
          setSchema?.(v);
        }}
        list={list}
      >
        <PlaygroundWrapper className="l-lib__playground">
          <ToolBar />
          <Canvas />
          <Config />
        </PlaygroundWrapper>
      </PlaygroundProvider>
    </ThemeProvider>
  );
};
