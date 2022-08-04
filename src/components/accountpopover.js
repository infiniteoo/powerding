import * as React from "react";
import Popover from "@mui/material/Popover";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function PopOver(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <AccountCircleIcon
        sx={{ color: "white", fontSize: "40px", marginRight: "10px" }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          {!props.userInfo.username
            ? "Not logged in"
            : `Username: ${props.userInfo.username}`}
        </Typography>
        <Typography sx={{ p: 2 }}>
          {props.userInfo.downloadsRemaining === null
            ? ""
            : `Downloads Remaining: ${props.userInfo.downloadsRemaining}`}
        </Typography>
        <div className="logout-button-div">
          <button
            onClick={props.logout}
            className="btn btn-block btn-dark"
            sx={{ margin: "auto" }}
          >
            Logout
          </button>
          {props.userInfo.accessLevel > 4 ? (
            <Link to="/admin" className="btn btn-link text-secondary btn-light">
              <span className="text-secondary">Admin Page</span>
            </Link>
          ) : null}
        </div>
      </Popover>
    </div>
  );
}
