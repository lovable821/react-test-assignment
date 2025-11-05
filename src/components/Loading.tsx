import './Loading.css';

export const Loading = () => {
  return (
    <div className="loading-container" role="status" aria-label="Loading">
      <div className="spinner"></div>
      <p className="loading-text">Loading users...</p>
    </div>
  );
};

