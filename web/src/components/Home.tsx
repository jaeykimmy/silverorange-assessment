import axios from 'axios';
import RepoModal from './RepoModal';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
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
  const languages = ['All', 'PHP', 'TypeScript', 'English', 'French'];
  return (
    <div className="App">
      <h2>silverorange Intermediate Developer Assessment</h2>
      <div className="App">
        Filter by Language
        <Box
          display="flex"
          justifyContent="space-evenly"
          flexDirection="row"
          m={2}
        >
          {languages.map((language) => (
            <Button
              variant="contained"
              value={language}
              onClick={props.handleButton}
              key={language}
            >
              {language}
            </Button>
          ))}
        </Box>
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
              <Box key={x.id} m={2} pt={3}>
                <Card key={x.id} className="card" variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {x.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {x.language}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      {x.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      Forks: {x.forks_count}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      Created at: {x.created_at}
                    </Typography>
                    {(x.language === 'PHP' || x.language === 'TypeScript') && (
                      <div
                        onClick={() => {
                          getLastCommit(
                            x.commits_url.split('{/sha}'[0]).slice(0, 1)
                          );
                          getReadMe(x.full_name);
                        }}
                      >
                        <RepoModal
                          commitData={commitData}
                          readMe={readMe}
                          getLastCommit={getLastCommit}
                          getReadMe={getReadMe}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
        </div>
      )}
    </div>
  );
}
