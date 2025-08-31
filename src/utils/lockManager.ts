const locks = new Map<string, boolean>();

export const acquireLock = (key: string): boolean => {
  if (locks.has(key)) {
    return false;
  }
  locks.set(key, true);
  return true;
};

export const releaseLock = (key: string) => {
  locks.delete(key);
};
