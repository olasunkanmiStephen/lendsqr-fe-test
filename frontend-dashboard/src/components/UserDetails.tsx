import React from 'react'; 
import styles from '../styles/UserDetails.module.scss';

interface User {
  id: string;
  name: string;
  username: string;
  phonenumber: string;
  email: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  address: string;
  educationLevel: string;
  employmentStatus: string;
  employmentSector: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitterHandle: string;
  facebookHandle: string;
  instagramHandle: string;
  guarantorName: string;
  guarantorNumber: string;
  guarantorEmail: string;
  guarantorRelationship: string;
  accountBalance: string;
  bankName: string;
  bankAccountNumber: string;
  status: string;
  image: string;
}

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  return (
    <div className={styles.userDetails}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onClose}>Back to Users</button>
        <div>
        <h2>User Details</h2>
        <div className={styles.actionButtons}>
          <button className={styles.blacklistButton}>Blacklist User</button>
          <button className={styles.activateButton}>Activate User</button>
        </div>
        </div>
      </div>
      
      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user.image ? (
            <img src={user.image} alt="User Avatar" />
          ) : (
            <span>{user.username.charAt(0)}</span>
          )}</div>
          <div>
            <h3>{user.name}</h3>
          </div>
            <p>User's Tier: ⭐⭐</p>
          <div>
            <h3>#200,000</h3>
            <p>{user.bvn} / {user.username}</p>
          </div>
        </div>
        <div className={styles.tabs}>
          <button>General Details</button>
          <button>Documents</button>
          <button>Bank Details</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and System</button>
        </div>
      </div>

      <div className={styles.infoSections}>
        <section className={styles.section}>
          <h4>Personal Information</h4>
          <div className={styles.infoGrid}>
            <div><span>Full Name:</span> {user.name}</div>
            <div><span>Phone Number:</span> {user.phonenumber}</div>
            <div><span>Email Address:</span> {user.email}</div>
            <div><span>BVN:</span> {user.bvn}</div>
            <div><span>Gender:</span> {user.gender}</div>
            <div><span>Marital Status:</span> {user.maritalStatus}</div>
            <div><span>Children:</span> 3</div>
            <div><span>Type of Residence:</span> {user.address}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h4>Education and Employment</h4>
          <div className={styles.infoGrid}>
            <div><span>Level of Education:</span> B.Sc</div>
            <div><span>Employment Status:</span>Employed</div>
            <div><span>Sector of Employment:</span>Fintech</div>
            <div><span>Duration of Employment:</span>2 years</div>
            <div><span>Office Email:</span> {user.email}</div>
            <div><span>Monthly Income:</span> 200,000.00 - 400,000.00</div>
            <div><span>Loan Repayment:</span>40,000</div>
          </div>
        </section>

        <section className={styles.section}>
          <h4>Socials</h4>
          <div className={styles.infoGrid}>
            <div><span>Twitter:</span> {user.username}</div>
            <div><span>Facebook:</span> {user.username}</div>
            <div><span>Instagram:</span> {user.username}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h4>Guarantor</h4>
          <div className={styles.infoGrid}>
            <div><span>Full Name:</span> {user.guarantorName}</div>
            <div><span>Phone Number:</span> {user.guarantorNumber}</div>
            <div><span>Email Address:</span> {user.guarantorEmail}</div>
            <div><span>Relationship:</span>Sister</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
