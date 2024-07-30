
export class Point {
    constructor(public x: number, public y: number, public obj: any) { }
}

export class Rectangle {
    constructor(public x: number, public y: number, public w: number, public h: number) { }
    contains(point: Point) {
        return (
            point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h
        );
    }

    intersects(range: Rectangle) {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        );
    }
}


export class QuadTree {
    points: Point[] = [];
    divided: boolean = false;
    northWest: QuadTree;
    northEast: QuadTree;
    southWest: QuadTree;
    southEast: QuadTree;
    constructor(public boundary: Rectangle, public capacity: number) {

    }

    insert(point: Point) {
        if (!this.boundary.contains(point)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northWest.insert(point)) {
                return true;
            }
            else if (this.northEast.insert(point)) {
                return true;
            }
            else if (this.southWest.insert(point)) {
                return true;
            }
            else if (this.southEast.insert(point)) {
                return true;
            }
        }
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let ne = new Rectangle(x + w, y - h, w, h);
        this.northEast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northWest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southEast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southWest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }

    query(range: Rectangle, found: Point[] = []) {
        if (!this.boundary.intersects(range)) {
            return;
        }
        else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided) {
                this.northWest.query(range, found);
                this.northEast.query(range, found);
                this.southWest.query(range, found);
                this.southEast.query(range, found);
            }
        }
        return found;
    }
}