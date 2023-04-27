import { Button, Container, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import { LoginInfo, LoginInit } from '../utils/model';
import { useInputObjectCallback } from '../utils/hooks';
import { AxiosPost } from '../utils/fetch';
import { AxiosError } from 'axios';

export const LoginPage = () => {
  // const [loginObj, setLoginObj] = useState<LoginInfo>(LoginInit);

  const [loginObj, setLoginObj, onChangeLoginInput] = useInputObjectCallback<LoginInfo>(LoginInit);

  const onLogin = async () => {
    try {
      const response = await AxiosPost().post('/user/login/', {
        username: loginObj.username,
        password: loginObj.password,
      });
      console.log(response);
      // alert(response.data?.detail);
      if(response.status === 202){
        alert('로그인 성공')
      }
    } catch (e) {
      if (e instanceof AxiosError) alert(e.response?.data?.detail);
    }
  };
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack spacing={2}>
        <Stack width={500} spacing={2}>
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
        </Stack>
        <Link href="/signup">회원가입</Link>
      </Stack>
    </Container>
  );
};
