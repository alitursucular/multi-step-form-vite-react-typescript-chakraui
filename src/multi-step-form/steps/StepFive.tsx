import React from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";
import { MultiStepFormActionTypes } from "../_state/actions";

const StepFive: React.FC = () => {
    const { dispatch } = useMultiStepFormContext();

    const processAndComplete = (): void => {
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
            <Text>Ready to submit? 🤔</Text>
            <Stack direction="row" spacing={3} ml="auto">
                <Button variant="outline" onClick={goBack}>
                    Back
                </Button>
                <Box
                    as="button"
                    px={3}
                    color="white"
                    fontWeight="semibold"
                    borderRadius="md"
                    bgGradient="linear(to-r, teal.500, green.500)"
                    _hover={{
                        bgGradient: "linear(to-l, teal.500, green.500)",
                    }}
                    onClick={processAndComplete}
                >
                    Complete
                </Box>
            </Stack>
        </>
    );
};

export default StepFive;
