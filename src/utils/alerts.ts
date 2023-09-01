import Swal from "sweetalert2";

export function alertInfo(params: string) {
  if (params) {
    Swal.fire({
      icon: "info",
      title: "App developed with: <br/> <span>Next.js<span/>",
      text: "Version: 13.4.13",
      focusConfirm: false,
      confirmButtonText: "Great!",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#3fc3ee",
    });
  }
}
