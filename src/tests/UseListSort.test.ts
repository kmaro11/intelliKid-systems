import { useListSort } from '../composables/useListSort';
import {describe, it, expect} from 'vitest';

describe('useListSort', () => {
  it('should sort a list of objects by a numeric key', () => {
    const list = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const sortedList = useListSort(list, 'id');
    expect(sortedList).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
});