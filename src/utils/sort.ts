export const sortData = (data: Array<any>) => {
  data.sort((a: any, b: any) => {
    const aDate: any = new Date(a.updatedAt),
      bDate: any = new Date(b.updatedAt);
    return bDate - aDate;
  });
}