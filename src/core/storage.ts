import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

 function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

  function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

  function removeItem(key: string) {
  storage.delete(key);
}


 function clearStorage() {
  storage.clearAll();
}


 function clearItems(keys: string[]) {
  for (const key of keys) {
    storage.delete(key);
  }
}

export const MmkvStorage = {
  getItem,
  setItem,
  removeItem,
  clearItems,
  clearStorage
}

