import { Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainPageLayout = () => {
  return (
    <Container>
      {/* title */}
      <Typography variant="h2">MARKET GURI</Typography>
      {/* nav bar */}
      {/* content */}
      <Outlet />
      {/* footer */}
    </Container>
  );
};
