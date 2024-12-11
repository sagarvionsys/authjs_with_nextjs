import { registerUser } from "@/actions/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const useRegisterUser = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (formData: FormData) => registerUser(formData),
    onSuccess: (res) => toast.success(res.message),
    onError: (error) => toast.error(error.message),
  });
  return {
    registerUser: mutate,
    registerUserPending: isPending,
    registerUserError: isError,
  };
};

export default useRegisterUser;