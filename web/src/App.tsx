import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import RepoInfo from './components/RepoInfo';
import './App.css';

export function App() {
  const [repos, setRepos] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState<string[]>([]);

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    axios.get('http://localhost:4000/repos').then((res) => {
      // console.log(res);
      setRepos(res.data);
    });
  };

  const handleButton = (e: any) => {
    console.log(e.target.value);

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
          element={<Home repos={filterLanguage} handleButton={handleButton} />}
        />
        <Route path="/repoinfo" element={<RepoInfo repos={repos} />} />
      </Routes>
    </BrowserRouter>
  );
}
