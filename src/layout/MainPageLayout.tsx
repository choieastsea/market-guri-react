import { Container, Link, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../recoil/recoil';
import { logout } from '../utils/session';
import { useEffect } from 'react';

export const MainPageLayout = () => {
  const navigate = useNavigate();

  // 인증 여부를 확인
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
    // console.log(authenticated);
  }, [authenticated]);
  return (
    <Container>
      {/* title */}
      <Typography variant="h2" gutterBottom>
        MARKET GURI
      </Typography>
      <Typography gutterBottom>
        {authenticated ? (
          <Link onClick={onClickLogout}>로그아웃</Link>
        ) : (
          <Link href="login">로그인</Link>
        )}
      </Typography>
      {/* nav bar */}
      {/* content */}
      <Outlet />
      {/* footer */}
    </Container>
  );
};
