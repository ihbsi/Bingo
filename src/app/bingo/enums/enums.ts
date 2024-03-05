export class AlertTypes {
  public static readonly Success: any = 'success';
  public static readonly Error: any = 'error';
  public static readonly Warning: any = 'warning';
  public static readonly Info: any = 'info';
  public static readonly Question: any = 'question';
}

export class RewardType {
  public static readonly Row: any = 'Premio fila';
  public static readonly Column: any = 'Premio Columna';
  public static readonly FirstDiagonal: any = 'Premio Diagonal \\';
  public static readonly SecondDiagonal: any = 'Premio Diagonal /';
  public static readonly Bingo: any = 'Premio Bingo';
  public static readonly SecretJPattern: any = 'Premio patrón secreto';
  public static readonly SecretHPattern: any = 'Premio patrón secreto';
}

export class SecretPattern {
  public static readonly JPattern: any = `[{"col": "I", "row": 1},
                                           {"col": "I", "row": 3},
                                           {"col": "I", "row": 4},
                                           {"col": "I", "row": 5},
                                           {"col": "N", "row": 1},
                                           {"col": "N", "row": 5},
                                           {"col": "G", "row": 1},
                                           {"col": "G", "row": 2},
                                           {"col": "G", "row": 3},                                          
                                           {"col": "G", "row": 4},
                                           {"col": "G", "row": 5}]`;

  public static readonly HPattern: any = `[{"col": "I", "row": 1},
                                           {"col": "I", "row": 2},
                                           {"col": "I", "row": 3},
                                           {"col": "I", "row": 4},
                                           {"col": "I", "row": 5},
                                           {"col": "N", "row": 3},
                                           {"col": "G", "row": 1},
                                           {"col": "G", "row": 2},
                                           {"col": "G", "row": 3},                                          
                                           {"col": "G", "row": 4},
                                           {"col": "G", "row": 5}]`;
}