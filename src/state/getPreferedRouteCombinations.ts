import SessionData from "./sessionData";
import RouteMaskInstance from "../routeMask";

function preferredRouteCombinations(sessionData: SessionData): number[] {
    const waitingRoutes = sessionData.getRoutesWithEntitites();

    const combinations: number[][] = [];

    waitingRoutes.forEach(route => {
        let wasInvalid = false;
        [...combinations].forEach(combination => {
            let isValidToAdd = true;

            combination.forEach(otherRoute => {
                if (RouteMaskInstance.doesOverlap(route, otherRoute)) {
                    isValidToAdd = false;        
                }
            })

            if (isValidToAdd) {
                combinations.push([...combination, route]);
            }

            wasInvalid = !isValidToAdd;
        });

        combinations.push([route]);

        if (!wasInvalid) {
            [...combinations].forEach(combination => {
                let routeToPush: number = -1;

                if (route == 31 && combination.indexOf(32) == -1)
                    routeToPush = 32;

                if (route == 33 && combination.indexOf(34) == -1)
                    routeToPush = 34;

                if (route == 35 && combination.indexOf(36) == -1)
                    routeToPush = 36;

                if (route == 37 && combination.indexOf(38) == -1)
                    routeToPush = 38;


                if (route == 32 && combination.indexOf(31) == -1)
                    routeToPush = 31;

                if (route == 34 && combination.indexOf(33) == -1)
                    routeToPush = 33;

                if (route == 36 && combination.indexOf(35) == -1)
                    routeToPush = 35;

                if (route == 38 && combination.indexOf(37) == -1)
                    routeToPush = 37;

                // console.log(`Complimentary road ${routeToPush}`);

                if (routeToPush != -1) {
                    let isValidToAdd = true;

                    combination.forEach(otherRoute => {
                        if (RouteMaskInstance.doesOverlap(routeToPush, otherRoute)) {
                            // console.log(`Invalid because of road ${otherRoute}`);
                            isValidToAdd = false;        
                        }
                    })
        
                    if (isValidToAdd) {
                        // console.log(`Valid`);
                        combinations.push([...combination, routeToPush]);
                    }
                }
            });
        }

        
    })
    
    const scores = combinations.map(combination => {
        return combination.reduce((accumulator, route) =>
            accumulator + (sessionData.getRouteCount(route) == 0 ? 10 : sessionData.getRouteCount(route)) + (sessionData.getRoutesWaitedSequences(route) ?? 0), 0
        ) + combinations.length;
    })

    const mappedScores: {c: number[], s : number}[] = [];
    combinations.forEach((combination, index) => {
        mappedScores.push({
            c: combination,
            s: scores[index],
        })
    });

    //console.log(mappedScores);

    const preferredRoutes = combinations[scores.indexOf(Math.max(...scores, 0))];

    return preferredRoutes;
}

export default preferredRouteCombinations;