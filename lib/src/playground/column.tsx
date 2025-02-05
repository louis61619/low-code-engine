import React from 'react';
import { Droppable, Draggable } from '../common/dnd';
import { DragIcon } from '../common/icons';

interface ColumnProps {
  id: string;
}

interface ItemProps {
  text: string;
  index: number;
}

const Item: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div style={{ border: '1px solid', backgroundColor: 'gray' }}>{text}</div>
          <DragIcon {...provided.dragHandleProps} />
        </div>
      )}
    </Draggable>
  );
};

const Column: React.FC<ColumnProps> = ({ id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              // width: '100px',
              height: 300,
              border: '1px solid',
            }}
          >
            <Item text={id + '_jifjofwe'} index={0} />
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
