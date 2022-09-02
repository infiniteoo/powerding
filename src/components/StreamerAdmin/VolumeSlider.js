import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

export default function ContinuousSlider(props) {
  const [value, setValue] = React.useState(30);
  props.setVolume(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setVolume(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown sx={{ color: "#4582ec" }} />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          sx={{ color: "white" }}
        />
        <VolumeUp sx={{ color: "#4582ec" }} />
      </Stack>
    </Box>
  );
}
