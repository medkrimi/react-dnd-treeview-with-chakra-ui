import React from "react";
import { Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = (e) => {
    props.onSelect(e.shiftKey, props.node);
  };

  const handleSelectMouseDown = (e) => {
    props.onSelectMouseDown(e.shiftKey, props.node);
  };

  return (
    <div
      className={`tree-node ${styles.root} ${
        props.isSelected ? styles.isSelected : ""
      }`}
      style={{ paddingInlineStart: indent }}
      onClick={handleSelect}
      onMouseDown={handleSelectMouseDown}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ChevronRightIcon w={8} h={8} />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        <Text as="b">{props.node.text}</Text>
      </div>
    </div>
  );
};
