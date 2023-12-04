import { SteeringBehavior } from "./SteeringBehavior";
import { SteeringTarget } from "./SteeringTarget";

const tempTransform = new mw.Transform();
const desiredVelocity = new mw.Vector();

class Sensor {


    public worldDirection: mw.Vector = new mw.Vector();

    public rotation: mw.Rotation;

    public length: number;

    public safe: boolean = true;

    public distance = Number.MAX_SAFE_INTEGER;;

    public update(origin: mw.Vector, originRotation: mw.Rotation, source: string[]) {


        this.distance = Number.MAX_SAFE_INTEGER;
        this.safe = true;
        tempTransform.rotation.set(originRotation);
        tempTransform.position.set(origin);

        this.rotation.getForce(desiredVelocity);
        desiredVelocity.multiply(this.length);
        let worldPosition = tempTransform.transformPosition(desiredVelocity);

        this.worldDirection.set(worldPosition).subtract(origin).normalize();
        let result = mw.QueryUtil.lineTrace(origin, worldPosition, false, false, source);

        let color = result.length > 0 ? "#ff0000" : "#00ff00";
        if (result.length > 0) {

            this.distance = result[0].distance;
            this.safe = false;
        }

        //        VisualizeDebug.drawLine(origin, worldPosition, color);
        return this.safe;

    }


    public reverse() {

        let sensor = new Sensor();

        sensor.rotation = this.rotation.getInverse();
        sensor.length = this.length;
        sensor.safe = this.safe;

        return sensor;

    }
}



interface SensorConfig {

    rotation: mw.Rotation;

    length: number
}


export class ObstacleAvoidanceBehavior extends SteeringBehavior {

    private _sensors: Sensor[] = [];

    private _center: Sensor;


    constructor(sensor: SensorConfig[], public ignoreGuid: string[] = []) {

        super();

        sensor.forEach((value) => {

            let s = new Sensor();
            s.rotation = value.rotation;
            s.length = value.length;
            this._sensors.push(s, s.reverse());
        })

        let center = this._center = new Sensor();
        center.rotation = mw.Rotation.zero;
    }


    public calculate(target: SteeringTarget, force: mw.Vector): mw.Vector {

        this._center.length = target.maxSpeed;
        let isSafe = this._center.update(target.position, target.rotation, this.ignoreGuid);

        let shortestDistance = this._center.distance;
        let factor = 1;
        if (!isSafe) {
            factor = shortestDistance / target.maxSpeed;
        }

        for (const sensor of this._sensors) {



            if (!sensor.update(target.position, target.rotation, this.ignoreGuid)) {
                let distance = sensor.distance;
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    factor = shortestDistance / sensor.length;
                }
                isSafe = false;
            }
        }


        if (!isSafe) {

            this.findSafePath(target, desiredVelocity, 1 / factor);

            return force.set(desiredVelocity).subtract(target.velocity);

        } else {

            return force;
        }

    }



    private findSafePath(target: SteeringTarget, outer: mw.Vector, factor: number) {
        for (const sensor of this._sensors) {

            if (sensor.safe) {

                outer.set(sensor.worldDirection).multiply(target.velocity.length * factor);
                return;
            }
        }

        outer.set(target.position).multiply(-1).multiply(target.maxSpeed);

        return
    }





}