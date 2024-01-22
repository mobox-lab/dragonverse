
export class ExceptionFormatter {
    static format(context: string = null, problem: string = null, solution: string = null) {

        let message = '\n';

        if (context != null) {
            message += 'context: ' + context + '\n';
        }

        if (problem != null) {
            message += 'problem: ' + problem + '\n';
        }

        if (solution != null) {
            message += 'solution: ' + solution + '\n';
        }

        return message;
    }
}