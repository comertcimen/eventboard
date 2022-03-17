export const smoothScrollTop = () => {
  window.scrollTo({
    top: 0,
    left: document.body.scrollHeight,
    behavior: "smooth",
  });
};
