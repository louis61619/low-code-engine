import styled from '@emotion/styled';
import React, { forwardRef, useMemo, useRef } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { usePlaygroundContext } from './context';
import { Droppable, Draggable, dropAnimation, Overlay } from '../common/dnd';
import { CompInfoType } from '../types/schema';
import { Title } from '../common/title';
import { isFromToolbar } from '../utils/handle-schema';

const ToolbarWrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.color.border};
  width: 250px;
  padding: 0 10px;

  & > div {
    margin-bottom: 8px;
  }

  .-btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .-icon-btn {
    cursor: grab;
  }
`;

const IconBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.border};
  padding: 8px 0;
  background-color: #fff;
  padding: 4px;

  :hover {
    border: 1px solid ${(props) => props.theme.color.primary};
  }

  .-icon {
    width: 20px;
    height: 20px;
  }

  .-txt {
    margin-left: 4px;
    white-space: nowrap;
    font-weight: normal;
  }
`;

const IconBlock = forwardRef<any, { comp: CompInfoType; style?: React.CSSProperties }>(({ comp, ...props }, ref) => {
  const { name } = comp;

  return (
    <IconBlockWrapper ref={ref} {...props}>
      <span className="-txt">{name}</span>
    </IconBlockWrapper>
  );
});

type GroupComponentsListType = { groupName: string; components: CompInfoType[] }[];

export const ToolBar = () => {
  const { list: componentList, onDragId } = usePlaygroundContext();
  const list = componentList.reduce((pre: GroupComponentsListType, cur) => {
    const _list = [...pre];
    const listItem = _list.find((item) => item.groupName === cur.group);
    if (listItem) {
      listItem.components.push(cur);
    } else {
      _list.push({
        groupName: cur.group || 'other',
        components: [cur],
      });
    }
    return _list;
  }, []);

  const overlayComp = useMemo(() => {
    const _onDragId = isFromToolbar(onDragId);
    if (!_onDragId) return null;
    return componentList.find((item) => item.type === _onDragId);
  }, [onDragId, componentList]);

  console.log(overlayComp, '---overlayComp');

  return (
    <>
      <ToolbarWrapper>
        {list.map((item, index) => {
          // const { type } = comp;

          return (
            <div key={index}>
              <Title>{item.groupName}</Title>
              <div>
                <div className="-btns">
                  {item.components.map((comp, index) => {
                    const { type, name } = comp;

                    return (
                      <div className="-icon-btn" key={'[bar]' + type}>
                        <Draggable id={'[bar]' + type}>
                          <IconBlock comp={comp} />
                        </Draggable>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </ToolbarWrapper>
      <DragOverlay dropAnimation={dropAnimation}>{overlayComp ? <IconBlock comp={overlayComp} /> : null}</DragOverlay>
    </>
  );
};
