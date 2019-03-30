import HashTable from './hash-table';

describe('Hash', () => {
  test('put/get works (without collision support)', () => {
    const hashTable = new HashTable();

    const key = 'brian';
    hashTable.putValue(key, 'was here');
    expect(hashTable.getValue(key)).toBe('was here');
  });
});