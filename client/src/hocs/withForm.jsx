import React, { useState } from 'react';

const withForm = (Cmp, initialState, schema) => {
  return (props) => {
    const [state, setState] = useState({
      form: initialState,
      errors: undefined,
    });

    const changeHandlerFactory = (name) => {
      let id;
      return (e) => {
        if (id) {
          clearTimeout(id);
          id = null;
        }
        const newValue = e.target.value;
        // id = setTimeout(() => {
        setState(({ form }) => {
          return { form: { ...form, [name]: newValue } };
        });
        // }, 300);
      };
    };

    const runValidations = () => {
      return schema
        .validate(state.form, { abortEarly: false })
        .then(() => {
          setState({ ...state, errors: undefined });
          return state.form;
        })
        .catch((err) => {
          const errors = err.inner.reduce((acc, { path, message }) => {
            acc[path] = acc[path] ? [...acc[path], message] : [message];
            return acc;
          }, {});
          setState({ ...state, errors });
        });
    };

    const formIsInvalid = () => {
      return !schema.isValidSync(state.form);
    };

    const runInputValidation = (inputName) => {
      return () => {
        return schema
          .validate(state.form, { abortEarly: false })
          .catch((err) => {
            const inputError = err.inner.find((e) => e.path === inputName);
            if (inputError)
              setState({
                ...state,
                errors: { [inputError.path]: [inputError.message] },
              });
          });
      };
    };



    return (
      <Cmp
        {...props}
        changeHandlerFactory={changeHandlerFactory}
        runValidations={runValidations}
        runInputValidation={runInputValidation}
        formIsInvalid={formIsInvalid}
        formState={state}
      />
    );
  };
};

export default withForm;
