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

const ExamGraph = () => {
  const { dimensions } = useWindowDimensions();
  const isMobile = useMemo(() => {
    return dimensions.width <= 800;
  }, [dimensions.width]);
  const examMarks = [
    { name: 'Prasun', roll: 1, marks: 35 },
    { name: 'Soumya', roll: 3, marks: 38 },
    { name: 'Oheli', roll: 2, marks: 31 },
    { name: 'Spandan', roll: 4, marks: 33 },
    { name: 'Maharshi', roll: 5, marks: 29 },
    { name: 'Ayush', roll: 6, marks: 36.75 },
    { name: 'Ayush', roll: 7, marks: 42 },
    { name: 'Ayush', roll: 8, marks: 32 },
    { name: 'Ayush', roll: 9, marks: 38 },
    { name: 'Ayush', roll: 10, marks: 39.5 },
    { name: 'Ayush', roll: 11, marks: 43.8 },
    { name: 'Ayush', roll: 12, marks: 40.75 },
    { name: 'Ayush', roll: 13, marks: 29.75 },
    { name: 'Ayush', roll: 14, marks: 26.25 },
    { name: 'Ayush', roll: 15, marks: 30 },
    { name: 'Ayush', roll: 16, marks: 35.5 },
    { name: 'Ayush', roll: 17, marks: 37.8 },
    { name: 'Ayush', roll: 18, marks: 31 },
    { name: 'Ayush', roll: 19, marks: 40 },
    { name: 'Ayush', roll: 20, marks: 32.45 }
  ];
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
          dataKey="roll"
          name="Roll"
          unit=""
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          type="number"
          dataKey="marks"
          name="Marks"
          unit="%"
          tickLine={false}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Marks" data={examMarks} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ExamGraph;
