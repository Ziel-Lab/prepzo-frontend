export const openSearchModal = (): void => {
    const modal = document.getElementById("uc-search-modal");
    if (modal) {
      modal.classList.add("uc-offcanvas-overlay");
      modal.classList.add("uc-open");
    }
  };
  
  export const closeSearchModal = (): void => {
    const modal = document.getElementById("uc-search-modal");
    if (modal) {
      modal.classList.remove("uc-offcanvas-overlay");
      modal.classList.remove("uc-open");
    }
  };
  