export class AlertTypes {
  public static readonly Success: any = 'success';
  public static readonly Error: any = 'error';
  public static readonly Warning: any = 'warning';
  public static readonly Info: any = 'info';
  public static readonly Question: any = 'question';
}

export class RewardType {
  public static readonly Row: any = 'Pirámide de gomitas';
  public static readonly Column: any = 'Nutellita';
  public static readonly FirstDiagonal: any = 'Beso especial';
  public static readonly SecondDiagonal: any = '3 Besos 404';
  public static readonly Bingo: any = 'Invitación a cenar (Tú elijes dónde)';
  public static readonly SecretJPattern: any = 'Pingüinos';
  public static readonly SecretHPattern: any = 'Pizza';
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