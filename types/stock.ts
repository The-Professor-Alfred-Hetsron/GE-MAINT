interface PieceType {
    nom: string,
    marque: string,
    numSerie: string,
    modele: string,
    localisation: string,
    qteStock: number,
    qteMin: number,
    description: string,
    image: string | ArrayBuffer | undefined
}

export default interface StockType {
    nomEquipement: string,
    nomSousSysteme: string,
    listePieces: Array<PieceType>
}