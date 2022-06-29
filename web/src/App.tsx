import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

export function App() {
  const [repos, setRepos] = useState('');

  useEffect(() => {
    getRepos();
  }, []);

  const getRepos = () => {
    axios.get('http://localhost:4000/repos').then((res) => {
      console.log(res);
      setRepos(res.data);
    });
  };
  console.log(repos);
  return (
    <div className="App">
      {repos && (
        <div>
          {(repos as unknown as any[]).map((x: any) => (
            <div key={x.id}>{x.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
