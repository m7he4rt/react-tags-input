import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
} from 'react'

import { ItemProps } from '@/common/Item';
import { WithChildren } from '@/common/Children';

import { emailRegex } from '@/utils/regex';
import { generateRandomId } from '@/utils/generateRandomId';

type TagContextProps = {
  items: ItemProps[];
  setItems: Dispatch<React.SetStateAction<ItemProps[]>>;
  setValue: Dispatch<React.SetStateAction<string>>;
  addChip: () => void;
  deleteChip: (item: ItemProps) => () => void;
  error: boolean;
  value: string;
}

const TagContext = createContext<TagContextProps>({
  addChip: () => console.error('no tag provider'),
  deleteChip: () => () => console.error('no tag provider'),
  setItems: () => console.error('no tag provider'),
  setValue: () => console.log('no tag provider'),
  items: [],
  error: false,
  value: '',
})

export const TagProvider = ({ children }: WithChildren) => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const addChip = () => {
    if (value.includes(';')) {
      const splitedEmails = value.split(';').filter(
        (elem, index, self) => emailRegex.test(elem) && index === self.indexOf(elem))
        .map(labelEmail => ({
          email: labelEmail,
          id: generateRandomId()
        }
      ));

      setItems([...items, ...splitedEmails]);
      setValue('');
      return setError(false);
    }

    if (emailRegex.test(value)) {
      setItems([...items, {
        email: value,
        id: generateRandomId()
      }]);
      setValue('');
      return setError(false);
    }

    return setError(true);
  }

  const deleteChip = (item: ItemProps) => () => {
    const filteredItems = items.filter(({ id }) => id !== item.id);

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
