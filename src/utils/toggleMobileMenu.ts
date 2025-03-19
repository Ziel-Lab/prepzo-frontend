export const openMobileMenu = (): void => {
    const panel = document.getElementById("uc-menu-panel");
    if (panel) {
      panel.classList.add("uc-offcanvas-overlay");
      panel.classList.add("uc-open");
    }
  };
  
  export const closeMobileMenu = (): void => {
    const panel = document.getElementById("uc-menu-panel");
    if (panel) {
      panel.classList.remove("uc-offcanvas-overlay");
      panel.classList.remove("uc-open");
    }
  };
  