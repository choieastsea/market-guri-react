import { Container, Link, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticated } from '../recoil/recoil';
import { logout } from '../utils/session';
import { useEffect } from 'react';
import { getCSRF } from '../utils/fetch';

export const MainPageLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  useEffect(() => {
    // 주소 바뀔때마다 get_token
    getCSRF();
  }, [pathname]);

  return (
    <Container>
      {/* title */}
      <Typography
        variant="h2"
        gutterBottom
        onClick={() => {
          navigate('/');
        }}
        sx={{ cursor: 'pointer' }}
      >
        MARKET GURI
      </Typography>
      <Typography gutterBottom align="right">
        {authenticated ? (
          <>
            <Link href="cart" underline="hover">
              장바구니
            </Link>
            <br />
            <Link onClick={onClickLogout} underline="hover">
              로그아웃
            </Link>
          </>
        ) : (
          <Link href="login" underline="hover">
            로그인
          </Link>
        )}
      </Typography>
      {/* nav bar */}
      {/* content */}
      <Outlet />
      {/* footer */}
    </Container>
  );
};
