export const openContactModal = (): void => {
    const modal = document.getElementById("uc-contact-modal");
    if (modal) {
      modal.classList.add("uc-offcanvas-overlay");
      modal.classList.add("uc-open");
    }
  };
  
  export const closeContactModal = (): void => {
    const modal = document.getElementById("uc-contact-modal");
    if (modal) {
      modal.classList.remove("uc-offcanvas-overlay");
      modal.classList.remove("uc-open");
    }
  };
  