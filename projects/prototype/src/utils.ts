export function promisify(...args): Promise<any> {
  const func = [].shift.call(args);
  return new Promise((res, rej) => {
    func(...args, (err: any, data: any) => {
      if (err) { return rej(err); }
      return res(data);
    });
  });
}
