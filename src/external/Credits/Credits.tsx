import React from "react";
import { Box, Center, Text, Link } from "@chakra-ui/react";
import { AiFillLinkedin, AiOutlineLink } from "react-icons/ai";

export const Credits: React.FC = () => {
    return (
        <Box as="footer" mt={8}>
            <Center>
                <Text>- Developed by Ali Tursucular</Text>
                <Link
                    ml={2}
                    href="https://www.linkedin.com/in/alitursucular/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillLinkedin size="1.5em" color="#2867b2" />
                </Link>
                <Link ml={2} href="https://alitursucular.github.io">
                    <AiOutlineLink size="1.5em" color="#212529" />
                </Link>
            </Center>
        </Box>
    );
};
