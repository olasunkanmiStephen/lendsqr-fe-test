import React from 'react';
import styles from '../../styles/.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';


interface UserActionsDropdownProps {
  userId: string;
  onActionSelect: (userId: string, action: string) => void;
}

const UserActionsDropdown: React.FC<UserActionsDropdownProps> = ({ userId, onActionSelect }) => {
  return (
    <div className={styles.dropdown}>
      <button onClick={() => onActionSelect(userId, 'active')}>
        <FontAwesomeIcon icon={faUserCheck} /> Activate User
      </button>
      <button onClick={() => onActionSelect(userId, 'blacklisted')}>
        <FontAwesomeIcon icon={faUserSlash} /> Blacklist User
      </button>
      <button onClick={() => onActionSelect(userId, 'view')}>
        <FontAwesomeIcon icon={faEye} /> View Details
      </button>
    </div>
  );
};

export default UserActionsDropdown;
