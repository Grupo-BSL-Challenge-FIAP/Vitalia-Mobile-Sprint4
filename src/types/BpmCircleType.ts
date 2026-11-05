export interface BpmCircleType {
  bpm: number | string | null;
  status: "NORMAL" | "ATTENTION" | "RISK";
}