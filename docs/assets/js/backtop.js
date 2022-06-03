((w, d) => {
  const backTop = (hook, vm) => {
    const config = vm.config.backTop || {
      color: "#2d6efb"
    }
    const styles = d.createElement("style");
    styles.className = "back-top-style";
    styles.innerHTML = `
.back-top {
  position: fixed;
  bottom: 4rem;
  right: -3rem;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  color: #666;
  font-weight: 900;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.back-top.show {
  right: 2rem;
}
.back-top:hover {
  box-shadow: 0 0 10px #a0a0a0;
}
.back-top:hover svg {
  fill: var(--color-primary, ${config.color});
}
.back-top:active {
  opacity: .7;
  box-shadow: 0 0 10px #a0a0a0;
}`
    d.head.appendChild(styles);
    let scroll = false;
    const backTop = d.createElement("div");
    backTop.className = "back-top";
    backTop.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>`;
    d.body.appendChild(backTop);

    d.addEventListener("scroll", () => {
      if(d.body.getBoundingClientRect().top < -200) {
        scroll = true;
        backTop.classList.add("show");
      } else {
        scroll = false;
        backTop.classList.remove("show");
      }
    });
    backTop.addEventListener("click", () => {
      w.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      w.location.assign(w.location.hash.split("?")[0]);
    });
  };

  w.$docsify = w.$docsify || {};
  w.$docsify.plugins = [...w.$docsify.plugins||[], backTop];
})(window, document);