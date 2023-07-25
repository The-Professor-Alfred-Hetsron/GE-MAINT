export default interface InterventionType {
    panne: string,
    sousSysteme: string,
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