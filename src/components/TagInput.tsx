import React, { useEffect } from "react";
import { Chip, Box } from "@material-ui/core";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

import { useTag } from "@/context/TagContext";

import { ItemProps } from '@/common/Item';

type TagsInputProps = {
  tags?: ItemProps[]
} & TextFieldProps;

const TagsInput = ({
  tags = [],
  ...props 
}: TagsInputProps) => {
  const { 
    addChip, 
    deleteChip,
    error,
    items,
    setItems,
    setValue,
    value,
  } = useTag();
  
  useEffect(() => {
    setItems(tags);
  }, []);

  const handleKeyDown = (event) => {
    const lastItem = [...items].pop();

    return {
      "Tab": () => addChip(),
      "Enter": () => addChip(),
      "Backspace": deleteChip(lastItem)
    }[event.key]?.()
  }

  return (
    <TextField
      InputProps={{
        startAdornment: 
        <Box 
          display="flex"
          flexWrap="wrap"
          paddingY={1}
        >
          {items?.map((item) => (
            <Chip
              key={`key-${item.email}-${item.id}`}
              label={item.email}
              onDelete={deleteChip(item)}
            />
          ))}
        </Box>
      }}
      error={error}
      value={value || ''}
      fullWidth
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      helperText={error ? "Email is not valid" : ""}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export default TagsInput

