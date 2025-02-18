import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';
import { Draggable } from '../common/dnd';
import { DragIcon, DeleteIcon } from '../common/icons';
import { usePlaygroundContext } from './context';
import { theme } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
  uuid: string;
  index: number;
};

const BlockWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 30px;

  background-color: #fff;
  outline: 1px solid ${(props) => props.theme.color.border};

  &:hover {
    z-index: 1;
    outline: 1px solid ${(props) => props.theme.color.primary};
  }

  &.active {
    outline: 2px solid ${(props) => props.theme.color.primary};
    z-index: 2;
  }

  .-container {
    padding: 12px;
    /* pointer-events: none; */
  }

  .-tool-bar {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;

    & > div {
      background-color: ${(props) => props.theme.color.primary};
      color: #fff;
      cursor: pointer;
      padding: 2px 2px 0;
      margin-left: 2px;
      font-size: 0.8rem;
      height: 100%;
    }
  }
`;

const ToolBar: React.FC<{
  style?: React.CSSProperties;
  className?: string;
  draggableProps?: any;
  uuid: string;
  [key: string]: any;
}> = ({ draggableProps, uuid, ...props }) => {
  const { deleteContentById, currentId } = usePlaygroundContext();
  return (
    <div {...props} style={{ display: currentId === uuid ? '' : 'none' }}>
      <DeleteIcon
        style={{ backgroundColor: theme.color.dangerouns }}
        onClick={() => {
          deleteContentById(uuid);
        }}
      />
      <DragIcon {...draggableProps} />
    </div>
  );
};

export const Block = React.forwardRef<HTMLDivElement, Props>(({ children, uuid, index, ...otherProps }, ref) => {
  const { currentId, setCurrentId } = usePlaygroundContext();

  return (
    <div>
      <BlockWrapper
        className={currentId === uuid ? 'active' : ''}
        onClick={() => {
          setCurrentId(uuid);
        }}
      >
        <div className="-container">{children}</div>
        <ToolBar className="-tool-bar" uuid={uuid} />
      </BlockWrapper>
    </div>
  );
});
