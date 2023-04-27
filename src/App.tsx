import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPageLayout } from './layout/MainPageLayout';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/404';
import { SignupPage } from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
