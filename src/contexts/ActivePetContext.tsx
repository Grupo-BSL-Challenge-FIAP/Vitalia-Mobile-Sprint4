import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ActivePetContextType {
  activePetId: number | null;
  setActivePet: (petId: number) => Promise<void>;
  clearActivePet: () => Promise<void>;
  isLoadingActivePet: boolean;
}

interface ActivePetProviderProps {
  children: ReactNode;
}

const ACTIVE_PET_STORAGE_KEY = "@petguardian:activePetId";

const ActivePetContext = createContext<ActivePetContextType>({} as ActivePetContextType);

export function ActivePetProvider({children}: ActivePetProviderProps) {
  const [ activePetId, setActivePetId ] = useState<number | null>(null);
  const [ isLoadingActivePet, setIsLoadingActivePet ] = useState(true);

  useEffect(() => {
    const loadActivePet = async () => {
      try {
        const storedPetId = await AsyncStorage.getItem( ACTIVE_PET_STORAGE_KEY );

        if (storedPetId) {
          setActivePetId(Number(storedPetId));
        }
      } catch (error) {
        console.error(
          "Erro ao carregar pet ativo:",
          error,
        );
      } finally {
        setIsLoadingActivePet(false);
      }
    };

    loadActivePet();
  }, []);

  const setActivePet = async (petId: number) => {
    try {
      setActivePetId(petId);

      await AsyncStorage.setItem(ACTIVE_PET_STORAGE_KEY, String(petId));
    } catch (error) {
      console.error(
        "Erro ao salvar pet ativo:",
        error,
      );
    }
  };

  const clearActivePet = async () => {
    try {
      setActivePetId(null);

      await AsyncStorage.removeItem(ACTIVE_PET_STORAGE_KEY);
    } catch (error) {
      console.error(
        "Erro ao remover pet ativo:",
        error,
      );
    }
  };

  return (
    <ActivePetContext.Provider
      value={{
        activePetId,
        setActivePet,
        clearActivePet,
        isLoadingActivePet,
      }}
    >
      {children}
    </ActivePetContext.Provider>
  );
}

export function useActivePet() {
  return useContext(ActivePetContext);
}