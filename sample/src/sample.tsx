import { useState } from 'react';
import { Playground, Schema } from '@l-lib/low-code-engine';
import { textCompInfo } from './materials/text';
import { chartCompInfo } from './materials/chart';

export function Sample() {
  const [schema, setSchema] = useState<Schema>();
  return <Playground schema={schema} setSchema={setSchema} list={[textCompInfo, chartCompInfo]} />;
}
