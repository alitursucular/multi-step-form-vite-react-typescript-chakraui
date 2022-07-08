import React from "react";
import { MultiStepFormContext, reducer } from "./_state/context";
import initialMultiStepFormState from "./_state/initialState";
import MultiStepFormSteps from "./steps";

const useMultiStepForm = () => {
    const [state, dispatch] = React.useReducer(reducer, initialMultiStepFormState);

    const MultiStepForm: React.FC = () => (
        <MultiStepFormContext.Provider value={{ state, dispatch }}>
            <MultiStepFormSteps />
        </MultiStepFormContext.Provider>
    );

    return { state, MultiStepForm } as const;
};

export default useMultiStepForm;
