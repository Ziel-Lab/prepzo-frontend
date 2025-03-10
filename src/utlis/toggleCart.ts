export const openCart = (): void => {
    const cartPanel = document.getElementById("uc-cart-panel");
    if (cartPanel) {
      cartPanel.classList.add("uc-offcanvas-overlay");
      cartPanel.classList.add("uc-open");
    }
  };
  
  export const closeCart = (): void => {
    const cartPanel = document.getElementById("uc-cart-panel");
    if (cartPanel) {
      cartPanel.classList.remove("uc-offcanvas-overlay");
      cartPanel.classList.remove("uc-open");
    }
  };
  