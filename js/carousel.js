// ###################### START CAROUSEL ##########################
function Carousel(lClasses, iClasses) {
  this.listSelectedRef = null;
  this.itemSelectedRef = null;

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
      if (!el.className || el.className.includes(iClasses.base)) {
        const { setNewSelected } = (scope = this);

        el.addEventListener("mouseenter", this.onEnter, true);
        el.addEventListener("mouseleave", this.onLeave, true);
        el.addEventListener(
          "click",
          function onClickItem() {
            setNewSelected("item", this);
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
      if (!el.className || el.className.includes(lClasses.base)) {
        const { setNewSelected } = (scope = this);

        el.addEventListener(
          "click",
          function onClickList() {
            setNewSelected("list", this);
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
      if (!items[i].hasOwnProperty("uid")) this.setUID(items[i]);
    }

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement))
      return console.warn(
        "Warning: please provide setItems with a valid destination element!"
      );

    const { selected, base } = iClasses;
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
        if (!selectedExists && 0 >= idx) {
          el.className += `${selected} `;
          this.itemSelectedRef = el;
        }

        el.className += base;
        el.id = item.uid;
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
      items[i].hasOwnProperty("uid") || this.setUID(items[i]);

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement))
      return console.warn(
        "Warning: please provide setMenu with a valid destination element!"
      );

    const { selected, base } = lClasses;
    let selectedExists;

    // checks destination element if there already is a selected class on one of the elements
    destEl.childNodes.forEach((node) => {
      if (!node.className) return;

      if (node.className.includes(selected)) return (selectedExists = true);

      return false;
    });

    items.forEach(function (item, idx) {
      const textTitle = document.createTextNode(item.li || "item");
      const el = document.createElement("li");
      const titleEl = document.createElement("p");

      titleEl.appendChild(textTitle);

      if (!selectedExists && 0 >= idx) {
        el.className += " " + selected + " ";
        this.listSelectedRef = el;
      }

      el.appendChild(titleEl);
      el.id = item.uid;
      el.className += base;

      destEl.appendChild(el);
    }, this);

    this.setListListeners(destEl);
  };

  this.setSelectedRefs = (action, payload) => {
    if (lClasses.base === action) {
      this.listSelectedRef = payload;
    }
    if (iClasses.base === action) {
      this.itemSelectedRef = payload;
    }
  };

  this.setNewSelected = (type, el) => {
    let target;
    let other;
    let targetSelect;
    let otherSelect;

    if (type === "item") {
      target = iClasses;
      other = lClasses;
      targetSelect = this.itemSelectedRef;
      otherSelect = this.listSelectedRef;
    }
    if (type === "list") {
      target = lClasses;
      other = iClasses;
      targetSelect = this.listSelectedRef;
      otherSelect = this.itemSelectedRef;
    }
    const otherWrapper = document.getElementsByClassName(other.wrapper);
    const className = el.className;

    if (className.includes(target.base) && !className.includes(targetSelect)) {
      const itemChildren = otherWrapper[0].childNodes;

      targetSelect.classList.remove(target.selected);
      el.classList.add(target.selected);
      this.setSelectedRefs(target.base, el);

      itemChildren.forEach(function (child) {
        if (child.id === el.id) {
          otherSelect.classList.remove(other.selected);
          child.classList.add(other.selected);
          this.setSelectedRefs(other.base, child);
        }
      }, this);
    }
  };

  this.onEnter = function () {
    this.classList.add(iClasses.hover);
  };

  this.onLeave = function () {
    this.classList.remove(iClasses.hover);
  };

  this.setUID = function (item) {
    const uid = Math.floor(Math.random() * Date.now());

    item.uid = uid;
  };
}
// ####################### END CAROUSEL #######@@##################
