import styled from '@emotion/styled';

const TitleWrapper = styled.div`
  padding: 4px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  font-weight: bold;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

export const Title: React.FC<{ children: string }> = ({ children }) => {
  return <TitleWrapper>{children}</TitleWrapper>;
};
