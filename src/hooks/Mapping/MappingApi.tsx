import { deleteMethod, getMethod, postMethod } from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const GetMapping = () => {
  const url = `${ENDPOINTS.ATTRIBUTES.category_attributes}`;
  return useQuery({
    queryKey: ["category_attributes"],
    queryFn: async () => {
      const res = await getMethod(url);
      return res.data;
    },
  });
};
export const useCreateMapping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.ATTRIBUTES.category_attributes;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category_attributes"] });
    },
  });
};

export const useDeleteMapping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      category_id,
      attribute_id,
    }: {
      category_id: string;
      attribute_id: string;
    }) => {
      const url = `${ENDPOINTS.ATTRIBUTES.category_attributes}/${category_id}/${attribute_id}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category_attributes"] });
    },
  });
};