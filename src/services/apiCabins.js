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

export const createEditCabin = async (newCabin, id) => {
  // https://sedkcqvwwgrfvahkqdfb.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

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
