import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import RepoModal from './components/RepoModal';
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
        // console.log(res);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            error ? (
              <div>
                <p>terrible function ran</p>
              </div>
            ) : (
              <Home repos={filterLanguage} handleButton={handleButton} />
            )
          }
        />
        <Route path="/repoinfo" element={<RepoModal repos={repos} />} />
      </Routes>
    </BrowserRouter>
  );
}
