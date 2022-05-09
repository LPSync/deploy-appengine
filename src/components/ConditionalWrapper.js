import {memo} from "react";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default memo(ConditionalWrapper);