import { useEffect } from "react";
import { useForm, type UseFormReturn, type FieldValues, type Path, } from "react-hook-form";
import { Form, useActionData, useFetcher, useNavigation, useSubmit, type FetcherWithComponents } from "react-router"; // or 'react-router-dom'

interface ReusableFormProps<T extends FieldValues> {
  actionUrl: string;
  defaults?: any;
  resetOnSuccess?: () => void;
  children?: (methods: UseFormReturn<T>, fetcher: any) => React.ReactNode; // Render prop pattern
}

export function ReusableForm<T extends FieldValues>({ actionUrl, defaults, resetOnSuccess, children }: ReusableFormProps<T>) {
  const methods = useForm<T>({ defaultValues: defaults });
  const { handleSubmit, setError, formState: { errors } } = methods;

  //const data = useActionData();
  //const {state:navSatate} = useNavigation();
  // const state = navSatate=="loading"?"idle":navSatate;
  //const submit = useSubmit();

  const fetcher = useFetcher();
  const { state: navState } = fetcher;
  const state = navState == "loading" ? "idle" : navState;
  const data = fetcher.data;
  const onSubmit = (data: T) => {
    const formData = new FormData();
    //console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      }
      else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value))
      } else if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
      // else{
      //   formData.append(key, null as unknown as any)
      // }
      //console.log("something", key, typeof vakue)
    })
    fetcher.submit(formData, {
      method: "post",
      action: actionUrl,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    const actionData = data as { errors?: Record<string, string>, status?: number } | undefined;

    if (actionData?.errors) {
      // Loop through server errors and inject them into React Hook Form
      Object.entries(actionData.errors).forEach(([fieldName, errorMessage]) => {
        setError(fieldName as Path<T>, {
          type: "server",
          message: errorMessage,
        });
      });
    }
    if (actionData?.status == 200) {
      resetOnSuccess?.();
    }
  }, [data, setError]);
  const fetcherComp={state,data: data?.data,  status:data?.status}
  return (
    <Form method="post" action={actionUrl} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {children && children(methods, fetcherComp)}
    </Form>
  );
}
