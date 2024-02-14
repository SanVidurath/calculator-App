import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

export const StyledGrid = styled(Grid)(() => ({
  height: "60vh",
}));

export const StyledButton = styled(Button)(() => ({
  width: "48px",
  marginRight: "2px",
  marginBottom: "1px",
}));

// "&:hover": {
//   backgroundColor: "darkblue", // Change this color for the hover effect
// },
