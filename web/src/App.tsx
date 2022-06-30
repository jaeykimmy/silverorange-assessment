import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import RepoInfo from './components/RepoInfo';
import './App.css';

export function App() {
  const [repos, setRepos] = useState('');

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    axios.get('http://localhost:4000/repos').then((res) => {
      // console.log(res);
      setRepos(res.data);
    });
  };
  // console.log(repos);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home repos={repos} />} />
        <Route path="/repoinfo" element={<RepoInfo repos={repos} />} />
      </Routes>
    </BrowserRouter>
  );
}
