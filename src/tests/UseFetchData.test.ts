import { expect, test, vi } from "vitest";
import { useFetchData } from "../composables/useFetchData";

global.fetch = vi.fn()

function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
}

test('Should fetch data', async () => {
    const response = [
        {
          column: [],
          rows: [],
        },
      ]

      fetch.mockResolvedValue(createFetchResponse(response))

      const todoList = await useFetchData('some-url')

      expect(todoList).toStrictEqual(response)
})
