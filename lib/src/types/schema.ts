import React from 'react';

export type Schema = {
  type: string;
  title?: string;
  description?: string;
  properties?: Properties;
  order?: string[];
  configValue?: any;
} & { [key: string]: any };

export type Properties = {
  [key: string]: Schema;
};

export type ViewProps<D> = {
  uuid: string;
  configValue: Partial<D>;
} & { [key: string]: any };

export type ConfigProps<D> = {
  onUpdate: (data: Partial<D>) => void;
  configValue: Partial<D>;
  type: string;
  isInit: boolean;
  uuid: string;
};

export type ConfigCompProps<D = {}> = React.ComponentType<ConfigProps<D>>;

export type ViewCompProps<D = {}> = React.ComponentType<ViewProps<D>>;

/**
 * @desc config type use in schema, type must be only
 */
export type CompInfoType<D = {}> = {
  prefix?: JSX.Element;
  name: string;
  group?: string;
  type: string;
  view: ViewCompProps<D>;
  config: ConfigCompProps<D>;
};
