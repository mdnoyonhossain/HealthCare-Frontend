import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>
}

type THCFormProvider = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const HCForm = ({ children, onSubmit, resolver, defaultValues }: THCFormProvider) => {
    const formConfig: TFormConfig = {};
    if (resolver) {
        formConfig["resolver"] = resolver;
    }
    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    const methods = useForm(formConfig);
    const { handleSubmit, reset } = methods;

    const submitHandler: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        reset();
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