import axios from 'axios';
import { useState, useEffect } from 'react';
import LanguageButtons from './LanguageButtons';
import RepoInfo from './RepoInfo';

export default function Home(props: any) {
  const [commitData, setCommitData] = useState([]);
  const [url, setUrl] = useState('');
  const [readMe, setReadMe] = useState('');

  useEffect(() => {
    getLastCommit(url);
  }, [url]);

  const getLastCommit = async (commitUrl: string) => {
    setUrl(commitUrl);
    const response = await axios.get(commitUrl);

    setCommitData(response.data[0].commit);
  };
  const getReadMe = async (link: string) => {
    const response = await axios.get(
      `https://raw.githubusercontent.com/${link}/master/README.md`
    );
    setReadMe(response.data);
  };
  return (
    <div className="App">
      <h2>silverorange Intermediate Developer Assessment</h2>
      <div className="App">
        Filter by Language
        <LanguageButtons handleButton={props.handleButton} />
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
              <RepoInfo
                key={x.id}
                repo={x}
                getLastCommit={getLastCommit}
                getReadMe={getReadMe}
                commitData={commitData}
                readMe={readMe}
              />
            ))}
        </div>
      )}
    </div>
  );
}
