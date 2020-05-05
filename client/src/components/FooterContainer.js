import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.foreground};
    border-radius: 5px;
    margin-top: 20px;
    height: 250px;
    color: ${props => props.theme.normalText};
    padding: 4px;
`


const FooterContainer = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Seenit</Typography>
          <Typography variant="body2">About</Typography>
          <Typography variant="body2">Careers</Typography>
          <Typography variant="body2">Press</Typography>
          <Typography variant="body2">Advertise</Typography>
          <Typography variant="body2">Blog</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Using Seenit</Typography>
          <Typography variant="body2">Help</Typography>
          <Typography variant="body2">Seenit App</Typography>
          <Typography variant="body2">Seenit Coins</Typography>
          <Typography variant="body2">Seenit Premium</Typography>
          <Typography variant="body2">Seenit Gifts</Typography>
          <Typography variant="body2">Communities</Typography>
          <Typography variant="body2">Top Posts</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">Terms | Content Policy | Privacy Policy | Mod Policy</Typography>
          <Typography variant="body2">Seenit 2019. All rights reserved</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FooterContainer;