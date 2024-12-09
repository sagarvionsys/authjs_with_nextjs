import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UseServerMutationHookProps<TData> {
  mutationFn: (variables: TData) => Promise<void>;
  queryKey: string;
}

const useServerMutationHook = <TData>({
  mutationFn,
  queryKey,
}: UseServerMutationHookProps<TData>) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
      toast.success("operation done successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
};

export default useServerMutationHook;
