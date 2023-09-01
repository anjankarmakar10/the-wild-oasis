import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./hooks/useCreateCabin";
import useEditCabin from "./hooks/useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const onSubmit = (data) => {
    let image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            // reset()
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  };

  const isLoading = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          {...register("name", { required: "This field is required" })}
          type="text"
          id="name"
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should at least 1",
            },
          })}
          disabled={isLoading}
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should at least 1",
            },
          })}
          type="number"
          disabled={isLoading}
          id="regularPrice"
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= +getValues().regularPrice ||
              "Discount should be less then regular price",
          })}
          type="number"
          disabled={isLoading}
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          {...register("description", { required: "This field is required" })}
          type="number"
          id="number"
          disabled={isLoading}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          id="image"
          disabled={isLoading}
          type="file"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? (
            <div> {isLoading ? "Updating..." : "Edit cabin"} </div>
          ) : (
            <div>{isLoading ? "Creating..." : "Create cabin"}</div>
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
