import { Typography, Box, Card, CardContent } from '@mui/material';

import RepoModal from './RepoModal';
export default function RepoInfo(props: any) {
  return (
    <Box key={props.repo.id} m={2} pt={3}>
      <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {props.repo.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.repo.language}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {props.repo.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Forks: {props.repo.forks_count}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Created at: {props.repo.created_at}
          </Typography>
          {(props.repo.language === 'PHP' ||
            props.repo.language === 'TypeScript') && (
            <div
              onClick={() => {
                props.getLastCommit(
                  props.repo.commits_url.split('{/sha}'[0]).slice(0, 1)
                );
                props.getReadMe(props.repo.full_name);
              }}
            >
              <RepoModal
                commitData={props.commitData}
                readMe={props.readMe}
                getLastCommit={props.getLastCommit}
                getReadMe={props.getReadMe}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
