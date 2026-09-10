import React from 'react';

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-375 px-4 pb-5 pt-4 sm:px-7 lg:px-10 ${className}`}>{children}</div>;
}

export default Container;
