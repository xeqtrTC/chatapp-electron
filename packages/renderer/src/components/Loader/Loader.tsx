import type {FC} from 'react';
import React from 'react';

const Loader: FC = () => {
  return (
    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-20 w-20" />
  );
};

export default Loader;
