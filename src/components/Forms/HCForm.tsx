import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type THCFormProvider = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
}

const HCForm = ({ children, onSubmit }: THCFormProvider) => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const submitHandler: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitHandler)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default HCForm;