import React, { useState } from "react";
import "./code-block-component.css";
import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";

type CodeBlockComponentProps = {
  codeString: string;
};

const CodeBlockComponent = ({ codeString }: CodeBlockComponentProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <pre className="code-block">
      <button
        onClick={handleCopy}
        title={isCopied ? "Copied!" : "Click to copy"}
        aria-label={isCopied ? "Copied" : "Copy code"}
        className="icon-container"
      >
        {isCopied ? (
          <IoCheckmarkOutline className="codeblock-icon" />
        ) : (
          <IoCopyOutline className="codeblock-icon" />
        )}
      </button>
      <code aria-readonly>{codeString}</code>
    </pre>
  );
};

export default CodeBlockComponent;
