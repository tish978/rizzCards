export type PickupLine = {
  id: string;
  text: string;
  category: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  style?: 'funny' | 'smooth' | 'cheesy' | 'cute' | 'clever';
  success_rate?: number;
};

export const categories = [
  {
    id: 'funny',
    name: 'Funny',
    description: 'Humorous lines that break the ice with laughter',
    emoji: '😂'
  },
  {
    id: 'smooth',
    name: 'Smooth',
    description: 'Sophisticated lines that show confidence',
    emoji: '😎'
  },
  {
    id: 'cheesy',
    name: 'Cheesy',
    description: 'Classic cheesy lines that are so bad they\'re good',
    emoji: '🧀'
  },
  {
    id: 'cute',
    name: 'Cute',
    description: 'Adorable lines that make them smile',
    emoji: '🥰'
  },
  {
    id: 'clever',
    name: 'Clever',
    description: 'Smart and witty lines that show intelligence',
    emoji: '🧠'
  }
];

export const pickupLines: PickupLine[] = [
  // Funny Category
  {
    id: 'funny-1',
    text: "Are you a parking ticket? Because you've got FINE written all over you!",
    category: 'funny',
    style: 'funny',
    difficulty: 'easy',
    tags: ['classic', 'wordplay']
  },
  {
    id: 'funny-2',
    text: "Do you like science? Because I've got my ion you!",
    category: 'funny',
    style: 'funny',
    difficulty: 'medium',
    tags: ['science', 'pun']
  },
  
  // Smooth Category
  {
    id: 'smooth-1',
    text: "If you were a song, you'd be the best track on the album.",
    category: 'smooth',
    style: 'smooth',
    difficulty: 'medium',
    tags: ['music', 'compliment']
  },
  {
    id: 'smooth-2',
    text: "You must be a masterpiece, because I can't stop looking at you.",
    category: 'smooth',
    style: 'smooth',
    difficulty: 'easy',
    tags: ['art', 'compliment']
  },

  // Cheesy Category
  {
    id: 'cheesy-1',
    text: "Are you a magician? Because whenever I look at you, everyone else disappears.",
    category: 'cheesy',
    style: 'cheesy',
    difficulty: 'easy',
    tags: ['classic', 'magic']
  },
  {
    id: 'cheesy-2',
    text: "Do you have a map? I keep getting lost in your eyes.",
    category: 'cheesy',
    style: 'cheesy',
    difficulty: 'easy',
    tags: ['classic', 'eyes']
  },

  // Cute Category
  {
    id: 'cute-1',
    text: "Are you a camera? Because every time I look at you, I smile.",
    category: 'cute',
    style: 'cute',
    difficulty: 'easy',
    tags: ['smile', 'photography']
  },
  {
    id: 'cute-2',
    text: "If you were a cat, you'd purr-fectly complete my life.",
    category: 'cute',
    style: 'cute',
    difficulty: 'medium',
    tags: ['animals', 'pun']
  },

  // Clever Category
  {
    id: 'clever-1',
    text: "Are you a compiler? Because you turn all my thoughts into actions.",
    category: 'clever',
    style: 'clever',
    difficulty: 'hard',
    tags: ['tech', 'programming']
  },
  {
    id: 'clever-2',
    text: "Are you a recursive function? Because you keep running through my mind.",
    category: 'clever',
    style: 'clever',
    difficulty: 'hard',
    tags: ['tech', 'programming']
  }
];

// Helper function to get random pickup lines by category
export const getRandomLinesByCategory = (category: string, count: number = 1): PickupLine[] => {
  const categoryLines = pickupLines.filter(line => line.category === category);
  const shuffled = [...categoryLines].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get random pickup lines
export const getRandomLines = (count: number = 1): PickupLine[] => {
  const shuffled = [...pickupLines].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}; 