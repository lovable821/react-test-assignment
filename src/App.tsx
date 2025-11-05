import { useUsers } from './hooks/useUsers';
import { UserTable } from './components/UserTable';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import './App.css';

function App() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="app-container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Error
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <UserTable users={users} />
    </div>
  );
}

export default App;

