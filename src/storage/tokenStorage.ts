import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "vitalia.token";

export const tokenStorage = {
  save: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(
      TOKEN_KEY,
      token,
    );
  },

  get: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(
      TOKEN_KEY,
    );
  },

  remove: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(
      TOKEN_KEY,
    );
  },
};