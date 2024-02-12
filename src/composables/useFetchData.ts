export const useFetchData = async <T>(url: string): Promise<{ data: T | null; error: Error | null }> => {
    const actionData = {
        data: null,
        error: null,
    };

    try {
        actionData.data = await fetch(url).then((res: Response) => res.json())
      } catch(err: any) {
        actionData.error = err
      }

      return actionData
    
};