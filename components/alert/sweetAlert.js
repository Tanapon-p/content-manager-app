import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function SuccessAlert(title) {
  Swal.fire({
    title: title,
    icon: "success",
    confirmButtonText: "Ok",
  });
}

export function ErrorAlert(title, text) {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
}
