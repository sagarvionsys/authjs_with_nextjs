import { login } from "@/actions/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLoginUser = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (formData: FormData) => login(formData),
    onSuccess: (res) => toast.success(res.message),
    onError: (error) => toast.error(error.message),
  });
  return {
    loginUser: mutate,
    loginUserPending: isPending,
    loginUserError: isError,
  };
};

export default useLoginUser;
