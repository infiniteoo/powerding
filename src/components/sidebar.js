import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = "10%";

export default function Sidebar(props) {
  console.log("in sidebar, props.state", props.state);
  const [open, setOpen] = React.useState({
    filters: true,
    topicals: true,
    imaging: true,
    music: true,
    soundDesign: true,
    voiceSamples: true,
    formatSpecials: true,
  });

  const handleClick = (which) => {
    setOpen({ ...open, [which]: !open[which] });
  };

  const newThisWeek = () => {
    axios
      .get("/api/dates/new_this_week/")
      .then((res) => {
        props.setSounds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newSinceLastVisit = () => {
    axios
      .get(`/api/dates/new_since_last_visit/`, props.state.previousLogin)
      .then((res) => {
        props.setSounds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        open={open.filters}
      >
        <List
          sx={{
            width: "100%",

            color: "white",
            maxWidth: 360,
            backgroundImage:
              "linear-gradient(#17082e 0,#1a0933 7%,#1a0933 80%,#0c1f4c 100%)",
          }}
          component="nav"
        >
          {/* FILTER SECTION */}
          <ListItemButton
            onClick={() => handleClick("filters")}
            sx={{
              backgroundColor: "white",
            }}
          >
            <ListItemText primary="FILTERS" sx={{ color: "black" }} />
            {open.filters ? (
              <ExpandLess sx={{ color: "black" }} />
            ) : (
              <ExpandMore sx={{ color: "black" }} />
            )}
          </ListItemButton>
          <Collapse in={open.filters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("")}
              >
                <ListItemText primary="All Files" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => newThisWeek()}>
                <ListItemText primary="New This Week" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => newSinceLastVisit()}
              >
                <ListItemText primary="New Since Last Visit" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* END FILTER SECTION */}

          {/* imaging SECTION */}
          <ListItemButton
            onClick={() => handleClick("imaging")}
            sx={{
              backgroundColor: "white",
            }}
          >
            <ListItemText primary="IMAGING" sx={{ color: "black" }} />
            {open.imaging ? (
              <ExpandLess sx={{ color: "black" }} />
            ) : (
              <ExpandMore sx={{ color: "black" }} />
            )}
          </ListItemButton>
          <Collapse in={open.imaging} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Brandings")}
              >
                <ListItemText primary="Brandings" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Promos")}
              >
                <ListItemText primary="Promos" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Sweepers")}
              >
                <ListItemText primary="Sweepers" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* END imaging SECTION */}
          {/* music SECTION */}
          <ListItemButton
            onClick={() => handleClick("music")}
            sx={{
              backgroundColor: "white",
            }}
          >
            <ListItemText primary="MUSIC" sx={{ color: "black" }} />
            {open.music ? (
              <ExpandLess sx={{ color: "black" }} />
            ) : (
              <ExpandMore sx={{ color: "black" }} />
            )}
          </ListItemButton>
          <Collapse in={open.music} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Music Beds")}
              >
                <ListItemText primary="Music Beds" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Loops")}
              >
                <ListItemText primary="Loops" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Ramps")}
              >
                <ListItemText primary="Ramp Loops" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Hooks")}
              >
                <ListItemText primary="Music Hooks" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Stagers")}
              >
                <ListItemText primary="Stagers" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Instrumentals")}
              >
                <ListItemText primary="Instrumentals" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Acpellas")}
              >
                <ListItemText primary="Acapellas" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* END music SECTION */}

          {/* soundDesign SECTION */}
          <ListItemButton
            onClick={() => handleClick("soundDesign")}
            sx={{
              backgroundColor: "white",
            }}
          >
            <ListItemText primary="SOUND DESIGN" sx={{ color: "black" }} />
            {open.soundDesign ? (
              <ExpandLess sx={{ color: "black" }} />
            ) : (
              <ExpandMore sx={{ color: "black" }} />
            )}
          </ListItemButton>
          <Collapse in={open.soundDesign} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("FX")}
              >
                <ListItemText primary="FX" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("SFX")}
              >
                <ListItemText primary="SFX" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Drones")}
              >
                <ListItemText primary="Drones & Pads" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Scratches")}
              >
                <ListItemText primary="Scratches" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* END soundDesign SECTION */}

          {/* voiceSamples SECTION */}
          <ListItemButton
            onClick={() => handleClick("voiceSamples")}
            sx={{
              backgroundColor: "white",
            }}
          >
            <ListItemText primary="VOICE SAMPLES" sx={{ color: "black" }} />
            {open.voiceSamples ? (
              <ExpandLess sx={{ color: "black" }} />
            ) : (
              <ExpandMore sx={{ color: "black" }} />
            )}
          </ListItemButton>
          <Collapse in={open.voiceSamples} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Artists")}
              >
                <ListItemText primary="Artist Audio" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Samples")}
              >
                <ListItemText primary="Samples & Drops" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Listeners")}
              >
                <ListItemText primary="Listeners" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => props.getSounds("Numbers")}
              >
                <ListItemText primary="Numbers & Letters" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* END voiceSamples SECTION */}
        </List>
      </Drawer>
    </Box>
  );
}
