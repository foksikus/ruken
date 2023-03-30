export interface Method {
  (...args: unknown[]): unknown;
}

export interface Scope {
  args: Record<string, number | string>;
  methods: Record<string, Method>;
}
