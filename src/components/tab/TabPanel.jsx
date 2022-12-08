/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.length > 0 &&
            data.map((item, index) => (
              <Tab
                key={item.id}
                className="normal-case text-lg font-semibold"
                label={item.title}
                {...a11yProps({ index })}
              />
            ))}
        </Tabs>
      </Box>
      {data.length > 0 &&
        data.map((item, index) => (
          <TabPanel key={item.id} className="mx-auto" value={value} index={index}>
            {item.children}
          </TabPanel>
        ))}
    </Box>
  );
}
BasicTabs.propTypes = {
  data: PropTypes.array.isRequired,
};
