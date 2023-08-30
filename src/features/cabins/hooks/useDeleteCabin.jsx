import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../../services/apiCabins";
import { toast } from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCabin, isDeleting };
};
export default useDeleteCabin;
