
"use client"
import { store } from '@/redux/store/store';
import React from 'react';
import { Provider } from 'react-redux';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};


