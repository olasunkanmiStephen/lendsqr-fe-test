import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import styles from "../../styles/UsersTable.module.scss";
import { fetchUsers } from "../../services/api";
import UserFilter from "./UserFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faEllipsisV,
  faEye,
  faUserSlash,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phonenumber: string;
  datejoined: string;
  status: string;
}

interface UsersTableProps {
  onSelectUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        const randomizedUsers = data.map((user: User) => ({
          ...user,
          status: randomStatus(),
        }));
        setUsers(randomizedUsers);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const randomStatus = (): string => {
    const statuses = ["inactive", "pending", "active"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const handleStatusChange = useCallback((userId: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    setSelectedUser(null); // Close dropdown after selection
  }, []);

  const handleViewDetailsClick = (user: User) => {
    onSelectUser(user);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = useMemo(() => users.slice(indexOfFirstUser, indexOfLastUser), [users, indexOfFirstUser, indexOfLastUser]);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setCurrentPage(i + 1)}
        className={currentPage === i + 1 ? styles.activePage : ""}
      >
        {i + 1}
      </button>
    ));
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case "active":
        return styles.active;
      case "inactive":
        return styles.inactive;
      case "pending":
        return styles.pending;
      default:
        return styles.default;
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={() => setShowFilter(!showFilter)}>
        <FontAwesomeIcon icon={faFilter} />{" "}
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>
      {showFilter && (
        <UserFilter
          {...filters}
          setFilter={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          resetFilters={() =>
            setFilters({
              organization: "",
              username: "",
              email: "",
              date: "",
              phoneNumber: "",
              status: "",
            })
          }
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ORGANIZATION</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>DATE JOINED</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className={selectedUser?.id === user.id ? styles.selectedRow : ""}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{new Date(user.datejoined).toLocaleDateString()}</td>
              <td className={getStatusClass(user.status)}>
                {user.status}
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  onClick={() => setSelectedUser(user)}
                  className={styles.icon}
                />
                {selectedUser?.id === user.id && (
                  <div ref={dropdownRef} className={styles.dropdown}>
                    <button onClick={() => handleViewDetailsClick(user)}>
                      <FontAwesomeIcon icon={faEye} /> View Details
                    </button>
                    <button onClick={() => handleStatusChange(user.id, "inactive")}>
                      <FontAwesomeIcon icon={faUserSlash} /> Blacklist User
                    </button>
                    <button onClick={() => handleStatusChange(user.id, "active")}>
                      <FontAwesomeIcon icon={faUserCheck} /> Activate User
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span>
          Showing{" "}
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>{" "}
          out of {users.length}
        </span>
        <div>{renderPageNumbers()}</div>
      </div>
    </div>
  );
};

export default UsersTable;
