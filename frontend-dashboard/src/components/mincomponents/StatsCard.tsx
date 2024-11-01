import React from 'react';
import styles from '../../styles/StatsCard.module.scss';

interface StatsCardProps {
  title: string;
  count: number;
  icon: JSX.Element;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{count.toLocaleString()}</p>
    </div>
  );
};

export default StatsCard;
