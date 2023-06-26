import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { ItemCard } from '../components/ItemCard';
import { AxiosGet } from '../utils/fetch';
import { ItemResult } from '../utils/model';
import { useEffect, useState } from 'react';

export const MainPage = () => {
  const [page, setPage] = useState(1);
  const [itemResult, setItemResult] = useState<ItemResult>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchItemPage(page);
  }, [page]);
  const fetchItemPage = async (page: number) => {
    try {
      const { data } = await AxiosGet().get(`item/basic/?page=${page}`);
      setItemResult(data);
    } catch (e) {
      setError(true);
    }
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {itemResult?.results?.map((item) => (
          <Grid item xs={12} md={4} key={item.item_id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
      {error && <Typography>ERROR</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={itemResult?.count ? parseInt((itemResult?.count / 10).toString()) + 1 : 0}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </Box>
    </Container>
  );
};
