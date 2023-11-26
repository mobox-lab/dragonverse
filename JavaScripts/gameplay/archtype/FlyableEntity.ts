import PetEntity from "./PetEntity";

@mw.Component
export default class FlyableEntity extends PetEntity {


    public acceleration: mw.Vector = new mw.Vector();

    public velocity: mw.Vector = new mw.Vector();

    @mw.Property({ displayName: '最大飞行速度' })
    public maxSpeed: number = 100;

    @mw.Property({ displayName: '最小飞行速度' })

    public minSpeed: number = 100;

    @mw.Property({ displayName: '最大转向角度' })
    public maxTurnAngle: number = 10;


}