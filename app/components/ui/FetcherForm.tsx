import { useEffect } from "react";
import { useForm, type UseFormReturn, type FieldValues, type Path, } from "react-hook-form";
import { useFetcher, type FetcherWithComponents } from "react-router"; // or 'react-router-dom'

interface ReusableFormProps<T extends FieldValues> {
  actionUrl: string; 
  children?: (methods: UseFormReturn<T>, fetcher: FetcherWithComponents<any>) => React.ReactNode; // Render prop pattern
}

export function ReusableForm<T extends FieldValues>({ actionUrl,  children}: ReusableFormProps<T>) {
  const methods = useForm<T>();
  const { handleSubmit, setError } = methods;

  const fetcher = useFetcher();
  const onSubmit = (data: T) => {
    fetcher.submit({...data} as any, {
      method: "post",
      action: actionUrl,
    });
  };
    useEffect(() => {
    const actionData = fetcher.data as { errors?: Record<string, string> } | undefined;
    
    if (actionData?.errors) {
      // Loop through server errors and inject them into React Hook Form
      Object.entries(actionData.errors).forEach(([fieldName, errorMessage]) => {
        setError(fieldName as Path<T>, {
          type: "server",
          message: errorMessage,
        });
      });
    }
  }, [fetcher.data, setError]);
  return (
    <fetcher.Form method="post" action={actionUrl} onSubmit={handleSubmit(onSubmit)}>
      {children && children(methods, fetcher)}
    </fetcher.Form>
  );
}
