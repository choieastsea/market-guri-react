import { Container, Grid, Link, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { ItemCard } from '../components/ItemCard';
import { AxiosGet } from '../utils/fetch';
import { Item } from '../utils/model';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../recoil/recoil';
import { useEffect } from 'react';
import { logout } from '../utils/session';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  // 인증 여부를 확인
  const navigate = useNavigate();
  const authenticated = useRecoilValue<boolean>(isAuthenticated);
  const onClickLogout = async () => {
    try {
      await logout();
      alert('성공적으로 로그아웃되었습니다.');
      navigate(0);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

  // item 리스트를 가져온다
  const { isLoading, error, data } = useQuery<Item[]>(
    'todos',
    () =>
      AxiosGet()
        .get('item/basic/')
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: (data) => {
        // 성공시 호출
        console.log(data);
      },
      onError: (e) => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
        console.log(e);
      },
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <Container>
      <Typography gutterBottom>
        {authenticated ? (
          <Link onClick={onClickLogout}>로그아웃</Link>
        ) : (
          <Link href="login">로그인</Link>
        )}
      </Typography>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid item xs={12} md={4} key={item.item_id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
