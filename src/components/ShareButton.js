import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';

function ShareButton() {
  const location = useLocation();

  let url = `http://localhost:3000${location.pathname}`;
  console.log(url.split('/in-progress')[0]);

  if (url.includes('in-progress')) {
    const newUrl = url.split('/in-progress')[0];
    url = newUrl;
  }
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
