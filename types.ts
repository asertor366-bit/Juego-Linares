export interface GameLevel {
  title: string;
  location: string;
  threat: string;
  missionDescription: string;
  challenge: string;
  reward: string;
  npc?: {
    name: string;
    dialogue: string;
  };
}
