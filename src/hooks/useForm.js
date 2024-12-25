import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        // Cada vez que se dé un cambio en el form, invocamos esta función
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false
        };
        return true
    }, [formValidation]) 

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for(const formField of Object.keys(formValidations)){
            // Destructuring de cada validator recibido
            const [validationFunction, errorMessage] = formValidations[formField];
            // Lo único que necesitamos es que la fx retorne un valor booleano (true || false)

            // Ahora, creamos nuevas keys en formCheckedValues en las que consta el resultado de las evaluaciones a los diferentes campos del form (almacenados en formState): displayNameValid, passwordValid, emailValid
            formCheckedValues[`${formField}Valid`] = validationFunction(formState[formField])? null : errorMessage;
            // El resultado (ej): emailValid: null || errorMessage
        }
        // Finalmente, establecemos los resultados como el contenido de formValidation
        setFormValidation(formCheckedValues)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        formValidation,
        isFormValid,
    }
}