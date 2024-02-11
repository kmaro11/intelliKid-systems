import { expect, test } from "vitest";
import { useFetchData } from "../composables/useFetchData";

test('Should fetch data', async () => {
    const result = await useFetchData('./src/data/huge.json');

    expect(result).toEqual({columns: ['column_1']})
})
