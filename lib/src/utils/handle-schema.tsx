import { Schema } from '../types/schema';

export function getKeepKeyToIdMap(schema: Schema) {
  if (!schema) {
    return {
      keyMap: {},
      keyRelationMap: {},
    };
  }
  const keyMap: { [key: string]: Schema } = {};
  const keyRelationMap: { [key: string]: Schema & { id: string; parent: Schema } } = {};

  function traversalSchema(schema: Schema) {
    if (!schema.order) return;
    for (let i = 0; i < schema.order.length; i++) {
      const key = schema.order[i];
      let content = schema.properties?.[key];
      if (content) {
        const relation = { id: key, parent: schema, ...content };
        keyMap[key] = content;
        keyRelationMap[key] = relation;
        traversalSchema(content);
      }
    }
  }
  traversalSchema(schema);

  return { keyMap, keyRelationMap };
}
