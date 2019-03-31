import HashTable from './hash-table';

describe('Hash', () => {
  describe('retrieves keys', () => {
    test('which do not collide', () => {
      const hashTable = new HashTable();
      hashTable.putValue('one', '1');
      hashTable.putValue('two', '2');
      hashTable.putValue('three', '3');
      expect(hashTable.getValue('one')).toEqual('1');
      expect(hashTable.getValue('two')).toEqual('2');
      expect(hashTable.getValue('three')).toEqual('3');
    });

    test('which collide', () => {
      const hashTable = new HashTable();

      const key = 'brian';
      hashTable.putValue(key, 'was here');
      const key2 = 'nairb';
      hashTable.putValue(key2, 'was also here');

      expect(hashTable.getValue(key)).toBe('was here');
      expect(hashTable.getValue(key2)).toBe('was also here');
    });
  });
});