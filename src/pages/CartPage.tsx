import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../recoil/recoil';
import { useNavigate } from 'react-router-dom';
import { AxiosGet } from '../utils/fetch';
import { AxiosError } from 'axios';
import { CartInfo } from '../utils/model';
import { Box, Card, Container, Typography } from '@mui/material';

export const CartPage = () => {
  const authenticated = useRecoilValue<boolean>(isAuthenticated);
  const navigate = useNavigate();
  const [carts, setCarts] = useState<CartInfo[]>([]);
  useEffect(() => {
    if (!authenticated) {
    } else {
      //get cart info
      getCartInfo();
    }
  }, [authenticated]);

  const getCartInfo = async () => {
    try {
      const { data } = await AxiosGet().get('cart/basic/');
      //   console.log(data);
      setCarts(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e?.response?.status === 403) {
          const moveToLogin = window.confirm('권한이 없습니다. 로그인 페이지로 넘어가겠습니까?');
          if (moveToLogin) {
            navigate('/login');
          }
        }
      } else {
        alert('서버에 오류가 발생했습니다');
      }
    }
  };
  return (
    <Container>
      {carts.map((cartInfo) => (
        <Card key={cartInfo.id} sx={{ p: 2, m: 2 }}>
          <Typography variant='h6'>{cartInfo.item.name}</Typography>
          <Typography>개당 {cartInfo.item.price}원</Typography>
          <Typography>{cartInfo.amount}개</Typography>
          <Typography>총 {cartInfo.total_price}원</Typography>
          <Typography>현재 해당 수량만큼 {cartInfo.is_available_now ? '가능' : '불가'}</Typography>
        </Card>
      ))}
    </Container>
  );
};
