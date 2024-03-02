export interface BingoFirebase {
    idFirebase: string,
    id: number,
    text: string,
    column: string,
    active: boolean
}

export interface BingoCardFirebase{
    dataBingo: BingoFirebase[]
}
