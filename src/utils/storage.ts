import { type PickupLine } from '../data/pickupLines';

const STORAGE_KEY = 'rizz_cards_user_created';

export const saveUserCard = (card: Omit<PickupLine, 'id'>): PickupLine => {
  const existingCards = getUserCards();
  const newCard: PickupLine = {
    ...card,
    id: `user_${Date.now()}`, // Create unique ID
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingCards, newCard]));
  return newCard;
};

export const getUserCards = (): PickupLine[] => {
  try {
    const cards = localStorage.getItem(STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const deleteUserCard = (id: string) => {
  const cards = getUserCards();
  const filteredCards = cards.filter(card => card.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCards));
}; 