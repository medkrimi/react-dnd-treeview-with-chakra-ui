import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdFolder,
  MdImage,
  MdOutlineTextSnippet,
  MdBackupTable
} from "react-icons/md";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <Icon as={MdFolder} />;
  }

  switch (props.fileType) {
    case "image":
      return <Icon as={MdImage} />;
    case "csv":
      return <Icon as={MdBackupTable} />;
    case "text":
      return <Icon as={MdOutlineTextSnippet} />;
    default:
      return null;
  }
};
