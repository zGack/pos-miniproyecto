// import {useEffect, useMemo, useState} from "react"

import { useEffect, useMemo, useState } from "react";

// https://react-hook-form.com/get-started

// Este archivo se usa para crear formularios en react rapidamente

export const UserForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({});
  // useEffect(() => {
  //   createValidators();
  // }, [formState]);

  // Inicializa UserForm con el objeto que hay en initialForm
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // const isFormValid = useMemo(() => {
  //   for (const formValue of Object.keys(formValidation)) {
  //     if (formValidation[formValue] !== null) return false;
  //   }
  //   return true;
  // }, [formValidation]);

  // Actualiza el valor del input que esta utilizando el usuario
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState, // deja los demas valores igual
      [name]: value // actualiza el valor del campo que esta usando el usuario
    });
  };

  // Borra la informacion que haya en los inputs
  const onResetForm = () => {
    setFormState(initialForm);
  };

  // const createValidators = () => {
  //   const formCheckedValues = {};

  //   for (const formField of Object.keys(formValidations)) {
  //     const [fn, errorMessage] = formValidations[formField];

  //     formCheckedValues[`${formField}Valid`] = fn(formState[formField])
  //       ? null
  //       : errorMessage;
  //   }

  //   setformValidation(formCheckedValues);
  // };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation
    // isFormValid
  };
};
