import '@emotion/react';

declare module '@emotion/react' {
  interface Theme {
    color: {
      border: string;
      primary: string;
    };
  }
}
