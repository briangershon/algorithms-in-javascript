import Trie from './trie';

describe('trie', () => {
  test('should find all words starting with "he"', () => {
    const allWords = ['he', 'hell', 'hello', 'help'];
    const trie = new Trie(allWords);
    const words = trie.searchPrefix('he');
    expect(words).toEqual(expect.arrayContaining(allWords));
  });  

  test('should find the longest string', () => {
    const allWords = ['he', 'hell', 'hello', 'help'];
    const trie = new Trie(allWords);
    const words = trie.searchPrefix('hello');
    expect(words).toEqual(expect.arrayContaining(['hello']));
  });  
});