export interface GameLevel {
  title: string;
  location: string;
  threat: string;
  missionDescription: string;
  challenge: string;
  options: string[];
  reward: string;
  npc?: {
    name: string;
    dialogue: string;
  };
}
