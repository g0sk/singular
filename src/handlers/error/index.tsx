import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  setJSExceptionHandler,
  //setNativeExceptionHandler
} from 'react-native-exception-handler';
import {ErrorFallback} from 'handlers/error/ErrorFallback';

setJSExceptionHandler((error, isFatal) => {
  console.warn(error, isFatal);
});

const errorHandler = (error: Error) => {
  console.error(error);
};

export const ErrorHandler = ({children}: {children: React.ReactNode}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
    {children}
  </ErrorBoundary>
);
