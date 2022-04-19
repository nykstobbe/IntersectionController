class RouteMask {
    private routes: Map<number, Set<number>>;

    public constructor() {
        this.routes = new Map();

        this.mask(1, 5, 9, 21, 24, 31, 38);
        this.mask(2, 5, 9, 10, 11, 12, 21, 23, 31, 36);
        this.mask(3, 5, 7, 8, 11, 12, 15, 21, 22, 31, 34);
        this.mask(4, 8, 12, 15, 21, 22, 32, 33);
        this.mask(5, 1, 2, 3, 8, 9, 11, 12, 15, 22, 23, 24, 33, 36, 38);
        this.mask(7, 3, 11, 14, 22, 23, 34, 35);
        this.mask(8, 3, 4, 5, 11, 12, 21, 23, 32, 35);
        this.mask(9, 1, 2, 5, 11, 12, 23, 24, 35, 38);
        this.mask(10, 2, 23, 24, 36, 37);
        this.mask(11, 2, 3, 5, 7, 8, 9, 15, 22, 24, 34, 37);
        this.mask(12, 2, 3, 4, 5, 8, 9, 21, 24, 32, 37);
        this.mask(15, 3, 4, 5, 7, 11);
        this.mask(21, 1, 2, 3, 4, 8, 12);
        this.mask(22, 3, 4, 5, 7, 11);
        this.mask(23, 2, 5, 7, 8, 9, 10);
        this.mask(24, 1, 5, 9, 10, 11, 12);
        this.mask(31, 1, 2, 3);
        this.mask(32, 4, 8, 12);
        this.mask(33, 4, 5);
        this.mask(34, 3, 7, 11);
        this.mask(35, 7, 8, 9);
        this.mask(36, 2, 5, 10);
        this.mask(37, 10, 11, 12);
        this.mask(38, 1, 5, 9);
        this.mask(41, 42);
        this.mask(42, 41);
    }

    private mask(route: number, ...args: number[]) : void {
        if (this.routes.get(route) == undefined) {
            this.routes.set(route, new Set());
        }

        args.forEach((arg) => {
            this.routes.get(route)!.add(arg);
        })

        args.forEach((arg) => {
            if (this.routes.get(arg) == undefined) {
                this.routes.set(arg, new Set());
            }

            this.routes.get(arg)!.add(route);
        })
    }

    public getMask(route: number): Set<number> {
        return this.routes.get(route)!;
    }
    
    public doesOverlap(routeA: number, routeB: number): boolean {
        return Array.from(this.routes.get(routeA)!.values()).includes(routeB);
    }
}

const RouteMaskInstance = new RouteMask();

export default RouteMaskInstance as RouteMask;