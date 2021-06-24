import styles from './dashboard.module.css';

const TeacherDashboard = ({ userData }) => {
  return (
    <main className={styles.dashboard}>
      <section className="mb-4">
        <h2>Welcome,</h2>
        <h1>{userData.name}.</h1>
      </section>
    </main>
  );
};

export default TeacherDashboard;
