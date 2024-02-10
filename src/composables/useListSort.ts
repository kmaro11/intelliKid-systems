export const useListSort = <TObject extends Record<string, any>> (list:TObject[], key: keyof TObject): TObject[] => {
    return list.sort((a,b) => a[key] - b[key] );
}