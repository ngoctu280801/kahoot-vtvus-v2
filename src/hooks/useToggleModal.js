import React from "react";

export default function useToggleModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return {
    open,
    handleClickOpen,
    handleClose,
  };
}
