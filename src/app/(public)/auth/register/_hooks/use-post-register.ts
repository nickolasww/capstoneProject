import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { postRegister } from "@/api/auth/api";
import type { TRegisterParam } from "@/api/auth/type";
import type { TDefaultResponse } from "@/commons/types/response";

export const usePostRegister = (): UseMutationResult<
  TDefaultResponse,
  unknown,
  TRegisterParam,
  unknown
> => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["post-register"],
    mutationFn: async (payload: TRegisterParam) => {
      return await postRegister(payload);
    },
    onSuccess: (response) => {
      notification.success({
        message: "Registrasi Berhasil",
        description: response.message || "Akun Anda telah berhasil dibuat. Silakan login.",
        placement: "topRight",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMsg =
        err?.response?.data?.message ||
        err.message ||
        "Registrasi gagal. Silakan coba lagi.";

      notification.error({
        message: "Registrasi Gagal",
        description: errorMsg,
        placement: "topRight",
      });
    },
  });
};
