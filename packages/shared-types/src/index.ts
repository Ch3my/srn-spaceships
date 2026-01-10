export interface Spaceship {
  id: number;
  name: string;
  description: string;
  faction: string;
}

export type Faction = 'Empire' | 'Rebels' | 'Republic' | 'Independent' | 'Bounty Hunters' | 'All';
