export interface PetType {
  id: number;
  name: string;
  species: string;
  speciesId?: number | null;
  breed: string;
  breedId?: number | null;
  gender: string;
  birthDate: string;
  weight: string;
  image?: string;
}