import { atom } from 'recoil';

const isAuthenticated = atom<boolean>({
  key: 'isAuthenticated',
  default: false,
});

export { isAuthenticated };
