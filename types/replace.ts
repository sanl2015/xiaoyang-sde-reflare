export interface ReplaceEntry {
  from: string | RegExp;
  to: string;
}

export interface ReplaceOptions {
  path?: RegExp;
  replace: ReplaceEntry[];
}
