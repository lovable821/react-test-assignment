import { useState, useEffect } from 'react';
import type { User } from '../types/user';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
}

const REMOTE_API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com/users';

async function fetchWithTimeout(resource: string, options: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 8000, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(resource, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const response = await fetchWithTimeout(REMOTE_API_URL, { timeoutMs: 8000 });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: User[] = await response.json();
          if (!isMounted) return;
          setUsers(data);
          return;
        } catch (networkErr) {
        }

        const localResponse = await fetch('/src/mock/users.json', { cache: 'no-store' });
        if (!localResponse.ok) {
          throw new Error(`Fallback load failed with status: ${localResponse.status}`);
        }
        const localData: User[] = await localResponse.json();
        if (!isMounted) return;
        setUsers(localData);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { users, loading, error };
};

