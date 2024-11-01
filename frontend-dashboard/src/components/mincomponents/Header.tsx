import React from 'react';
import styles from '../../styles/Header.module.scss';

interface User {
  username: string;
  image?: string;
}

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Group.svg" alt="Logo" />
      </div>
      <input type="text" placeholder="Search for anything" />
      <div className={styles.profile}>
        <span>Docs</span>
        <div className={styles.avatar}>
          {user.image ? (
            <img src={user.image} alt="User Avatar" />
          ) : (
            <span>{user.username.charAt(0)}</span>
          )}
        </div>
        <p>{user.username}</p>
      </div>
    </header>
  );
};

export default Header;
