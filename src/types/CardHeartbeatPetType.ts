import { PetResponse } from "../services/petService";

export interface CardHeartbeatPetType {
  pet: PetResponse;
  onPress?: () => void;
}