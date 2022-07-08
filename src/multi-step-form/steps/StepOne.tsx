import React from "react";
import { Box, Text, Button, Flex, FormControl, Input, Stack } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";
import { MultiStepFormActionTypes } from "../_state/actions";
import { IMultiStepFormState, StepIdentifier } from "../_state/types";

const StepOne: React.FC = () => {
    const { state, dispatch } = useMultiStepFormContext();

    //Fully typed, shorter spelling of the step name for easy access
    const step = state["steps"][StepIdentifier.StepOne];

    const [localState, setLocalState] = React.useState<IMultiStepFormState["steps"][StepIdentifier.StepOne]["answer"]>(
        step.answer,
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalState({ ...localState, [e.currentTarget.name]: e.currentTarget.value });
    };

    const processAndGoToNext = (): void => {
        dispatch({
            type: MultiStepFormActionTypes.SET_STEP_ONE,
            payload: {
                ...step,
                answer: {
                    ...step.answer,
                    ...localState,
                },
            },
        });

        dispatch({
            type: MultiStepFormActionTypes.LOAD_NEXT_STEP,
        });
    };

    return (
        <>
            <Box>
                <Text>StepOne text/question goes here...</Text>
            </Box>
            <Box>
                <FormControl mb={2}>
                    <Input
                        defaultValue={localState.textInput1}
                        name="textInput1"
                        onChange={handleInputChange}
                        placeholder="Text Input 1"
                    />
                </FormControl>
                <Stack direction="row">
                    <FormControl>
                        <Input
                            defaultValue={localState.textInput2}
                            name="textInput2"
                            onChange={handleInputChange}
                            placeholder="Text Input 2"
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            defaultValue={localState.textInput3}
                            name="textInput3"
                            onChange={handleInputChange}
                            placeholder="Text Input 3"
                        />
                    </FormControl>
                </Stack>
            </Box>
            <Flex ml="auto">
                <Button colorScheme="teal" onClick={processAndGoToNext}>
                    Next
                </Button>
            </Flex>
        </>
    );
};

export default StepOne;
