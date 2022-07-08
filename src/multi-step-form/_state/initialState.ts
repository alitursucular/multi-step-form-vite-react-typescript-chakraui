import { StepIdentifier, IMultiStepFormState } from "./types";

const initialMultiStepFormState: IMultiStepFormState = {
    steps: {
        [StepIdentifier.StepOne]: {
            order: 1,
            isStepAnswered: false,
            isStepActive: true,
            answer: {
                textInput1: "",
                textInput2: "",
                textInput3: "",
            },
        },
        [StepIdentifier.StepTwo]: {
            order: 2,
            isStepAnswered: false,
            isStepActive: false,
            answer: {
                textInput4: "",
                select1: {
                    value: "",
                    displayValue: "",
                },
            },
        },
        [StepIdentifier.StepThree]: {
            order: 3,
            isStepAnswered: false,
            isStepActive: false,
            answer: {
                radioInput1: {
                    value: "",
                    displayValue: "",
                },
                select2: {
                    value: "",
                    displayValue: "",
                },
            },
        },
        [StepIdentifier.StepFour]: {
            order: 4,
            isStepAnswered: false,
            isStepActive: false,
            answer: {
                radioInput2: {
                    value: "",
                    displayValue: "",
                },
                checkboxInput1: {
                    value: [],
                    displayValue: "",
                },
            },
        },
        [StepIdentifier.StepFive]: {
            order: 5,
            isStepAnswered: false,
            isStepActive: false,
        },
    },
    isCompleted: false,
};

export default initialMultiStepFormState;
