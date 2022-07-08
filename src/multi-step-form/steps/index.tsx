import React, { useEffect } from "react";
import { Box, Button, Text, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useMultiStepFormContext } from "../_state/context";
import { StepIdentifier, IMultiStepFormState } from "../_state/types";
import { MultiStepFormActionTypes } from "../_state/actions";
import StepsIndicator from "../steps-indicator";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const MultiStepFormSteps: React.FC = () => {
    const {
        state: { steps, isCompleted },
        dispatch,
    } = useMultiStepFormContext();

    const [activeStep, setActiveStep] = React.useState(
        Object.keys(steps).find((step) => steps[step as keyof IMultiStepFormState["steps"]].order === 2),
    );

    useEffect(() => {
        const activeStep = Object.keys(steps).find(
            (step) => steps[step as keyof IMultiStepFormState["steps"]].isStepActive,
        );

        setActiveStep(activeStep);
    }, [steps]);

    return (
        <>
            {activeStep && (
                <>
                    <Box mt={3} mb={6}>
                        <StepsIndicator />
                    </Box>
                    <Box
                        as="form"
                        autoComplete="off"
                        height={200}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box pos="absolute" top={0} right={0}>
                            <Tooltip hasArrow label="Reset form">
                                <IconButton
                                    variant="ghost"
                                    aria-label="Reset form"
                                    icon={<RepeatIcon />}
                                    isRound
                                    onClick={() =>
                                        dispatch({
                                            type: MultiStepFormActionTypes.RESET,
                                        })
                                    }
                                />
                            </Tooltip>
                        </Box>
                        {activeStep === StepIdentifier.StepOne && <StepOne />}
                        {activeStep === StepIdentifier.StepTwo && <StepTwo />}
                        {activeStep === StepIdentifier.StepThree && <StepThree />}
                        {activeStep === StepIdentifier.StepFour && <StepFour />}
                        {activeStep === StepIdentifier.StepFive && <StepFive />}
                    </Box>
                </>
            )}
            {isCompleted && (
                <HStack justifyContent="space-between">
                    <Text fontSize="3xl">🥳 🥳 🥳</Text>
                    <Button
                        variant="outline"
                        onClick={() =>
                            dispatch({
                                type: MultiStepFormActionTypes.RESET,
                            })
                        }
                    >
                        Start over?
                    </Button>
                    <Text fontSize="3xl">🥳 🥳 🥳</Text>
                </HStack>
            )}
        </>
    );
};

export default MultiStepFormSteps;
