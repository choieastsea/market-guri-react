import { Card, CardContent, Link, Typography } from '@mui/material';
import { Item } from '../utils/model';

type props = {
  item: Item;
};
export const ItemCard = ({ item }: props) => {
  return (
    <Link href={`detail?item_code=${item.item_id}`} style={{ textDecoration: 'none' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2">
            {item.price}원 ({item.stock_count}개 남음)
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
