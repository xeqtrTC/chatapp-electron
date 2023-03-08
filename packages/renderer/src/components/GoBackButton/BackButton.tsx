import type {FC} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const BackButton: FC = () => {
  const navigate = useNavigate();
  const onClickGoBack = (): void => {
    navigate(-1);
  };
  return (
    <div className="absolute top-0 left-0 p-5">
      <button
        onClick={onClickGoBack}
        className="bg-white p-3 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
