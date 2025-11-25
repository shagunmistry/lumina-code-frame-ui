export interface CodeFrameProps {
  code: string;
  language?: string;
  title?: string;
  theme?: 'neon' | 'sunset' | 'ocean' | 'forest';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  showLineNumbers?: boolean;
  isEditable?: boolean;
  apiKey?: string; // For AI features
  onCodeChange?: (newCode: string) => void;
}

export interface GeminiResponse {
  text: string;
  error?: string;
}

export enum AIActionType {
  EXPLAIN = 'EXPLAIN',
  REFACTOR = 'REFACTOR',
  FIX_BUGS = 'FIX_BUGS',
  ADD_TYPES = 'ADD_TYPES'
}