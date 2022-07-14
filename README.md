# Over-engineered multi-step form
Over-engineered multi-step form built with React, TypeScript, Chakra UI and Vite. I used `useContext` and `useReducer` hooks pattern for managing the state. The form skeleton is wrapped in a custom hook:

```js
const { state, MultiStepForm } = useMultiStepForm();
```

The demo shows the simplest use case using the most common form elements. You can use this template to add & customize steps, bring in your styles and achieve a complex flow.

🚀 See it in action: [https://alitursucular.github.io/multi-step-form-vite-react-typescript-chakraui](https://alitursucular.github.io/multi-step-form-vite-react-typescript-chakraui)

## Run this project on your local:

```bash
$ git clone git@github.com:alitursucular/multi-step-form-vite-react-typescript-chakraui.git
$ cd multi-step-form-vite-react-typescript-chakraui
$ yarn && yarn dev
```

Note: This project uses nvm (for Mac users), and the required node version can be found in _.nvmrc_