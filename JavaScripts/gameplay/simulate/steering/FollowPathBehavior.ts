import { Path } from "../../../util/Path";
import { ArriveBehavior } from "./ArriveBehavior";
import { SeekBehavior } from "./SeekBehavior";
import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

export class FollowPathBehavior extends SteeringBehavior {


    public path: Path;

    public nextWaypointDistance;


    private _arrive: ArriveBehavior = new ArriveBehavior();

    private _seek: SeekBehavior = new SeekBehavior();


    public calculate(agent: SteeringTarget, force: mw.Vector): mw.Vector {
        const path = this.path;


        const distanceSq = mw.Vector.squaredDistance(path.current(), agent.position);

        if (distanceSq < (this.nextWaypointDistance * this.nextWaypointDistance)) {

            path.advance();

        }

        const target = path.current();

        if (path.finished() === true) {

            this._arrive.target = target;
            this._arrive.calculate(agent, force);

        } else {

            this._seek.target = target;
            this._seek.calculate(agent, force);

        }

        return force;
    }

}