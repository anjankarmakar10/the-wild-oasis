import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  console.log(data, error);

  return data;
};

export const createCabin = async (newCabin) => {
  // https://sedkcqvwwgrfvahkqdfb.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //Upload image
  const { error: storeError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // If upload failed new cabin will deleted
  if (storeError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storeError.message);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
};
