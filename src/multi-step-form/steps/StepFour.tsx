import React from "react";
import { Box, Text, Button, Checkbox, CheckboxGroup, FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";
import { MultiStepFormActionTypes } from "../_state/actions";
import { IMultiStepFormState, StepIdentifier } from "../_state/types";

const StepFour: React.FC = () => {
    const { state, dispatch } = useMultiStepFormContext();

    //Fully typed, shorter spelling of the step name for easy access
    const step = state["steps"][StepIdentifier.StepFour];

    const [localState, setLocalState] = React.useState<IMultiStepFormState["steps"][StepIdentifier.StepFour]["answer"]>(
        step.answer,
    );

    const radioOptions: { [key: string | number]: string } = {
        3: "Radio 4",
        4: "Radio 5",
        5: "Radio 6",
    };

    const checkboxOptions: { [key: string | number]: string } = {
        0: "Check 1",
        1: "Check 2",
        2: "Check 3",
    };

    const handleRadioChange = (nextValue: string) => {
        setLocalState({
            ...localState,
            radioInput2: { ...localState.radioInput2, value: nextValue },
        });
    };

    const handleCheckboxChange = (value: string[]): void => {
        setLocalState({
            ...localState,
            checkboxInput1: { ...localState.checkboxInput1, value },
        });
    };

    const processAndGoToNext = (): void => {
        dispatch({
            type: MultiStepFormActionTypes.SET_STEP_FOUR,
            payload: {
                ...step,
                answer: {
                    ...step.answer,
                    radioInput2: {
                        value: localState.radioInput2.value,
                        displayValue: radioOptions[localState.radioInput2.value],
                    },
                    checkboxInput1: {
                        value: localState.checkboxInput1.value,
                        displayValue: localState.checkboxInput1.value.map((val) => checkboxOptions[val]).join(", "),
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
                <Text>StepFour text/question goes here...</Text>
            </Box>
            <Box>
                <FormControl mb={2}>
                    <RadioGroup
                        name="radioInput2"
                        defaultValue={localState.radioInput2.value}
                        onChange={handleRadioChange}
                    >
                        <Stack direction="row" spacing={16}>
                            {Object.entries(radioOptions).map(([key, value], index) => (
                                <Radio key={index} value={key}>
                                    {value}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <CheckboxGroup defaultValue={localState.checkboxInput1.value} onChange={handleCheckboxChange}>
                        <Stack direction="row" spacing={16}>
                            {Object.entries(checkboxOptions).map(([key, value], index) => (
                                <Checkbox key={index} name="checkboxInput1" value={key}>
                                    {value}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
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

export default StepFour;
