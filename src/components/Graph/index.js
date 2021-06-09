import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styles from './graph.module.css';

const Graph = () => {
  const date = new Date().toLocaleDateString();
  const studentMarks = [
    {
      exam: '1st Internal',
      subject: 'CS 802D',
      percentage: 75.4,
      avg: 70,
      date
    },
    {
      exam: '1st Internal',
      subject: 'CS 803E',
      percentage: 71.8,
      avg: 77.2,
      date
    },
    {
      exam: '1st Internal',
      subject: 'CS 801A',
      percentage: 64,
      avg: 69,
      date
    },
    {
      exam: '1st Internal',
      subject: 'HU 801A',
      percentage: 82,
      avg: 80,
      date
    },
    {
      exam: 'Practical',
      subject: 'CS 792D',
      percentage: 70,
      avg: 70.8,
      date
    },
    {
      exam: 'Practical',
      subject: 'CS 791A',
      percentage: 62,
      avg: 58.75,
      date
    },
    {
      exam: '1st Internal',
      subject: 'CS 702D',
      percentage: 45,
      avg: 62,
      date
    }
  ];
  const getExamData = (data) => {
    const { exam, subject, date } = data;
    return `${subject},${exam},${date}`;
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={studentMarks}
        margin={{
          top: 30,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <defs>
          <linearGradient id="student" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="avg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis
          dataKey={getExamData}
          tickLine={false}
          tick={<CustomAxisTick />}
        />
        <YAxis tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="avg"
          stroke="#82ca9d"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#avg)"
        />
        {/* <Area type="monotone" dataKey="percentage" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#student)" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;

const CustomAxisTick = ({ x, y, payload }) => {
  const date = payload.value.split(',')[2];
  return (
    <foreignObject x={x} y={y} className={styles.tickWrapper}>
      <div xmlns="http://www.w3.org/1999/xhtml" className={styles.tick}>
        <p>{date}</p>
      </div>
    </foreignObject>
  );
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    const [subject, exam] = label.toString().split(',');
    return (
      <div className={styles.customTooltip}>
        <p className={styles.marks}>{`Marks : ${payload[0].value} %`}</p>
        {/* <p className={styles.marks}>{`Average : ${payload[1].value} %`}</p> */}
        <p>Subject: {subject}</p>
        <p>{exam}</p>
      </div>
    );
  }

  return null;
};
