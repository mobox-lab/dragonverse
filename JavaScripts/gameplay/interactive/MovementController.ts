

@mw.Component
export default class MovementController extends mw.Script {

    protected onStart(): void {

    }

    /**
     *
     * @param character
     * @param impulse
     * @deprecated use {@link UnifiedRoleController.addImpulse}
     */
    @mw.RemoteFunction(mw.Server)
    public addImpulse(character: mw.Character, impulse: mw.Vector) {
        character.addImpulse(impulse, true);
    }


}