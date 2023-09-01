import Swal from "sweetalert2";

export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: "App desarrollada con: <br/> <span>Next.js<span/>",
      text: "Versión: 13",
      focusConfirm: false,
      confirmButtonText: "Genial!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#3fc3ee",
    });
  }
}
