import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { getMobileJwtToken } from '../utils/auth';

export type TokenContextType = {
  token: string | null;
  loading: boolean;
  refreshToken: () => Promise<void>;
};

const TokenContext = createContext<TokenContextType>({
  token: null,
  loading: true,
  refreshToken: async () => {},
});

export const useToken = () => useContext(TokenContext);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    setLoading(true);
    try {
      let storedToken = await SecureStore.getItemAsync('jwtToken');
      if (!storedToken) {
        const appKey = Constants.expoConfig?.extra?.MOBILE_APP_SECRET || Constants.manifest?.extra?.MOBILE_APP_SECRET;
        if (appKey) {
          const data = await getMobileJwtToken(appKey);
          if (data.token) {
            await SecureStore.setItemAsync('jwtToken', data.token);
            storedToken = data.token;
          }
        }
      }
      setToken(storedToken);
    } catch (err) {
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, loading, refreshToken }}>
      {children}
    </TokenContext.Provider>
  );
};
