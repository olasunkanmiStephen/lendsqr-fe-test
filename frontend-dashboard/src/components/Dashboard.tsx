import React, { useEffect, useState } from 'react';
import Sidebar from './mincomponents/Sidebar';
import Header from './mincomponents/Header';
import StatsCard from './mincomponents/StatsCard';
import UsersTable from './mincomponents/UsersTable';
import styles from '../styles/Dashboard.module.scss';
import { FaUser, FaUserCheck, FaClipboardList, FaPiggyBank } from 'react-icons/fa';
import { fetchUsers } from '../services/api';
import UserDetail from './UserDetails';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        if (users.length > 0) {
          setUser({ username: users[0].username });
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false); 
      }
    };

    getUserData();
  }, []);

  return (
    <div className={styles.dashboard}>
      {user && <Header user={user} />}
      <main>
        <Sidebar />
        <div className={styles.m_center}>
          {loading ? (
            <p>Loading users...</p>
          ) : selectedUser ? (
            <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />
          ) : (
            <>
              <section className={styles.stats}>
                <StatsCard title="Users" count={2453} icon={<FaUser />} />
                <StatsCard title="Active Users" count={2453} icon={<FaUserCheck />} />
                <StatsCard title="Users with Loans" count={12453} icon={<FaClipboardList />} />
                <StatsCard title="Users with Savings" count={102453} icon={<FaPiggyBank />} />
              </section>
              <UsersTable onSelectUser={setSelectedUser} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
