class Localstorage {
  private key: string;
  constructor() {
    this.key = "authtoken";
  }
  set(value: string): void {
    localStorage.setItem(this.key, value);
  }
  get(): string | null {
    const value = localStorage.getItem(this.key);
    return value;
  }
  reset(): void {
    localStorage.removeItem(this.key);
  }
}

const ls = new Localstorage();
export default ls;
