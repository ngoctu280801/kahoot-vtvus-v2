/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ButtonMain from "../button/ButtonMain";

export default function ModalMain({ open, children, handleClose, title, buttonList, maxWidth, ...props }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={maxWidth}
      >
        {title && (
          <DialogTitle id="alert-dialog-title" className="font-bold" {...props}>
            {title}
          </DialogTitle>
        )}
        <DialogContent {...props}>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        {buttonList && (
          <DialogActions className="flex items-center justify-center mb-4">
            {buttonList.length > 0 &&
              buttonList.map(item => (
                <ButtonMain
                  key={item.id}
                  textColor={item.textColor}
                  hoverColor={item.hoverColor}
                  bgColor={item.bgColor}
                  className={item.className || ""}
                  onClick={item.onClick}
                >
                  {item.title}
                </ButtonMain>
              ))}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
ModalMain.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  buttonList: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  props: PropTypes.any,
  maxWidth: PropTypes.string,
};
