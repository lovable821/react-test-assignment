import type { User, SortField, SortConfig } from '../types/user';

export const getSortValue = (user: User, field: SortField): string | number => {
  if (field === 'companyName') {
    return user.company.name.toLowerCase();
  }
  const value = user[field];
  return typeof value === 'string' ? value.toLowerCase() : value;
};

export const sortUsers = (users: User[], sortConfig: SortConfig): User[] => {
  const sorted = [...users].sort((a, b) => {
    const aValue = getSortValue(a, sortConfig.field);
    const bValue = getSortValue(b, sortConfig.field);

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
};

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) {
    return users;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return users.filter((user) => {
    return (
      user.id.toString().includes(lowerSearchTerm) ||
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.username.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.phone.toLowerCase().includes(lowerSearchTerm) ||
      user.company.name.toLowerCase().includes(lowerSearchTerm)
    );
  });
};

