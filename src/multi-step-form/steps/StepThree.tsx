import React from "react";
import { Box, Text, Button, FormControl, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";
import { MultiStepFormActionTypes } from "../_state/actions";
import { StepIdentifier, IMultiStepFormState } from "../_state/types";

const StepOne: React.FC = () => {
    const { state, dispatch } = useMultiStepFormContext();

    //Fully typed, shorter spelling of the step name for easy access
    const step = state["steps"][StepIdentifier.StepThree];

    const [localState, setLocalState] = React.useState<
        IMultiStepFormState["steps"][StepIdentifier.StepThree]["answer"]
    >(step.answer);

    const selectOptions: { [key: string]: string } = {
        FF: "Option FF",
        GG: "Option GG",
        HH: "Option HH",
        II: "Option II",
        JJ: "Option JJ",
    };

    const radioOptions: { [key: string | number]: string } = {
        0: "Radio 1",
        1: "Radio 2",
        2: "Radio 3",
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalState({
            ...localState,
            select2: { ...localState.select2, displayValue: e.currentTarget.value },
        });
    };

    const handleRadioChange = (nextValue: string) => {
        setLocalState({
            ...localState,
            radioInput1: { ...localState.radioInput1, value: nextValue },
        });
    };

    const processAndGoToNext = (): void => {
        dispatch({
            type: MultiStepFormActionTypes.SET_STEP_THREE,
            payload: {
                ...step,
                answer: {
                    ...step.answer,
                    radioInput1: {
                        value: localState.radioInput1.value,
                        displayValue: radioOptions[localState.radioInput1.value],
                    },
                    select2: {
                        value: localState.select2.displayValue,
                        displayValue:
                            Object.keys(selectOptions).find(
                                (key) => selectOptions[key] === localState.select2.displayValue,
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
                <Text>StepThree text/question goes here...</Text>
            </Box>
            <Box>
                <FormControl mb={2}>
                    <RadioGroup
                        name="radioInput1"
                        defaultValue={localState.radioInput1.value}
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
                    <Select
                        placeholder="Placeholder..."
                        name="select2"
                        onChange={handleSelectChange}
                        defaultValue={localState.select2.value}
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

export default StepOne;
