import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DndContext } from '@dnd-kit/core';
import { CompInfoType, Schema } from '../types/schema';
import { genUUID } from '../utils/gen-uuid';
import { getKeepKeyToIdMap, isFromToolbar } from '../utils/handle-schema';

type PlaygroundProviderProps = {
  schema: Schema;
  setSchema: ((value: Schema) => void) | undefined;
  list: CompInfoType[];
};

type ContextType = {
  compsMap: { [key: string]: CompInfoType };
  currentId: string;
  setCurrentId: (id: string) => void;
  keyToContentMap: { [key: string]: Schema };
  updateConfigValueById: (value: any, id: string) => void;
  deleteContentById: (id: string) => void;
  initId: string;
  setInitId: (id: string) => void;
  onDragId: string;
} & PlaygroundProviderProps;

const reorder = (list: string[] = [], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const addPropertiesToContent = (content: Schema, type: string) => {
  if (!content.properties) {
    content.properties = {};
    content.order = [];
  }
  const compKey = genUUID(type);
  const newContent = { type };
  content.properties[compKey] = newContent;
  return compKey;
};

export const PlaygroundContext = createContext<ContextType>({
  schema: { type: 'object' },
  setSchema: () => {},
  list: [],
  compsMap: {},
  currentId: '',
  setCurrentId: () => {},
  keyToContentMap: {},
  updateConfigValueById: () => {},
  deleteContentById: () => {},
  initId: '',
  onDragId: '',
  setInitId: () => {},
});

export const PlaygroundProvider: React.FC<PlaygroundProviderProps & { children: React.ReactNode }> = ({
  children,
  schema,
  setSchema,
  list,
  ...props
}) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [initId, setInitId] = useState<string>('');
  const [onDragId, setOnDragId] = useState<string>('');

  useEffect(() => {
    if (!currentId && schema.order && schema.order.length) {
      setCurrentId(schema.order[0]);
    }
  }, [currentId, schema.order]);

  const compsMap: { [key: string]: CompInfoType } = useMemo(() => {
    return list.reduce((pre, cur) => {
      return {
        ...pre,
        [cur.type]: cur,
      };
    }, {});
  }, [list]);

  const { keyMap: keyToContentMap, keyRelationMap } = useMemo(() => {
    return getKeepKeyToIdMap(schema);
  }, [schema]);

  const updateConfigValueById = useCallback(
    (value: any, id: string) => {
      keyToContentMap[id].configValue = value;
      setSchema?.({ ...schema });
    },
    [keyToContentMap, schema, setSchema],
  );

  const deleteContentById = useCallback(
    (id: string) => {
      const parent = keyRelationMap[id].parent;
      if (!parent.order || !parent.properties) return;

      delete parent.properties[id];
      parent.order = parent.order.filter((contentId: string) => contentId !== id);

      setSchema?.({ ...schema });
    },
    [keyRelationMap, schema, setSchema],
  );

  return (
    <PlaygroundContext.Provider
      value={{
        schema,
        setSchema,
        list,
        compsMap,
        ...props,
        currentId,
        setCurrentId,
        keyToContentMap,
        updateConfigValueById,
        deleteContentById,
        initId,
        setInitId,
        onDragId,
      }}
    >
      <DndContext
        onDragStart={(res) => {
          const { active } = res;
          const { id } = active;
          if (isFromToolbar(id)) {
            setOnDragId(isFromToolbar(id));
          }
          // console.log(res.active.id, '---res');
        }}
        onDragOver={(res) => {
          const { active } = res;
          const { id } = active;
          // if (isFromToolbar(id)) {
          //   console.log(id, '---id');
          // }
        }}
        onDragEnd={(res) => {
          const { over, active } = res;

          // We dropped outside of the over so clean up so we can start fresh.
          if (!over) {
            return;
          }

          const toolbarId = isFromToolbar(active.id);
          if (toolbarId) {
            console.log(active.id, '---over.id');
            const content = schema;
            const compKey = addPropertiesToContent(content, toolbarId);
            content.order?.splice(0, 0, compKey);
            setCurrentId(compKey);
            setInitId(compKey);
          }
          // console.log(res, '---res');
          // const { source, destination, draggableId } = res;
          // if (!destination) {
          //   return;
          // }
          // if (/^\[bar\]/.test(source.droppableId) && destination?.droppableId) {
          //   // from toolbar
          //   const content = schema;
          //   const compKey = addPropertiesToContent(content, draggableId);
          //   content.order?.splice(destination.index, 0, compKey);
          //   setCurrentId(compKey);
          //   setInitId(compKey);
          // } else {
          //   schema.order = reorder(schema.order, source.index, destination.index);
          // }
          console.log(schema, '---schema');
          setSchema?.({ ...schema });
        }}
      >
        {children}
      </DndContext>
    </PlaygroundContext.Provider>
  );
};

export const usePlaygroundContext = () => {
  const context = useContext(PlaygroundContext);

  return context;
};
