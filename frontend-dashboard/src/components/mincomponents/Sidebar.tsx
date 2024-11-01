import React, { useState } from 'react';
import { FaUsers, FaUserShield, FaMoneyCheck, FaCogs, FaChartLine, FaFileInvoice, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import styles from '../../styles/Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <ul>
        <li><FaChevronRight /> <span>Switch Organization</span></li>
        <li><FaChartLine /><span>Dashboard</span></li>

        <li className={styles.sectionTitle}>CUSTOMERS</li>
        <li className={styles.indent}><p><FaUsers /></p> <span>Users</span></li>
        <li className={styles.indent}><p><FaUserShield /></p> <span>Guarantors</span></li>
        <li className={styles.indent}><p><FaMoneyCheck /></p> <span>Loans</span></li>
        <li className={styles.indent}><p><FaCogs /> </p><span>Decision Models</span></li>
        <li className={styles.indent}><p><FaMoneyCheck /></p> <span>Savings</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p> <span>Loan Requests</span></li>
        <li className={styles.indent}><p><FaUserShield /> </p><span>Whitelist</span></li>
        <li className={styles.indent}><p><FaCogs /></p> <span>Karma</span></li>

        <li className={styles.sectionTitle}>BUSINESSES</li>
        <li className={styles.indent}><p><FaCogs /></p><span>Organization</span></li>
        <li className={styles.indent}><p><FaMoneyCheck /></p><span>Loan Products</span></li>
        <li className={styles.indent}><p><FaMoneyCheck /></p><span>Savings Products</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p> <span>Fees and Charges</span></li>
        <li className={styles.indent}><p><FaChartLine /> </p><span>Transactions</span></li>
        <li className={styles.indent}><p><FaCogs /></p><span>Services</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p><span>Service Account</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p><span>Settlements</span></li>
        <li className={styles.indent}><p><FaChartLine /></p> <span>Reports</span></li>

        <li className={styles.sectionTitle}>SETTINGS</li>
        <li className={styles.indent}><FaCogs /> <span>Preferences</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p><span>Fees and Pricing</span></li>
        <li className={styles.indent}><p><FaFileInvoice /></p><span>Audit Logs</span></li>
        <li className={styles.indent}> <p><FaFileInvoice /></p><span>System Messages</span></li>

        <li><FaSignOutAlt /> <span>Logout</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
