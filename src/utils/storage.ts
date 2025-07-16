interface PickupLine {
  id: number;
  text: string;
  category: string;
  createdAt: string;
  likes: number;
}

interface RecentActivity {
  id: string;
  type: 'create' | 'like' | 'share';
  cardId: number;
  cardText: string;
  timestamp: string;
}

interface UserStats {
  cardsCreated: number;
  totalLikes: number;
  cardsShared: number;
}

const STORAGE_KEYS = {
  CARDS: 'rizz_cards',
  LIKED_CARDS: 'rizz_liked_cards',
  RECENT_ACTIVITY: 'rizz_recent_activity',
  USER_STATS: 'rizz_user_stats',
} as const;

// Helper function to safely parse JSON
const safeJSONParse = <T>(str: string | null, fallback: T): T => {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return fallback;
  }
};

// Get all cards
export const getCards = (): PickupLine[] => {
  return safeJSONParse(localStorage.getItem(STORAGE_KEYS.CARDS), []);
};

// Save a new card
export const saveCard = (text: string, category: string): PickupLine => {
  const cards = getCards();
  const newCard: PickupLine = {
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  
  cards.push(newCard);
  localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  
  // Update stats and recent activity
  updateUserStats({ cardsCreated: 1 });
  addRecentActivity({
    type: 'create',
    cardId: newCard.id,
    cardText: text,
  });
  
  return newCard;
};

// Get liked card IDs
export const getLikedCards = (): number[] => {
  return safeJSONParse(localStorage.getItem(STORAGE_KEYS.LIKED_CARDS), []);
};

// Toggle like on a card
export const toggleLike = (cardId: number): boolean => {
  const likedCards = getLikedCards();
  const cards = getCards();
  const isLiked = likedCards.includes(cardId);
  
  if (isLiked) {
    // Unlike
    const newLikedCards = likedCards.filter(id => id !== cardId);
    localStorage.setItem(STORAGE_KEYS.LIKED_CARDS, JSON.stringify(newLikedCards));
    
    // Update card likes count
    const card = cards.find(c => c.id === cardId);
    if (card) {
      card.likes--;
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    }
    
    return false;
  } else {
    // Like
    likedCards.push(cardId);
    localStorage.setItem(STORAGE_KEYS.LIKED_CARDS, JSON.stringify(likedCards));
    
    // Update card likes count and add activity
    const card = cards.find(c => c.id === cardId);
    if (card) {
      card.likes++;
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
      addRecentActivity({
        type: 'like',
        cardId: card.id,
        cardText: card.text,
      });
      updateUserStats({ totalLikes: 1 });
    }
    
    return true;
  }
};

// Get recent activity
export const getRecentActivity = (): RecentActivity[] => {
  return safeJSONParse(localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITY), []);
};

// Add recent activity
export const addRecentActivity = (
  activity: Omit<RecentActivity, 'id' | 'timestamp'>
): void => {
  const activities = getRecentActivity();
  const newActivity: RecentActivity = {
    ...activity,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  
  activities.unshift(newActivity);
  // Keep only last 10 activities
  const recentActivities = activities.slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.RECENT_ACTIVITY, JSON.stringify(recentActivities));
};

// Get user stats
export const getUserStats = (): UserStats => {
  return safeJSONParse(localStorage.getItem(STORAGE_KEYS.USER_STATS), {
    cardsCreated: 0,
    totalLikes: 0,
    cardsShared: 0,
  });
};

// Update user stats
export const updateUserStats = (update: Partial<UserStats>): UserStats => {
  const stats = getUserStats();
  const newStats = {
    ...stats,
    cardsCreated: stats.cardsCreated + (update.cardsCreated || 0),
    totalLikes: stats.totalLikes + (update.totalLikes || 0),
    cardsShared: stats.cardsShared + (update.cardsShared || 0),
  };
  
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(newStats));
  return newStats;
};

// Record a share
export const recordShare = (cardId: number): void => {
  const cards = getCards();
  const card = cards.find(c => c.id === cardId);
  
  if (card) {
    updateUserStats({ cardsShared: 1 });
    addRecentActivity({
      type: 'share',
      cardId: card.id,
      cardText: card.text,
    });
  }
}; 