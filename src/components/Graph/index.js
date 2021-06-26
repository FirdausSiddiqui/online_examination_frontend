import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { currentUser } from '../../selectors/appData';
import styles from './graph.module.css';

const Graph = ({ userData }) => {
  const getExamData = (data) => {
    const { subjectCode, date } = data;
    return `${subjectCode},${date}`;
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={userData?.marks}
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
        {/* <Area
          type="monotone"
          dataKey="avg"
          stroke="#82ca9d"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#avg)"
        /> */}
        <Area
          type="monotone"
          dataKey="mark"
          stroke="#8884d8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#student)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (store, props) => ({
  userData: currentUser(store, props)
});

export default connect(mapStateToProps, null)(Graph);

const CustomAxisTick = ({ x, y, payload }) => {
  const date = payload?.value.split(',')[1];
  return (
    <foreignObject x={x} y={y} className={styles.tickWrapper}>
      <div xmlns="http://www.w3.org/1999/xhtml" className={styles.tick}>
        <p>{date?.substr(0, 10)}</p>
      </div>
    </foreignObject>
  );
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    const [subject, date] = label.toString().split(',');
    return (
      <div className={styles.customTooltip}>
        <p className={styles.marks}>{`Marks : ${payload[0]?.value.toPrecision(
          4
        )} %`}</p>
        {/* <p className={styles.marks}>{`Average : ${payload[1].value} %`}</p> */}
        <p>Subject: {subject}</p>
        <p>{date.substr(0, 10)}</p>
      </div>
    );
  }

  return null;
};
