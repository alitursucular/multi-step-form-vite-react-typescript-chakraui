export enum StepIdentifier {
    StepOne = "stepOne",
    StepTwo = "stepTwo",
    StepThree = "stepThree",
    StepFour = "StepFour",
    StepFive = "StepFive",
}

export interface IMultiStepFormState {
    steps: {
        [StepIdentifier.StepOne]: {
            order: number;
            isStepAnswered: boolean;
            isStepActive: boolean;
            answer: {
                textInput1: string;
                textInput2: string;
                textInput3: string;
            };
        };
        [StepIdentifier.StepTwo]: {
            order: number;
            isStepAnswered: boolean;
            isStepActive: boolean;
            answer: {
                textInput4: string;
                select1: {
                    value: string;
                    displayValue: string;
                };
            };
        };
        [StepIdentifier.StepThree]: {
            order: number;
            isStepAnswered: boolean;
            isStepActive: boolean;
            answer: {
                radioInput1: {
                    value: string;
                    displayValue: string;
                };
                select2: {
                    value: string;
                    displayValue: string;
                };
            };
        };
        [StepIdentifier.StepFour]: {
            order: number;
            isStepAnswered: boolean;
            isStepActive: boolean;
            answer: {
                radioInput2: {
                    value: string;
                    displayValue: string;
                };
                checkboxInput1: {
                    value: string[];
                    displayValue: string;
                };
            };
        };
        [StepIdentifier.StepFive]: {
            order: number;
            isStepAnswered: boolean;
            isStepActive: boolean;
        };
    };
    isCompleted: boolean;
}
