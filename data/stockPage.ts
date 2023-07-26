import PieceType from "@/types/stock"
import StockType from "@/types/stock"

export const apiStockDataList:Array<StockType> = [
    {
        nomEquipement: "Nom Equipement1",
        nomSousSysteme: "Nom Sous système1",
        listePieces: [
            {
                nom: "Nom Piece1",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                qteStock: 10,
                qteMin: 2,
                description: "Le Meilleur Sous Système au monde",
                image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
            },
            {
                nom: "Nom Piece2",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                qteStock: 10,
                qteMin: 2,
                description: "Le Meilleur Sous Système au monde",
                image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
            }
        ]
    },
    {
        nomEquipement: "Nom Equipement1",
        nomSousSysteme: "Nom Sous système2",
        listePieces: [
            {
                nom: "Nom Piece1",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                qteStock: 10,
                qteMin: 2,
                description: "Le Meilleur Sous Système au monde",
                image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro1.png"
            },
            {
                nom: "Nom Piece2",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                qteStock: 10,
                qteMin: 2,
                description: "Le Meilleur Sous Système au monde",
                image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro2.png"
            },
            {
                nom: "Nom Piece2",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                qteStock: 10,
                qteMin: 2,
                description: "Le Meilleur Sous Système au monde",
                image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro1.png"
            }
        ]
    }
]