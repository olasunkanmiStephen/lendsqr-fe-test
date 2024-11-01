import React from 'react';
import styles from '../../styles/UserFilter.module.scss';

interface FilterProps {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

const UserFilter: React.FC<FilterProps> = ({
  organization,
  username,
  email,
  date,
  phoneNumber,
  status,
  setFilter,
  resetFilters,
}) => (
  <div className={styles['user-filter']}>
    <select value={organization} onChange={(e) => setFilter('organization', e.target.value)}>
      <option value="">Organization</option>
      <option value="Org1">Org1</option>
      <option value="Org2">Org2</option>
    </select>
    <input
      type="text"
      value={username}
      onChange={(e) => setFilter('username', e.target.value)}
      placeholder="Username"
    />
    <input
      type="text"
      value={email}
      onChange={(e) => setFilter('email', e.target.value)}
      placeholder="Email"
    />
    <input
      type="date"
      value={date}
      onChange={(e) => setFilter('date', e.target.value)}
    />
    <input
      type="text"
      value={phoneNumber}
      onChange={(e) => setFilter('phoneNumber', e.target.value)}
      placeholder="Phone Number"
    />
    <select value={status} onChange={(e) => setFilter('status', e.target.value)}>
      <option value="">Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
      <option value="Pending">Pending</option>
      <option value="Blacklisted">Blacklisted</option>
    </select>
    <div className={styles['button-group']}>
      <button className={styles['reset-button']} onClick={resetFilters}>Reset</button>
      <button className={styles['filter-button']}>Filter</button>
    </div>
  </div>
);

export default UserFilter;
