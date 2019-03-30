import LinkedList from './linked-list';

describe('LinkList', () => {
  test('when empty has no nodes', () => {
    const list = new LinkedList();
    expect(list.allNodes().length).toEqual(0);
  });

  test('has one node after initial append', () => {
    const list = new LinkedList();
    list.append('key0', 'value0');
    const allNodes = list.allNodes();
    expect(allNodes.length).toEqual(1);
    expect(allNodes[0].key).toEqual('key0');
    expect(allNodes[0].value).toEqual('value0');
  });

  test('has two nodes', () => {
    const list = new LinkedList();
    list.append('key0', 'value0');
    list.append('key1', 'value1');
    const allNodes = list.allNodes();
    expect(allNodes.length).toEqual(2);
    expect(allNodes[0].key).toEqual('key0');
    expect(allNodes[0].value).toEqual('value0');
    expect(allNodes[1].key).toEqual('key1');
    expect(allNodes[1].value).toEqual('value1');
  });

  test('has one node after removing first node', () => {
    const list = new LinkedList();
    list.append('key0', 'value0');
    list.append('key1', 'value1');
    list.remove('key0');
    const allNodes = list.allNodes();
    expect(allNodes.length).toEqual(1);
    expect(allNodes[0].key).toEqual('key1');
    expect(allNodes[0].value).toEqual('value1');
  });

  test('has one node after removing second node', () => {
    const list = new LinkedList();
    list.append('key0', 'value0');
    list.append('key1', 'value1');
    list.remove('key1');
    const allNodes = list.allNodes();
    expect(allNodes.length).toEqual(1);
    expect(allNodes[0].key).toEqual('key0');
    expect(allNodes[0].value).toEqual('value0');
  });
});