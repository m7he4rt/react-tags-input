import React, { useEffect } from "react";
import { Chip, Box } from "@material-ui/core";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

import { useTag } from "@/context/TagContext";

type TagsInputProps = {
  tags?: string[]
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const lastItem = [...items].pop();

    if (event.key === "Tab" || event.key === "Enter") {
      addChip();
    }

    if (event.key === "Backspace" && !value) {
      deleteChip(lastItem);
    }
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
              key={`key-${item}`}
              label={item}
              onDelete={() => deleteChip(item)}
            />
          ))}
        </Box>
      }}
      error={Boolean(error)}
      value={value || ''}
      fullWidth
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      helperText={error}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export default TagsInput

