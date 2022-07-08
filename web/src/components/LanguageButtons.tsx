import { Box, Button } from '@mui/material';

export default function LanguageButtons(props: any) {
  const languages = ['All', 'PHP', 'TypeScript', 'English', 'French'];

  return (
    <Box display="flex" justifyContent="space-evenly" flexDirection="row" m={2}>
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
  );
}
