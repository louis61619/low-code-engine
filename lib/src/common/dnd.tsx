// StrictModeDroppable.tsx
// Credits to https://github.com/GiovanniACamacho and https://github.com/Meligy for the TypeScript version
// Original post: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194
import React from 'react';
import { useEffect, useState } from 'react';
import { useDraggable, useDroppable, DropAnimation, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { PropsWithChildren } from 'react';
// import { Droppable, DroppableProps, Draggable } from 'react-beautiful-dnd';
// const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
//   const [enabled, setEnabled] = useState(false);
//   useEffect(() => {
//     const animation = requestAnimationFrame(() => setEnabled(true));
//     return () => {
//       cancelAnimationFrame(animation);
//       setEnabled(false);
//     };
//   }, []);
//   if (!enabled) {
//     return null;
//   }
//   return <Droppable {...props}>{children}</Droppable>;
// };

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const Droppable = ({ children, id, ...props }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return <div ref={setNodeRef}>{children}</div>;
};

const Draggable = ({ children, id, ...props }) => {
  const { listeners, setNodeRef, attributes } = useDraggable({
    id,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

interface Props {}

const Overlay = ({ children }: PropsWithChildren<Props>) => {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>;
};

export { Droppable, Draggable, dropAnimation, Overlay };
