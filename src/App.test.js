import { createDeck } from './App';

describe('createDeck', () => {
  test('creates exactly matching pairs for the selected level length', () => {
    const deck = createDeck(4);

    expect(deck).toHaveLength(8);
    const srcs = deck.map(card => card.src);
    const uniqueSources = new Set(srcs);
    expect(uniqueSources.size).toBe(4);

    deck.forEach(card => {
      expect(card).toHaveProperty('matched', false);
      expect(card).toHaveProperty('id');
    });
  });
});
