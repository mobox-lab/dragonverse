export class Path {


    public loop: boolean = false;

    private _waypoints: mw.Vector[] = [];

    private _index = 0;



    add(wayPoint: mw.Vector) {

        this._waypoints.push(wayPoint);
        return this;
    }

    clear() {
        this._waypoints.length = 0;
        this._index = 0;
        return this;
    }

    current(): mw.Vector {
        return this._waypoints[this._index];
    }


    finished() {
        const lastIndex = this._waypoints.length - 1;

        return (this.loop === true) ? false : (this._index === lastIndex);
    }


    advance() {
        this._index++;

        if ((this._index === this._waypoints.length)) {

            if (this.loop === true) {

                this._index = 0;

            } else {

                this._index--;

            }

        }

        return this;
    }


}