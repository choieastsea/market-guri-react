import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

function useInputObjectCallback<T>(
  initialState: T
): [
  T,
  SetState<T>,
  (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    inputType: string
  ) => void
] {
  const [state, setState] = useState<T>(initialState);
  const onChangeInput = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
      inputType: string
    ) => {
      const { value, type, checked } = e.target as HTMLInputElement;
      setState((prevObj) => ({
        ...prevObj,
        [inputType]: type === 'checkbox' ? checked : value,
      }));
    },
    []
  );
  return [state, setState, onChangeInput];
}

export { useInputObjectCallback };
