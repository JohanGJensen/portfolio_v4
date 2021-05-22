// ###################### START CAROUSEL ##########################
function Carousel(listClasses, itemClasses) {
  this.listClasses = listClasses;
  this.itemClasses = itemClasses;

  this.setListAndItems = function (listDest, itemDest, items) {
    this.setMenu(listDest, items);
    this.setItems(itemDest, items);
  };

  // sets event listeners on each item in array
  this.setItemListeners = function (destEl) {
    if (!(destEl instanceof HTMLElement)) return;

    if (destEl.childNodes) destEl = destEl.childNodes;

    if (!(destEl instanceof NodeList))
      return console.warn("Warning Element provided does not have a nodelist!");

    destEl.forEach((el) => {
      if (!el.className || el.className.includes(itemClasses.base)) {
        const { itemClasses, listClasses } = this;

        el.addEventListener("mouseenter", onEnter, true);
        el.addEventListener("mouseleave", onLeave, true);
        el.addEventListener(
          "click",
          function onClickItem() {
            setNewSelected(itemClasses, listClasses, this);
          },
          true
        );
      }
    });
  };

  // sets event listeners on each item in array
  this.setListListeners = function (destEl) {
    if (!(destEl instanceof HTMLElement)) return;

    if (destEl.childNodes) destEl = destEl.childNodes;

    if (!(destEl instanceof NodeList))
      return console.warn("Warning Element provided does not have a nodelist!");

    destEl.forEach((el) => {
      if (!el.className || el.className.includes(listClasses.base)) {
        const { listClasses, itemClasses } = this;
        el.addEventListener(
          "click",
          function onClickList() {
            setNewSelected(listClasses, itemClasses, this);
          },
          false
        );
      }
    });
  };

  this.setItems = (destEl, items, parent) => {
    if (!Array.isArray(items)) return;

    // provide unique ID for each item, if none exist
    for (let i = 0; items.length > i; i++) {
      if (!items[i].hasOwnProperty("uid")) getUID(items[i]);
    }

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement))
      return console.warn(
        "Warning: please provide setItems with a valid destination element!"
      );

    const { selected, base } = itemClasses;
    let selectedExists;

    // checks destination element if there already is a selected class on one of the elements
    destEl.childNodes.forEach((node) => {
      if (!node.className) return;

      if (node.className.includes(selected)) return (selectedExists = true);

      return false;
    });

    items.forEach(function (item, idx) {
      const el = document.createElement(item.element || "div");

      if (!parent) {
        if (!selectedExists && 0 >= idx) el.className += `${selected} `;

        el.className += base;
        el.uid = item.uid;
      }

      if (item.children) {
        if (!Array.isArray(item.children))
          return console.warn(
            "Please make sure the children property is an array"
          );

        this.setItems(el, item.children, true);
      }

      if (item.class) {
        if ("string" != typeof item.class)
          return console.warn("Please ensure item.class is a string");

        el.className += item.class;
      }

      if (item.style) {
        if ("string" != typeof item.style)
          return console.warn("Please ensure item.style is a string");

        el.style.cssText = item.style;
      }

      if (item.text) {
        if ("string" != typeof item.text)
          return console.warn("Please ensure item.text is a string");

        el.innerHTML = item.text;
      }

      destEl.appendChild(el);
    }, this);

    if (!parent) this.setItemListeners(destEl);
  };

  this.setMenu = (destEl, items) => {
    if (!Array.isArray(items)) return;

    for (let i = 0; items.length > i; i++)
      items[i].hasOwnProperty("uid") || getUID(items[i]);

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement))
      return console.warn(
        "Warning: please provide setMenu with a valid destination element!"
      );

    const { selected, base } = listClasses;
    let selectedExists;

    // checks destination element if there already is a selected class on one of the elements
    destEl.childNodes.forEach((node) => {
      if (!node.className) return;

      if (node.className.includes(selected)) return (selectedExists = true);

      return false;
    });

    items.forEach(function (item, idx) {
      const textTitle = document.createTextNode(item.li || "item");
      const listEl = document.createElement("li");
      const titleEl = document.createElement("p");

      titleEl.appendChild(textTitle);

      if (!selectedExists && 0 >= idx) listEl.className += " " + selected + " ";

      listEl.appendChild(titleEl);
      listEl.uid = item.uid;
      listEl.className += base;

      destEl.appendChild(listEl);
    });

    this.setListListeners(destEl);
  };
}
// ####################### END CAROUSEL #######@@##################

function onEnter() {
  this.classList.add(itemClasses.hover);
}

function onLeave() {
  this.classList.remove(itemClasses.hover);
}

const setNewSelected = (target, other, el) => {
  const otherWrapper = document.getElementsByClassName(other.wrapper);
  const targetSelected = document.getElementsByClassName(target.selected);
  const otherSelected = document.getElementsByClassName(other.selected);

  const className = el.className;

  if (className.includes(target.base) && !className.includes(target.selected)) {
    const itemChildren = otherWrapper[0].childNodes;

    targetSelected[0].classList.remove(target.selected);

    el.classList.add(target.selected);

    itemChildren.forEach(function (child) {
      if (child.uid === el.uid) {
        otherSelected[0].classList.remove(other.selected);
        child.classList.add(other.selected);
      }
    });
  }
};

function getUID(item) {
  return (item.uid = Math.floor(Math.random() * Date.now()));
}
