export interface GameState {
  status: 'idle' | 'loading' | 'failed';
  sound: 'off' | 'on';
  settings: Record<string, unknown>;
}
