import { ExceptionFormatter } from './ExceptionFormatter';

export class StateMachineNotInitializedException extends Error {

    static format(context: string = null, problem: string = null, solution: string = null) {

        if (problem == null) {
            problem = 'The active state is null because the state machine has not been set up yet.';
        }

        if (solution == null) {
            solution = 'call fsm.setStartState(...) and fsm.init() or fsm.enter() '
                + 'to initialize the state machine.';
        }

        return ExceptionFormatter.format(context, problem, solution);
    }

    public constructor(
        context?: string,
        problem?: string,
        solution?: string
    ) {
        super(StateMachineNotInitializedException.format(context, problem, solution));
    }
}
