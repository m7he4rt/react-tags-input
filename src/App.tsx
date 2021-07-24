import React from 'react';
import { Card, CardMedia, Box, makeStyles, CssBaseline } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import TagsInput from '@/components/TagInput';
import ListEmails from './components/ListEmails';

import { emails } from '@/mock/emails'
import { TagProvider } from '@/context/TagContext';

const useStyles = makeStyles({
  root: {
    backgroundColor: grey[200],
    width: '100vw',
    minHeight: '100vh',
  },
  card: {
    width: 'clamp(0px, 645px, 800px)',
    padding: 60,
  },
  media: {
    height: 'clamp(0px, 145px, 190px)',
    marginBottom: 30,
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <CssBaseline />
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://www.rarolabs.com.br/img/logo_raro.svg"
          title="Logo Raro Labs"
        />

        <TagProvider>
          <TagsInput
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="Add your emails"
            label="Email"
            tags={emails}
          />

          <ListEmails />
        </TagProvider>
      </Card>
    </Box>
  );
}

export default App;