import { Button, Container, OutlinedInput, Stack, Typography } from '@mui/material';
import { useInputObjectCallback } from '../utils/hooks';
import { SignupInfo, SignupInit } from '../utils/model';
import { AxiosPost } from '../utils/fetch';
import { AxiosError } from 'axios';

export const SignupPage = () => {
  const [signupObj, setSignupObj, onChangeSignupInput] =
    useInputObjectCallback<SignupInfo>(SignupInit);

  const onClickSignup = async () => {
    const { username, password, passwordConfirm, first_name, last_name, phone_number, address } =
      signupObj;
    if (password !== passwordConfirm) {
      alert('비밀번호 확인은 비밀번호와 일치하게 작성해야합니다.');
      return;
    }
    try {
      const response = await AxiosPost().post('/user/signup/', {
        username,
        password,
        first_name,
        last_name,
        phone_number,
        address,
      });
      console.log(response);
      if (response.status === 201) {
        alert('회원 가입 성공');
      }
    } catch (e) {
      if (e instanceof AxiosError) alert(e.response?.data?.detail);
    }
  };
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack width={500} spacing={2}>
        <Typography variant="h4">회원가입</Typography>
        <OutlinedInput
          placeholder="아이디"
          value={signupObj.username}
          onChange={(e) => onChangeSignupInput(e, 'username')}
        />
        <OutlinedInput
          placeholder="비밀번호"
          type="password"
          value={signupObj.password}
          onChange={(e) => onChangeSignupInput(e, 'password')}
        />
        <OutlinedInput
          placeholder="비밀번호 확인"
          type="password"
          value={signupObj.passwordConfirm}
          onChange={(e) => onChangeSignupInput(e, 'passwordConfirm')}
        />
        <OutlinedInput
          placeholder="성"
          value={signupObj.last_name}
          onChange={(e) => onChangeSignupInput(e, 'last_name')}
        />
        <OutlinedInput
          placeholder="이름"
          value={signupObj.first_name}
          onChange={(e) => onChangeSignupInput(e, 'first_name')}
        />
        <OutlinedInput
          placeholder="전화번호"
          value={signupObj.phone_number}
          onChange={(e) => onChangeSignupInput(e, 'phone_number')}
        />
        <OutlinedInput
          placeholder="주소"
          value={signupObj.address}
          onChange={(e) => onChangeSignupInput(e, 'address')}
        />
        <Button variant="outlined" onClick={onClickSignup}>
          회원가입
        </Button>
      </Stack>
    </Container>
  );
};
