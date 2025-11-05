import { useState, useMemo, useCallback, useEffect } from 'react';
import type { User, SortField, SortConfig } from '../types/user';
import { sortUsers, filterUsers } from '../utils/tableUtils';
import { debounce } from '../utils/debounce';
import './UserTable.css';

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'id',
    direction: 'asc',
  });

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    debouncedSetSearchTerm(inputValue);
  }, [inputValue, debouncedSetSearchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = filterUsers(users, searchTerm);
    return sortUsers(filtered, sortConfig);
  }, [users, searchTerm, sortConfig]);

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2 className="table-title">Users</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={inputValue}
            onChange={handleSearchChange}
            aria-label="Search users"
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="user-table" role="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {getSortIcon('id')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => handleSort('username')} className="sortable">
                Username {getSortIcon('username')}
              </th>
              <th onClick={() => handleSort('email')} className="sortable">
                Email {getSortIcon('email')}
              </th>
              <th onClick={() => handleSort('phone')} className="sortable">
                Phone {getSortIcon('phone')}
              </th>
              <th onClick={() => handleSort('companyName')} className="sortable">
                Company Name {getSortIcon('companyName')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-results">
                  No users found
                </td>
              </tr>
            ) : (
              filteredAndSortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                  </td>
                  <td>{user.company.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p className="results-count">
          Showing {filteredAndSortedUsers.length} of {users.length} users
        </p>
      </div>
    </div>
  );
};

