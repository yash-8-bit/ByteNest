class Localstorage {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(value: string): void {
    localStorage.setItem(this.key, value);
  }
  get(): string | null {
    const value = localStorage.getItem(this.key);
    return value || "";
  }
  reset(): void {
    localStorage.removeItem(this.key);
  }
}

const tokenStore = new Localstorage("authtoken");
const localThemeStore = new Localstorage("local_theme");
export default { tokenStore, localThemeStore };
