declare module 'serverline' {
  export function setPrompt(prompt: string): void;
  export function init(options: { prompt: string }): void;
  export function on(event: string, callback: (line: string) => void): void;
}