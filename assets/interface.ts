export interface TypeItem {
  from: string;
  id: number;
  pronouce: string;
  to: string;
  langFrom: string;
  langTo: string;
}

export interface PlaySound {
  id: number;
  side: string;
}

export interface PlayResponse {
  play: boolean;
  error: string | null;
}
