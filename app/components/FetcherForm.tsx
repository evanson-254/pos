import { useEffect } from "react";
import { useForm, type UseFormReturn, type FieldValues, type Path, } from "react-hook-form";
import { Form, useActionData, useFetcher, useNavigation, useSubmit, type FetcherWithComponents } from "react-router"; // or 'react-router-dom'

interface ReusableFormProps<T extends FieldValues> {
  actionUrl: string; 
  defaults?: any;
  children?: (methods: UseFormReturn<T>, fetcher: any) => React.ReactNode; // Render prop pattern
}

export function ReusableForm<T extends FieldValues>({ actionUrl, defaults,  children}: ReusableFormProps<T>) {
  const methods = useForm<T>({defaultValues: defaults});
  const { handleSubmit, setError } = methods;

  const data = useActionData();
  const {state:navSatate} = useNavigation();
  const state = navSatate=="loading"?"idle":navSatate;
  const submit = useSubmit();

  //const fetcher = useFetcher();
  const onSubmit = (data: T) => {
    submit({...data} as any, {
      method: "post",
      action: actionUrl,
    });
  };
    useEffect(() => {
    const actionData = data as { errors?: Record<string, string> } | undefined;
    
    if (actionData?.errors) {
      // Loop through server errors and inject them into React Hook Form
      Object.entries(actionData.errors).forEach(([fieldName, errorMessage]) => {
        setError(fieldName as Path<T>, {
          type: "server",
          message: errorMessage,
        });
      });
    }
  }, [data, setError]);
  return (
    <Form method="post" action={actionUrl} onSubmit={handleSubmit(onSubmit)}>
      {children && children(methods, {state, data})}
    </Form>
  );
}
