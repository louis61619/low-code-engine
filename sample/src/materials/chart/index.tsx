import * as echarts from 'echarts';
import { CompInfoType, ConfigCompProps, ViewCompProps } from '@l-lib/low-code-engine';
import { useEffect, useRef, useState } from 'react';

type ConfigType = {
  tShirtSalesVolume: number;
};

const View: ViewCompProps<ConfigType> = ({ configValue }) => {
  const container = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  useEffect(() => {
    const myChart = echarts.init(container.current);
    setChart(myChart);
    myChart.setOption({
      title: {
        text: 'chart sample',
      },
      tooltip: {},
      xAxis: {
        data: ['T-shirt', 'Jacket', 'Dress', 'Jeans', 'Coat'],
      },
      yAxis: {},
    });
  }, []);

  useEffect(() => {
    if (!chart) return;
    chart.setOption({
      series: [
        {
          name: 'Sales volume',
          type: 'bar',
          data: [configValue.tShirtSalesVolume, 20, 36, 10, 5],
        },
      ],
    });
  }, [chart, configValue]);
  return <div style={{ height: 500, width: '100%' }} ref={container}></div>;
};

const Config: ConfigCompProps<ConfigType> = ({ configValue, onUpdate }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      onUpdate({ tShirtSalesVolume: 5 });
    }
  }, [onUpdate, firstLoad]);

  return (
    <div>
      <div>T-shirt</div>
      <input
        value={configValue.tShirtSalesVolume}
        onChange={(e) => {
          onUpdate({ tShirtSalesVolume: e.target.value ? Number(e.target.value) : undefined });
        }}
      />
    </div>
  );
};

export const chartCompInfo: CompInfoType<ConfigType> = {
  type: 'chart',
  name: 'chart',
  group: 'custom',
  view: View,
  config: Config,
};
