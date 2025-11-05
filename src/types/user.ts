export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

export type SortField = keyof Omit<User, 'company'> | 'companyName';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

