import React from "react";
import { Box, Text, Button, FormControl, Input, Select, Stack } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";
import { MultiStepFormActionTypes } from "../_state/actions";
import { StepIdentifier, IMultiStepFormState } from "../_state/types";

const StepTwo: React.FC = () => {
    const { state, dispatch } = useMultiStepFormContext();

    //Fully typed, shorter spelling of the step name for easy access
    const step = state["steps"][StepIdentifier.StepTwo];

    const [localState, setLocalState] = React.useState<IMultiStepFormState["steps"][StepIdentifier.StepTwo]["answer"]>(
        step.answer,
    );

    const selectOptions: { [key: string]: string } = {
        AA: "Option AA",
        BB: "Option BB",
        CC: "Option CC",
        DD: "Option DD",
        EE: "Option EE",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalState({ ...localState, textInput4: e.currentTarget.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setLocalState({
            ...localState,
            select1: { ...localState.select1, displayValue: e.currentTarget.value },
        });
    };

    const processAndGoToNext = (): void => {
        dispatch({
            type: MultiStepFormActionTypes.SET_STEP_TWO,
            payload: {
                ...step,
                answer: {
                    ...step.answer,
                    textInput4: localState.textInput4,
                    select1: {
                        value: localState.select1.displayValue,
                        displayValue:
                            Object.keys(selectOptions).find(
                                (key) => selectOptions[key] === localState.select1.displayValue,
                            ) ?? "",
                    },
                },
            },
        });

        dispatch({
            type: MultiStepFormActionTypes.LOAD_NEXT_STEP,
        });
    };

    const goBack = (): void => {
        dispatch({
            type: MultiStepFormActionTypes.LOAD_PREV_STEP,
        });
    };

    return (
        <>
            <Box>
                <Text>StepTwo text/question goes here...</Text>
            </Box>
            <Box>
                <FormControl mb={2}>
                    <Input
                        defaultValue={localState.textInput4}
                        name="textInput4"
                        onChange={handleInputChange}
                        placeholder="Text Input 4"
                    />
                </FormControl>
                <FormControl>
                    <Select
                        placeholder="Placeholder..."
                        name="select1"
                        onChange={handleSelectChange}
                        defaultValue={localState.select1.value}
                    >
                        {Object.values(selectOptions).map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Stack direction="row" spacing={3} ml="auto">
                <Button variant="outline" onClick={goBack}>
                    Back
                </Button>
                <Button colorScheme="teal" onClick={processAndGoToNext}>
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default StepTwo;
