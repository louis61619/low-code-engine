import React, { useMemo, useState } from 'react';
import { CompInfoType, Schema } from '@l-lib/low-code-engine';
import { useForm } from '@mantine/form';

export const RenderSchema: React.FC<{ schema: Schema; list: CompInfoType[]; children: () => React.ReactElement }> = ({
  schema,
  list,
  children,
}) => {
  const compMap = useMemo(
    () =>
      list.reduce(
        (pre, item) => {
          if (item.type) {
            pre[item.type] = item;
          }
          return pre;
        },
        {} as { [key: string]: CompInfoType },
      ),
    [list],
  );

  return schema.order?.map((key) => {
    const field = schema.properties?.[key];
    if (field === undefined) return null;
    const Comp = compMap[field.type].view;

    return children();

    // return (
    //   <Comp
    //     key={key}
    //     configValue={field.configValue || {}}
    //     inputProps={{
    //       ...inputAction,
    //       value: values[key] || undefined,
    //     }}
    //   />
    // );
  });
};
