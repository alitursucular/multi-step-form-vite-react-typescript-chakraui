/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Credits } from "./external/Credits";
import { GitHubCorner } from "./external/GitHubCorner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider>
            <App />
            <Credits />
            <GitHubCorner repoUrl="https://github.com/alitursucular" />
        </ChakraProvider>
    </React.StrictMode>,
);
