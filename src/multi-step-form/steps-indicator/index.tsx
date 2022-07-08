import React from "react";
import { Flex, Icon, Progress } from "@chakra-ui/react";
import { useMultiStepFormContext } from "../_state/context";

/**
 * A React component that renders a progress bar with dot indicators
 * @returns {React.FC<React.HTMLProps<HTMLDivElement>>}
 */
const StepsIndicator: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
    const {
        state: { steps },
    } = useMultiStepFormContext();

    const percentage = (): number => {
        const stepsArray = Object.values(steps);
        const isActiveOrIsAnsweredArray = stepsArray.filter((step) => step.isStepActive || step.isStepAnswered);
        const isAnsweredArray = stepsArray.filter((step) => step.isStepAnswered);

        return (
            (isActiveOrIsAnsweredArray.length /
                (stepsArray.length + (isAnsweredArray.length !== stepsArray.length ? 1 : 0))) *
            100
        );
    };

    return (
        <Flex pos="relative" direction="column" justifyContent="center">
            <Progress
                pos="absolute"
                width="100%"
                zIndex={-9}
                size="xs"
                colorScheme="teal"
                isAnimated
                hasStripe
                value={percentage()}
            />
            <Flex justifyContent="space-evenly">
                {Object.values(steps)
                    .sort((a, b) => a.order - b.order)
                    .map((step, index) => (
                        <Icon
                            key={index}
                            boxSize={6}
                            color={!step.isStepActive && step.isStepAnswered ? "teal" : "gray.100"}
                            viewBox="0 0 200 200"
                        >
                            <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                            />
                        </Icon>
                    ))}
            </Flex>
        </Flex>
    );
};

export default StepsIndicator;
