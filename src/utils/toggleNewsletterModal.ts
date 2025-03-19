export const openNewsletterModal = (): void => {
    const modal = document.getElementById("uc-newsletter-modal");
    if (modal) {
      modal.classList.add("uc-offcanvas-overlay");
      modal.classList.add("uc-open");
    }
  };
  
  export const closeNewsletterModal = (): void => {
    const modal = document.getElementById("uc-newsletter-modal");
    if (modal) {
      modal.classList.remove("uc-offcanvas-overlay");
      modal.classList.remove("uc-open");
    }
  };
  