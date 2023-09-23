export default interface InterventionType {
    id:number,
    panneId:number,
    panne: string,
    sousSystemeId:number,
    sousSysteme: string,
    equipementId:number,
    equipement: string,
    etatEquipementInitial: string,
    demanderPar: string,
    executant?: string,
    debutIntervention?: string,
    finIntervention?: string,
    etatEquipementFinal?: string,
    observation?: string,
    etat: string
}