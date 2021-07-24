import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
} from 'react'

import { WithChildren } from '@/common/Children';

import { emailRegex } from '@/utils/regex';

type TagContextProps = {
  items: string[];
  setItems: Dispatch<React.SetStateAction<string[]>>;
  setValue: Dispatch<React.SetStateAction<string>>;
  addChip: () => void;
  deleteChip: (item: string) => void;
  error: string;
  value: string;
}

const TagContext = createContext<TagContextProps>({
  addChip: () => console.error('no tag provider'),
  deleteChip: () => console.error('no tag provider'),
  setItems: () => console.error('no tag provider'),
  setValue: () => console.log('no tag provider'),
  items: [],
  error: '',
  value: '',
})

export const TagProvider = ({ children }: WithChildren) => {
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>();

  const addChip = () => {
    if (value.includes(';')) {
      const splitedEmails = value.split(';').
        filter((item, _, emails) => emailRegex.test(item) && emails.includes(item));

      setItems([...items, ...splitedEmails]);
      setValue('');
      setError('');
      return;
    }

    if (!emailRegex.test(value)) {
      setError('E-mail is not valid');
      return;
    }

    if (items.includes(value)) {
      setError('E-mail already registered');
      return;
    }
    
    setItems([...items, value]);
    setValue('');
    setError('');
  }

  const deleteChip = (item: string) => {
    const filteredItems = items.filter((email) => email !== item);

    return setItems(filteredItems);
  }

  return (
    <TagContext.Provider
      value={{
        items,
        setItems,
        addChip,
        deleteChip,
        error,
        value,
        setValue
      }}
    >
      {children}
    </TagContext.Provider>
  )
}

export const useTag = () => {
  const ctx = useContext(TagContext);

  if (ctx === undefined) {
    throw new Error('useTag must be used within a TagProvider')
  }

  return ctx;
}
