import React from "react";
import { MultiStepFormActionTypes } from "./actions";
import { StepIdentifier, IMultiStepFormState } from "./types";
import initialMultiStepFormState from "./initialState";

export interface ISetStepOneAction {
    type: MultiStepFormActionTypes.SET_STEP_ONE;
    payload: IMultiStepFormState["steps"][StepIdentifier.StepOne];
}

export interface ISetStepTwoAction {
    type: MultiStepFormActionTypes.SET_STEP_TWO;
    payload: IMultiStepFormState["steps"][StepIdentifier.StepTwo];
}

export interface ISetStepThreeAction {
    type: MultiStepFormActionTypes.SET_STEP_THREE;
    payload: IMultiStepFormState["steps"][StepIdentifier.StepThree];
}

export interface ISetStepFourAction {
    type: MultiStepFormActionTypes.SET_STEP_FOUR;
    payload: IMultiStepFormState["steps"][StepIdentifier.StepFour];
}

export interface ISetStepFiveAction {
    type: MultiStepFormActionTypes.SET_STEP_FIVE;
    payload: IMultiStepFormState["steps"][StepIdentifier.StepFive];
}

export interface ILoadNextStepAction {
    type: MultiStepFormActionTypes.LOAD_NEXT_STEP;
}

export interface ILoadPrevStepAction {
    type: MultiStepFormActionTypes.LOAD_PREV_STEP;
}

export interface IResetAction {
    type: MultiStepFormActionTypes.RESET;
}

export type MultiStepFormActions =
    | ISetStepOneAction
    | ISetStepTwoAction
    | ISetStepThreeAction
    | ISetStepFourAction
    | ISetStepFiveAction
    | ILoadNextStepAction
    | ILoadPrevStepAction
    | IResetAction;

export const reducer: React.Reducer<IMultiStepFormState, MultiStepFormActions> = (state, action) => {
    const { steps } = state;

    switch (action.type) {
        case MultiStepFormActionTypes.LOAD_NEXT_STEP: {
            const activeStep = Object.keys(steps).find(
                (f) => steps[f as StepIdentifier].isStepActive,
            ) as StepIdentifier;

            const activeStepOrder = steps[activeStep].order;

            const nextStep = Object.keys(steps).find(
                (f) => steps[f as StepIdentifier].order === activeStepOrder + 1,
            ) as StepIdentifier | undefined;

            if (nextStep && activeStepOrder >= 1) {
                return {
                    ...state,
                    steps: {
                        ...steps,
                        [activeStep]: {
                            ...state.steps[activeStep],
                            isStepActive: false,
                            isStepAnswered: true,
                        },
                        [nextStep]: {
                            ...state.steps[nextStep],
                            isStepActive: true,
                        },
                    },
                };
            } else if (!nextStep) {
                return {
                    ...state,
                    steps: {
                        ...steps,
                        [activeStep]: {
                            ...state.steps[activeStep],
                            isStepActive: false,
                            isStepAnswered: true,
                        },
                    },
                    isCompleted: true,
                };
            } else {
                // Next step not found
                return state;
            }
        }
        case MultiStepFormActionTypes.LOAD_PREV_STEP: {
            const activeStep = Object.keys(steps).find(
                (f) => steps[f as StepIdentifier].isStepActive,
            ) as StepIdentifier;

            const activeStepOrder = steps[activeStep].order;

            const prevStep = Object.keys(steps).find(
                (f) => steps[f as StepIdentifier].order === activeStepOrder - 1,
            ) as StepIdentifier | undefined;

            if (prevStep && activeStepOrder > 1) {
                return {
                    ...state,
                    steps: {
                        ...steps,
                        [activeStep]: {
                            ...state.steps[activeStep],
                            isStepActive: false,
                        },
                        [prevStep]: {
                            ...state.steps[prevStep],
                            isStepActive: true,
                            isStepAnswered: false,
                        },
                    },
                };
            } else {
                // Previous step not found
                return state;
            }
        }
        case MultiStepFormActionTypes.RESET: {
            return initialMultiStepFormState;
        }
        case MultiStepFormActionTypes.SET_STEP_ONE: {
            return {
                ...state,
                steps: {
                    ...steps,
                    [StepIdentifier.StepOne]: {
                        ...action.payload,
                    },
                },
            };
        }
        case MultiStepFormActionTypes.SET_STEP_TWO: {
            return {
                ...state,
                steps: {
                    ...steps,
                    [StepIdentifier.StepTwo]: {
                        ...action.payload,
                    },
                },
            };
        }
        case MultiStepFormActionTypes.SET_STEP_THREE: {
            return {
                ...state,
                steps: {
                    ...steps,
                    [StepIdentifier.StepThree]: {
                        ...action.payload,
                    },
                },
            };
        }
        case MultiStepFormActionTypes.SET_STEP_FOUR: {
            return {
                ...state,
                steps: {
                    ...steps,
                    [StepIdentifier.StepFour]: {
                        ...action.payload,
                    },
                },
            };
        }
        case MultiStepFormActionTypes.SET_STEP_FIVE: {
            return {
                ...state,
                steps: {
                    ...steps,
                    [StepIdentifier.StepFive]: action.payload,
                },
            };
        }
        default:
            return state;
    }
};

interface IMultiStepFormContextProps {
    state: IMultiStepFormState;
    dispatch: React.Dispatch<MultiStepFormActions>;
}

export const MultiStepFormContext = React.createContext<IMultiStepFormContextProps>({
    state: initialMultiStepFormState,
    dispatch: () => null,
});

export const useMultiStepFormContext = (): IMultiStepFormContextProps => React.useContext(MultiStepFormContext);
