import React, { useState } from 'react';
import Copy from 'clipboard-copy';

function ShareButton() {
  const url = window.location.href.toString();
  const [isCopied, setIsCopied] = useState(false);
  const onCopyButtonClick = () => {
    Copy(url);
    setIsCopied(true);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onCopyButtonClick }
      >
        Share
      </button>
      {
        (isCopied)
          ? <p>Link copied!</p>
          : (null)
      }
    </>
  );
}

export default ShareButton;
