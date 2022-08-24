import { Box, BoxProps } from "@mui/material";
import React from "react";
import useStyles from "./useStyles";

const RoundedBox: React.ComponentType<BoxProps> = (props) => {
  const styles = useStyles();
  return (
    <Box {...props} className={`${styles.content} ${props?.className ?? ""}`}>
      {props.children}
    </Box>
  );
};

export default RoundedBox;
