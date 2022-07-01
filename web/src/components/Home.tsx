import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home(props: any) {
  const getLastCommit = async (commitUrl: string) => {
    console.log(commitUrl);
    const response = await axios.get(commitUrl);
    console.log(response.data[0]);
    alert(response.data[0].author.login);
  };
  return (
    <div className="App">
      <div className="App">
        <button value="All" onClick={props.handleButton}>
          All
        </button>
        <button value="PHP" onClick={props.handleButton}>
          PHP
        </button>
        <button value="English" onClick={props.handleButton}>
          English
        </button>
        <button value="French" onClick={props.handleButton}>
          French
        </button>
        <button value="TypeScript" onClick={props.handleButton}>
          TypeScript
        </button>
      </div>
      {props.repos.length > 0 && (
        <div>
          {(props.repos as unknown as any[])
            .sort(function (a, b) {
              return (
                new Date(a.created_at).valueOf() -
                new Date(b.created_at).valueOf()
              );
            })
            .reverse()

            .map((x: any) => (
              <div
                onClick={() =>
                  getLastCommit(x.commits_url.split('{/sha}'[0]).slice(0, 1))
                }
                key={x.id}
                className="card"
              >
                <Link to="/repoinfo" key={x.id}>
                  {x.name}
                </Link>
                <p>{x.description}</p>
                <p>{x.language}</p>
                <p>{x.forks_count}</p>
                <p>{x.created_at}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
