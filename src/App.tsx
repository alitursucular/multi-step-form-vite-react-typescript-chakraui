import React from "react";
import { Box, Button, Code, Container, Grid, GridItem, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import useMultiStepForm from "./multi-step-form";
import { syntaxHighlight } from "./utils/syntaxHighlight";

const App: React.FC = () => {
    const { state, MultiStepForm } = useMultiStepForm();

    const toast = useToast();

    const [scrollable, setScrollable] = React.useState(true);

    const { isCompleted } = state;

    React.useEffect(() => {
        if (isCompleted) {
            toast({
                position: "top-right",
                title: "Nice job!",
                description: "Fancy giving stars to my repo?",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isCompleted]);

    return (
        <>
            <Container maxW="container.xl" pt={4}>
                <Grid templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }} gap={4}>
                    <GridItem colSpan={3}>
                        <Stack>
                            <Heading as="h2" size="md">
                                Multi-step form component
                            </Heading>
                            <Text fontSize="sm">
                                <Code
                                    dangerouslySetInnerHTML={{
                                        __html: "const { state, MultiStepForm } = useMultiStepForm();",
                                    }}
                                />{" "}
                                is all you need!
                                <br />
                                This custom hook returns the <Code>MultiStepForm</Code> component and the{" "}
                                <Code>state</Code> object.
                            </Text>
                            <Box pos="relative" border="1px" borderColor="gray.300" rounded="md" p={4}>
                                <MultiStepForm />
                            </Box>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Stack>
                            <Heading as="h2" size="md">
                                Multi-step form state in real-time
                            </Heading>
                            <Text fontSize="sm">
                                <Code>useContext</Code> and <Code>useReducer</Code> hooks pattern is used for managing
                                the state.
                            </Text>
                            <Box position="relative" bg="#1c1c1c" rounded="md">
                                <Button
                                    size="xs"
                                    colorScheme="teal"
                                    position="absolute"
                                    right={0}
                                    m={4}
                                    onClick={() => setScrollable(!scrollable)}
                                >
                                    {!scrollable ? "Enable" : "Disable"} scrolling
                                </Button>
                                <Box
                                    p={4}
                                    as="pre"
                                    fontSize={14}
                                    color="white"
                                    dangerouslySetInnerHTML={{
                                        __html: syntaxHighlight(JSON.stringify(state, undefined, 4)),
                                    }}
                                    sx={{
                                        textAlign: "left",
                                        whiteSpace: "pre-wrap",
                                        "& .string": { color: "#d98e73" },
                                        "& .number": { color: "#afcfa4" },
                                        "& .boolean": { color: "#3a98d6" },
                                        "& .null": { color: "#ea68dc" },
                                        "& .key": { color: "#92c6eb" },
                                        ...(scrollable && {
                                            maxHeight: 400,
                                            overflowY: "scroll",
                                        }),
                                    }}
                                />
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
};

export default App;
