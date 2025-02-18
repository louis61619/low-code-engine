import { Schema } from '../types/schema';
import { usePlaygroundContext } from './context';
import { Block } from './block';

type Props = {
  schema: Schema;
};

export const RenderSchema = ({ schema }: Props) => {
  const { compsMap } = usePlaygroundContext();

  return (
    <>
      {schema.order?.length
        ? schema.order.map((uuid, index) => {
            const content = schema.properties?.[uuid];
            if (!content) return null;
            const type = content.type;
            if (!type) return null;
            const compInfo = compsMap[type];
            if (!compInfo) return null;
            const Comp = compInfo.view;
            return (
              <Block uuid={uuid} index={index} key={uuid}>
                <Comp uuid={uuid} configValue={content.configValue || {}} />
              </Block>
            );
          })
        : null}
    </>
  );
};
