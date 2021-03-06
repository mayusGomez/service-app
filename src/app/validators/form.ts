import { ValidatorFn, AbstractControl } from '@angular/forms';

export class FormValidations {

    static areEqual(field_name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const input = control.value;
            const isValid = control.root.value[field_name] === input;
            if (!isValid) {
                return {'areEqual': {isValid}};
            } else {
                return null;
            }
        };
    }
}

