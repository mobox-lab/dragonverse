

@mw.Component
export default class MovementController extends mw.Script {

    protected onStart(): void {

    }


    @mw.RemoteFunction(mw.Server)
    public addImpulse(character: mw.Character, impulse: mw.Vector) {
        character.addImpulse(impulse, true);
    }


}