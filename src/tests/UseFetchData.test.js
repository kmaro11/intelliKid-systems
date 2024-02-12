import { describe, it, expect, vi } from "vitest";
import { useFetchData } from "../composables/useFetchData.ts"

describe('useFetchData', () => {
  
  const response = {
    data: {
      columns: [],
      rows: [],
    }
  }

  it('fetches data from the given URL', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const { data, error } = await useFetchData('https://example.com/api/data');

    expect(data).toEqual(response);
    expect(error).toBeNull();
  });

  it('handles errors when fetching data', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );

    const { data, error } = await useFetchData('https://example.com/api/data');

    expect(data).toBeNull();
    expect(error).toEqual(new Error('Failed to fetch data'));
  });
});