import React, { Suspense } from 'react';

export function withSuspense(Component, options = {}) {
  const { fallback = <div>Loading...</div> } = options;

  return function SuspenseWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}
