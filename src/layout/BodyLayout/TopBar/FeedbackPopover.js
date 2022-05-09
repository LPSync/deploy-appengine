import {ClickAwayListener, Grow, MenuList, Paper, Popper} from "@material-ui/core";
import ProvideFeedback from "./ProvideFeedback";
import React, {memo} from "react";

const FeedbackPopover = ({anchorCur, isMenuOpen, setIsMenuOpen}) => {
  const handleMenuClose = (event) => {
    if (anchorCur && anchorCur.contains(event.target)) {
      return;
    }
    setIsMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIsMenuOpen(false);
    }
  }

  return (
    <Popper
      open={isMenuOpen}
      anchorEl={anchorCur}
      role={undefined}
      transition
      disablePortal
    >
      {({TransitionProps, placement}) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleMenuClose}>
              <MenuList
                autoFocusItem={isMenuOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <ProvideFeedback />
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default memo(FeedbackPopover);