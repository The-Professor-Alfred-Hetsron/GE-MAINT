interface PieceType {
    id?:number,
    nom: string,
    marque_fabricant: string,
    numero_serie: string,
    modele: string,
    stock: number,
    minimum_stock: number,
    description: string,
    image: string | ArrayBuffer | undefined
}

export default interface StockType {
    equipId:number,
    nomEquipement: string,
    nomSousSysteme: string,
    subSysId:number,
    listePieces: Array<PieceType>
}