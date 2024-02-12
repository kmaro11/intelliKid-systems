import {  expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TableCell from '../components/TableCell.vue';

const wrapper = mount(TableCell, {
    propsData: {
        text: 'column_1'
    }
})

test('should render table cell', () => {
    expect(wrapper.text()).toBe('column_1')
})