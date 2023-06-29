import { Button, Container, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import { LoginInfo, LoginInit } from '../utils/model';
import { useInputObjectCallback } from '../utils/hooks';
import { AxiosPost } from '../utils/fetch';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { isAuthenticated } from '../recoil/recoil';
import { logout } from '../utils/session';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [loginObj, setLoginObj, onChangeLoginInput] = useInputObjectCallback<LoginInfo>(LoginInit);
  const [authenticated, setAuthenticated] = useRecoilState<boolean>(isAuthenticated);
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const response = await AxiosPost().post('/user/login/', {
        username: loginObj.username,
        password: loginObj.password,
      });
      console.log(response);
      // alert(response.data?.detail);
      if (response.status === 202) {
        // csrf token 발급
        setAuthenticated(true);
        alert('로그인 성공');
        navigate(-1);
      }
    } catch (e) {
      if (e instanceof AxiosError) alert(e.response?.data?.detail);
    }
  };
  const onClickLogout = () => {
    try {
      logout();
      alert('성공적으로 로그아웃되었습니다.');
      navigate(0);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack spacing={2}>
        <Stack width={500} spacing={2}>
          {!authenticated ? (
            <>
              <Typography variant="h4">로그인</Typography>
              <OutlinedInput
                placeholder="아이디"
                value={loginObj.username}
                onChange={(e) => onChangeLoginInput(e, 'username')}
              />
              <OutlinedInput
                type="password"
                placeholder="비밀번호"
                value={loginObj.password}
                onChange={(e) => onChangeLoginInput(e, 'password')}
              />
              <Button variant="contained" onClick={onLogin}>
                로그인
              </Button>
            </>
          ) : (
            <>
              <Typography>로그인 되어있습니다</Typography>
              <Link onClick={onClickLogout}>로그아웃</Link>
            </>
          )}
        </Stack>
        <Link href="/signup">회원가입</Link>
      </Stack>
    </Container>
  );
};
