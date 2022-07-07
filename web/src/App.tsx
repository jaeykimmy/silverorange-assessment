import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

import Home from './components/Home';

import './App.css';

export function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState<string[]>([]);

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setError(false);
        setRepos(res.data);
        setFilterLanguage(res.data);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleButton = (e: any) => {
    if (e.target.value === 'All') {
      setFilterLanguage(repos);
    } else {
      setFilterLanguage(
        repos.filter((x: any) => x.language === e.target.value)
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {error ? (
        <div>
          <h1>There was an error!</h1>
          <Button onClick={refreshPage}>Refresh</Button>
        </div>
      ) : (
        <Home repos={filterLanguage} handleButton={handleButton} />
      )}
    </div>
  );
}
