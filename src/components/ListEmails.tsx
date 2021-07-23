import React from 'react';
import { List, ListItemText, Grid } from '@material-ui/core';

import { useTag } from '@/context/TagContext';

const ListEmails = () => {
  const { items } = useTag();

  return (
    <List>
      <Grid container spacing={1}>
        {items.map(item => (
          <Grid item xs key={`key-${item.id}`}>
            <ListItemText 
              primary={item.email}
              secondary={`ID: ${item.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </List>
  )
}

export default ListEmails;