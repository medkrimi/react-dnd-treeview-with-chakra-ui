import React, { useRef, useEffect } from "react";

function useClickedOutSide(ref, deSelect) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        deSelect();
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function RemoveSelection(props) {
  const wrapperRef = useRef(null);
  useClickedOutSide(wrapperRef, props.deSelect);
  return (
    <div ref={wrapperRef} style={{ height: "fit-content" }}>
      {props.children}
    </div>
  );
}
