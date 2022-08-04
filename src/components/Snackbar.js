import * as React from "react";
/* import Stack from "@mui/material/Stack"; */

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [state] = React.useState({
    vertical: "bottom",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.closeSnackbar(false);
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {props.alertMsg}
      </Alert>
    </Snackbar>
    
  );
}
