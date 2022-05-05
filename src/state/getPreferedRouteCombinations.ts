import SessionData from "./sessionData";
import RouteMaskInstance from "../routeMask";

function preferredRouteCombinations(sessionData: SessionData): number[] {
    const waitingRoutes = sessionData.getRoutesWithEntitites();

    const combinations: number[][] = [];

    waitingRoutes.forEach(route => {
        [...combinations].forEach(combination => {
            let isValidToAdd = true;

            combination.forEach(otherRoute => {
                if (RouteMaskInstance.doesOverlap(route, otherRoute)) {
                    isValidToAdd = false;        
                }
            })

            if (isValidToAdd) {
                combinations.push([...combination, route])
            }
        });

        combinations.push([route])
    })
    
    
    const scores = combinations.map(combination => {
        return combination.reduce((accumulator, route) =>
            accumulator + sessionData.getRouteCount(route), 0
        )
    })

    const mappedScores: {c: number[], s : number}[] = [];
    combinations.forEach((combination, index) => {
        mappedScores.push({
            c: combination,
            s: scores[index],
        })
    });

    const preferredRoutes = combinations[scores.indexOf(Math.max(...scores, 0))];

    return preferredRoutes;
}

export default preferredRouteCombinations;