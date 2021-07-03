import { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './graph.module.css';

const ExamGraph = ({ examMarks }) => {
  const { dimensions } = useWindowDimensions();
  const isMobile = useMemo(() => {
    return dimensions.width <= 800;
  }, [dimensions.width]);
  return (
    <ResponsiveContainer width={isMobile ? '100%' : '95%'} height={400}>
      <ScatterChart
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: isMobile ? 0 : 10
        }}>
        <CartesianGrid opacity={0.6} />
        <XAxis
          axisLine={false}
          type="number"
          domain={['dataMin', 'dataMax']}
          dataKey="roll"
          name="Roll"
          unit=""
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          type="number"
          dataKey="mark"
          name="Marks"
          unit="%"
          tickLine={false}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip/>}  />
        <Scatter name="Marks" data={examMarks} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className={styles.customTooltip}>
        <p>{payload[0]?.payload.name}</p>
        <p>Roll: {payload[0]?.value}</p>
        <p className={styles.marks}>{`Marks : ${payload[0]?.payload.mark.toPrecision(4)} %`}</p>
      </div>
    );
  }

  return null;
};

export default ExamGraph;
