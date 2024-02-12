import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from '../components/Table.vue';

describe('Table.vue', () => {
  it('renders table correctly', () => {
    const wrapper = mount(Table);
    expect(wrapper.find('table').exists())
  });
});