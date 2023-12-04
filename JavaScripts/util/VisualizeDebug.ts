

declare var UE: any;

interface ExPlayer extends mw.Player {

    actor?;

}


interface GameObject extends mw.GameObject {
    actor;

}

interface UEVector extends mw.Vector {

    toUEVector?();
}


const tempUEVector1 = new UE.Vector();
const tempUEVector2 = new UE.Vector();


export module VisualizeDebug {

    let world;


    export function init(player: ExPlayer) {

        world = player.actor.GetWorld();
    }


    function parseColor(color: string) {
        return UE.LinearColor.FromPow22Color(UE.Color.FromHex(color))
    }

    /**
     * 绘制线段
     * @param start 
     * @param end 
     * @param color 
     */
    export function drawLine(start: UEVector, end: UEVector, color: string = '#ffffff', time: number = -1, thickNess: number = 1) {

        UE.KismetSystemLibrary.DrawDebugLine(world, start.toUEVector(), end.toUEVector(), parseColor(color), time, thickNess);
    }


    export function drawBox(center: UEVector, size: UEVector, color: string = '#ffffff', rotation = mw.Rotation.zero, duration: number = -1, thickNess: number = 1) {

        UE.KismetSystemLibrary.DrawDebugBox(world, center.toUEVector(), size.toUEVector(), parseColor(color), (rotation as any).toUERotator(), duration, thickNess)

    }



    export function drawPlane(center: UEVector, width: number, direction: UEVector = mw.Vector.up, color: string = '#ffffff', offset: number = 100, time: number = -1) {


        const coordinate = new UE.Plane(offset);
        coordinate.Z = direction.z;
        coordinate.Y = direction.y;
        coordinate.X = direction.x;

        UE.KismetSystemLibrary.DrawDebugConeInDegrees
        UE.KismetSystemLibrary.DrawDebugPlane(world, coordinate, center.toUEVector(), width, parseColor(color), time)
    }

    export function drawArrow(start: UEVector, end: UEVector, size: number, color: string = '#ffffff', thickNess: number = 5, time: number = -1) {

        UE.KismetSystemLibrary.DrawDebugArrow(world, start.toUEVector(), end.toUEVector(), size, parseColor(color), time, thickNess);
    }

    export function drawArc(center: UEVector, from: UEVector, to: UEVector, radius: number, color: string = '#ffffff', thickNess: number = 1) {

        drawArrow(center, from.multiply(radius).add(center), 100, color, thickNess);
        drawArrow(center, to.multiply(radius).add(center), 100, color, thickNess);
    }

    export function drawCircle(location: UEVector, radius: number, color: string = '#ffffffff', thickNess: number = 1, time: number = -1) {

        tempUEVector1.X = 1;
        tempUEVector1.Y = tempUEVector1.Z = 0;
        tempUEVector2.X = tempUEVector2.Z = 0;
        tempUEVector2.Y = 1;
        UE.KismetSystemLibrary.DrawDebugCircle(world, location.toUEVector(), radius, 30, parseColor(color), time, thickNess, tempUEVector1, tempUEVector2);
    }

    export function drawCapsule(center: UEVector, halfHeight: number, radius: number, color: string = '#ffffffff', thickNess: number = 1, time: number = -1) {


        UE.KismetSystemLibrary.DrawDebugCapsule(world, center.toUEVector(), halfHeight, radius, new UE.Rotator(0, 0, 0), parseColor(color), time, thickNess);
    }


    export function drawSphere(location: UEVector, radius: number, color: string = '#ff0000', thickNess: number = 1, time: number = 10000) {

        tempUEVector1.X = 1;
        tempUEVector1.Y = tempUEVector1.Z = 0;
        tempUEVector2.X = tempUEVector2.Z = 0;
        tempUEVector2.Y = 1;
        UE.KismetSystemLibrary.DrawDebugSphere(world, location.toUEVector(), radius, 10, parseColor(color), time, thickNess);
    }

    /**绘制胶囊体 */
    export function drawDebugCapsule(location: UEVector, halfHeight: number, radius: number, rotation: mw.Rotation, color: string = '#ff0000', thickNess: number = 1, time: number = 10000) {

        tempUEVector1.X = 1;
        tempUEVector1.Y = tempUEVector1.Z = 0;
        tempUEVector2.X = tempUEVector2.Z = 0;
        tempUEVector2.Y = 1;
        UE.KismetSystemLibrary.DrawDebugCapsule(world, location.toUEVector(), halfHeight, radius,
            new UE.Rotator(), parseColor(color), time, thickNess);
    }


    export function drawPoint(location: UEVector, radius: number, color: string = '#ffffffff', time: number = -1) {


        UE.KismetSystemLibrary.DrawDebugPoint(world, location.toUEVector(), radius, parseColor(color), time);
    }

    export function drawString(location: UEVector, text: string, color: string = '#000000', parent: GameObject = null, time: number = -1) {


        UE.KismetSystemLibrary.DrawDebugString(world, location.toUEVector(), text, parent ? parent.actor : null, parseColor(color), time);
    }
}
