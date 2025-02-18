import React from 'react';
import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { usePlaygroundContext } from './context';
import { RenderSchema } from './render';

const CanvasWrapper = styled.div`
  padding: 8px;
  flex: 1;
  overflow-y: auto;

  /* & > div {
    min-height: 100%;
  } */
`;

export const Canvas = () => {
  const { schema } = usePlaygroundContext();

  const { setNodeRef } = useDroppable({
    id: 'canvas_droppable',
    data: {
      parent: null,
      isContainer: true,
    },
  });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  // };

  return (
    // <CanvasWrapper>
    //   <Droppable droppableId="canvas">
    //     {(provided, snapshot) => {
    //       return (
    //         <div ref={provided.innerRef} {...provided.droppableProps}>
    //           {/* <RenderSchema schema={schema} /> */}
    //           {provided.placeholder}
    //         </div>
    //       );
    //     }}
    //   </Droppable>
    // </CanvasWrapper>
    <SortableContext strategy={verticalListSortingStrategy} items={schema?.order || []}>
      <CanvasWrapper ref={setNodeRef}>
        <RenderSchema schema={schema} />
      </CanvasWrapper>
    </SortableContext>
  );
};
