import { toast, ToastOptions } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export function toastError(text: string) {
  toast.error(text, toastOptions);
}
