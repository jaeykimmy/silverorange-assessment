import React from 'react';
import axios from 'axios';
import RepoModal from './RepoModal';
import { useState, useEffect } from 'react';

export default function Home(props: any) {
  const [commitData, setCommitData] = useState({});
  const [url, setUrl] = useState('');
  useEffect(() => {
    async function anyNameFunction() {
      await getLastCommit(url);
    }
    anyNameFunction();
  }, [url]);
  const getLastCommit = async (commitUrl: string) => {
    console.log(commitUrl);
    setUrl(commitUrl);
    const response = await axios.get(commitUrl);
    console.log(response.data[0]);
    setCommitData(response.data[0].commit);
    // alert(
    //   `${response.data[0].commit.author.name}\n
    //   ${response.data[0].commit.message}\n
    //   ${response.data[0].commit.author.date}`
    // );
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
                <h2>{x.name}</h2>

                <p>{x.description}</p>
                <p>{x.language}</p>
                <p>{x.forks_count}</p>
                <p>{x.created_at}</p>
                <RepoModal commitData={commitData} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
