import { Controller } from "react-hook-form"
import { ReusableForm } from "./FetcherForm"
import { Button } from "./ui/button"
import { FieldSet, FieldError, FieldGroup, Field, FieldLabel } from "./ui/field"
import { Checkbox } from "./ui/checkbox"

type DeleteBranchFormInputs = {
  id: number,
  consent: boolean,
  action: "delete" | "restore",
}
export const DeleteForm = ({ id, itemName, path }: {id:any, itemName:any, path:any}) => {
  return (
    <ReusableForm<DeleteBranchFormInputs> actionUrl={path} >
      {({ register,formState:{errors},control }, { state }) => (
        <FieldSet>
          <FieldError className="te">This action canot be undone! Are you sure you want to delete this {itemName}?</FieldError>
          <FieldGroup>
            <Field>
              <div className="flex gap-2">
                <Controller
                  name="consent"
                  control={control}
                  rules={{ required: "Consent is required!" }}
                  render={({ field }) =>
                    <Checkbox aria-invalid={errors.consent ? "true" : "false"} onCheckedChange={(e)=>field.onChange(e.valueOf())} />
                  }
                />
                <FieldLabel>I am aware</FieldLabel>
              </div>
              {errors.consent && <FieldError>{errors.consent.message}</FieldError>}
              <input type="hidden" defaultValue={id} {...register("id")} />
              <input type="hidden" defaultValue={"delete"} {...register("action")} />
            </Field>
            <Field>
              <Button disabled={state != "idle"}>{state != "idle" ? "Processing" : "Delete "+itemName}</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      )}

    </ReusableForm>
  )
}