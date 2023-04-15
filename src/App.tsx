import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPageLayout } from './layout/MainPageLayout';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" />
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
