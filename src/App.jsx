import React, { useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "./App.module.css";
import SampleData from "./sample_data.json";
import RemoveSelection from "./removeSelection";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (
    newTree,
    { dragSourceId, dropTargetId, dragSource, dropTarget }
  ) => {
    const tempTree = treeData.map((data) => {
      const item = selectedNodes.find((n) => n.id === data.id);
      if (item) {
        item.parent = dropTargetId;
        return { ...item, parent: dropTargetId };
      } else {
        return data;
      }
    });
    setSelectedNodes([]);
    setTreeData(tempTree);
  };
  const [selectedNodes, setSelectedNodes] = useState([]);

  const deSelect = () => {
    setSelectedNodes([]);
  };

  const handleSelectMouseDown = (isShiftKey, node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (!item && !isShiftKey) {
      setSelectedNodes([node]);
    } else if (!item && isShiftKey) {
      setSelectedNodes([...selectedNodes]);
    }
  };

  const handleSelect = (isShiftKey, node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (selectedNodes.length === 0) {
      setSelectedNodes([node]);
    } else if (!item && isShiftKey) {
      setSelectedNodes([...selectedNodes, node]);
    } else if (item && isShiftKey) {
      setSelectedNodes(selectedNodes.filter((n) => n.id !== node.id));
    } else if (item && !isShiftKey) {
      setSelectedNodes([node]);
    } else {
      setSelectedNodes([node]);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <div className={styles.app}>
        <div className={styles.current}>
          <p>
            Current node:{" "}
            <span className={styles.currentLabel}>
              {selectedNodes.length === 0
                ? "none"
                : selectedNodes.map((n) => n.text).join(", ")}
            </span>
          </p>
        </div>
        <RemoveSelection deSelect={deSelect}>
          <Tree
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                isSelected={!!selectedNodes.find((n) => n.id === node.id)}
                onToggle={onToggle}
                onSelect={handleSelect}
                onSelectMouseDown={handleSelectMouseDown}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
        </RemoveSelection>
      </div>
    </ChakraProvider>
  );
}

export default App;
