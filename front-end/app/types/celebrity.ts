export interface CelebrityFace {
  Name: string;
  Id?: string;
  Confidence?: number;
  MatchConfidence?: number;
}

export interface UnrecognizedFace {
  BoundingBox?: {
    Width?: number;
    Height?: number;
    Left?: number;
    Top?: number;
  };
  Confidence?: number;
}

export interface CelebritiesData {
  celebrityFaces: CelebrityFace[];
  unrecognizedFaces: UnrecognizedFace[];
}
