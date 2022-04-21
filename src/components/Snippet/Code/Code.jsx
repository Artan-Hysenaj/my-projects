import React, { useState } from "react";
import classes from "./Code.module.css";
const Code = ({ code, showCode }) => {
  const [copyText, setCopyText] = useState("Copy");

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopyText("✅ Copied!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 1000);
  };
  return (
    <div>
      {showCode && (
        <div className={classes.code}>
          <pre>{code}</pre>
          <button className={classes["copy-button"]} onClick={copyCode}>
            {copyText}
          </button>
        </div>
      )}
    </div>
  );
};

export default Code;
