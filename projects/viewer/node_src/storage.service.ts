export class StorageService {
  private static _instance: StorageService;

  private _storage: any;
  private _init = false;

  constructor() {
  }

  static getInstance(): StorageService {
    if (StorageService._instance) {
      return StorageService._instance;
    } else {
      return new StorageService();
    }
  }

  init() {
    if (!this._init) {
      this._storage = {};
      (<any>global).muzikaStorage = {
        set: (key: string, value: any) => { this.set(key, value); },
        get: (key: string) => this.get(key),
        remove: (key: string) => { this.remove(key); }
      };
      this._init = true;
    }
  }

  set(key: string, value: any) {
    this._storage[key] = value;
  }

  get(key: string): any {
    return this._storage[key];
  }

  remove(key: string): void {
    if (this._storage.hasOwnProperty(key)) {
      delete this._storage[key];
    }
  }
}

export const StorageServiceInstance = StorageService.getInstance();
