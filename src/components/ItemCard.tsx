import { Card, CardContent, Typography } from '@mui/material';
import { Item } from '../utils/model';

type props = {
  item: Item;
};
export const ItemCard = ({ item }: props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant='body1'>{item.name}</Typography>
        <Typography variant='body2'>
          {item.price}원 ({item.stock_count}개 남음)
        </Typography>
      </CardContent>
    </Card>
  );
};
