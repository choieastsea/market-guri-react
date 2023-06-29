import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPageLayout } from './layout/MainPageLayout';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/404';
import { SignupPage } from './pages/SignupPage';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthenticated } from './recoil/recoil';
import { AxiosGet } from './utils/fetch';
import { ItemPage } from './pages/ItemPage';
import { CartPage } from './pages/CartPage';

function App() {
  const setAuthenticated = useSetRecoilState(isAuthenticated);
  const getSession = async () => {
    try {
      const response = await AxiosGet().get('user/session/');
      setAuthenticated(response.data?.detail);
    } catch (e) {}
  };
  useEffect(() => {
    getSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/detail" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
