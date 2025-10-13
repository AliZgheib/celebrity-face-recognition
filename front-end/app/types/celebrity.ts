export interface CelebrityFace {
  Name: string;
  Id?: string;
  Confidence?: number;
  MatchConfidence?: number;
}

export interface CelebritiesData {
  celebrityFaces: CelebrityFace[];
  unrecognizedFaces: any[];
}
