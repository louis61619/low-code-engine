import { CompInfoType, ConfigCompProps, ViewCompProps } from '@l-lib/low-code-engine';

type ConfigType = {
  value: string;
};

const View: ViewCompProps<ConfigType> = ({ configValue }) => {
  return <div>{configValue.value || 'text'}</div>;
};

const Config: ConfigCompProps<ConfigType> = ({ configValue, onUpdate }) => {
  return (
    <input
      type="text"
      value={configValue.value || 'text'}
      onChange={(e) => {
        onUpdate({ value: e.target.value });
      }}
    />
  );
};

export const textCompInfo: CompInfoType<ConfigType> = {
  type: 'text',
  name: 'text',
  group: 'basic',
  view: View,
  config: Config,
};
