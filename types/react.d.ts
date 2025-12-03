declare module 'react' {
  // Minimal, pragmatic shims for editor diagnostics in this workspace.
  export type ReactNode = any;

  export function useState<T>(initial?: T | (() => T)):
    [T, (value: T | ((prev: T) => T)) => void];

  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;

  export function useMemo<T>(factory: () => T, deps?: any[]): T;

  export function useRef<T>(initial?: T | null): { current: T | null };

  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps?: any[]): T;

  export type FC<P = {}> = (props: P & { children?: ReactNode }) => JSX.Element | null;

  const _default: any;
  export default _default;
}
