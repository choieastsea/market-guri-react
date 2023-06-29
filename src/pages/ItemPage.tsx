import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosGet, AxiosPost } from '../utils/fetch';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ItemDetail, ItemQNA } from '../utils/model';
import { AxiosError } from 'axios';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const item_code = searchParams.get('item_code');

  const [error, setError] = useState(false);
  const [itemInfo, setItemInfo] = useState<ItemDetail>();
  const [itemQNAInfo, setItemQNAInfo] = useState<ItemQNA[]>();
  const [tabValue, setTabValue] = useState(0);

  const [itemCount, setItemCount] = useState(1);

  const fetchItemInfo = async (item_code: string | null) => {
    if (item_code) {
      const { data } = await AxiosGet().get(`/item/basic/${item_code}/`);
      setItemInfo(data);
    } else {
      throw new Error('item_code is null');
    }
  };
  const fetchItemQNA = async (item_code: string | null) => {
    if (item_code) {
      const { data } = await AxiosGet().get(`/qna/answer/?item_code=${item_code}`);
      setItemQNAInfo(data);
    } else {
      throw new Error('item_code is null');
    }
  };
  const onClickCart = async () => {
    //itemCode & itemCount
    try {
      const { data } = await AxiosPost().post('/cart/basic/', {
        item: item_code,
        amount: itemCount,
      });
      console.log(data);
      const moveToCart = window.confirm(
        `장바구니에 ${itemCount}개 추가 되었습니다. 장바구니로 이동하시겠습니까?`
      );
      if (moveToCart) {
        navigate('/cart');
      }
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
  useEffect(() => {
    // item info, qna
    try {
      fetchItemInfo(item_code);
      fetchItemQNA(item_code);
    } catch (e) {
      setError(true);
    }
  }, [item_code]);
  return (
    <Container>
      {itemInfo && (
        <Stack>
          <Grid container spacing={2}>
            <Grid item>
              <img src={'http://via.placeholder.com/640x480'} alt="img" />
            </Grid>
            <Grid item>
              <Typography variant="h3" mb={10}>
                {itemInfo.name}
              </Typography>
              <Typography gutterBottom>{itemInfo.price}원</Typography>
              <Typography color={'gray'} mb={5}>
                구매가능수량 {itemInfo.stock_count}개
              </Typography>
              <OutlinedInput
                type="number"
                value={itemCount}
                onChange={(e) => setItemCount(parseInt(e.target.value))}
                endAdornment={'개'}
                sx={{ mb: 3 }}
              />
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="outlined" onClick={onClickCart}>
                    장바구니
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined">구매하기</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} centered>
              <Tab label="상세 설명" />
              <Tab label="QNA" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {/* 상세 설명 */}
            {itemInfo.description.length === 0 ? '상세설명이 없습니다' : itemInfo.description}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {/* QNA */}
            {itemQNAInfo?.map((qna) => (
              <Card key={qna.id} sx={{ p: 2, mb: 2, border: '1px solid #E2E2E2' }} elevation={0}>
                <Typography variant="h5" gutterBottom>
                  {qna.question.title}
                </Typography>
                <Typography>{qna.question.content}</Typography>
                <Typography>↩︎{qna.answer}</Typography>
              </Card>
            ))}
          </TabPanel>
        </Stack>
      )}
      {error && <Typography>에러</Typography>}
    </Container>
  );
};
