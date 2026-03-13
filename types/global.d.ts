declare global {
  interface Window {
    // Add any window extensions here if needed
    [key: string]: unknown;
  }

  // Add other global types as needed
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
}

export {};