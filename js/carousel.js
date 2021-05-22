const lWrapper = "carousel-list-wrapper",
  listCls = "carousel-list",
  selectedList = "carousel-list-selected",
  wrapper = "carousel-item-wrapper",
  selected = "carousel-item-selected",
  itemCls = "carousel-item",
  hovering = "carousel-item-hover";

function setListAndItems(listDest, itemDest, items) {
  setMenu(listDest, items);
  setItems(itemDest, items);
}

function setItems(destEl, items, parent) {
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

      el.className += itemCls;
      el.uid = item.uid;
    }

    if (item.children) {
      if (!Array.isArray(item.children))
        return console.warn(
          "Please make sure the children property is an array"
        );

      setItems(el, item.children, true);
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
  });

  setItemListeners(destEl);
}

function setMenu(destEl, items) {
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

    if (!selectedExists && 0 >= idx)
      listEl.className += " " + selectedList + " ";

    listEl.appendChild(titleEl);
    listEl.uid = item.uid;
    listEl.className += listCls;

    destEl.appendChild(listEl);
  });

  setListListeners(destEl);
}

// sets event listeners on each item in array
function setItemListeners(destEl) {
  if (!(destEl instanceof HTMLElement)) return;

  if (destEl.childNodes) destEl = destEl.childNodes;

  if (!(destEl instanceof NodeList))
    return console.warn("Warning Element provided does not have a nodelist!");

  destEl.forEach((el) => {
    if (!el.className || el.className.includes(itemCls)) {
      el.addEventListener("mouseenter", onEnter, false);
      el.addEventListener("mouseleave", onLeave, false);
      el.addEventListener("click", onClick, false);
    }
  });
}

// sets event listeners on each item in array
function setListListeners(destEl) {
  if (!(destEl instanceof HTMLElement)) return;

  if (destEl.childNodes) destEl = destEl.childNodes;

  if (!(destEl instanceof NodeList))
    return console.warn("Warning Element provided does not have a nodelist!");

  destEl.forEach((el) => {
    if (!el.className || el.className.includes(listCls)) {
      el.addEventListener("click", onClick, false);
    }
  });
}

function onEnter() {
  // add hovering class - potentially not needed
  this.classList.add(hovering);
}

function onLeave() {
  // remove hovering class - potentially not needed
  this.classList.remove(hovering);
}

function onClick() {
  var ELItemWrapper = document.getElementsByClassName(wrapper),
    ELListWrapper = document.getElementsByClassName(lWrapper),
    ELItemSelected = document.getElementsByClassName(selected),
    ELlistSelected = document.getElementsByClassName(selectedList);
  if (
    this.className.includes(listCls) &&
    !this.className.includes(selectedList)
  ) {
    var carouselChildren = ELItemWrapper[0].childNodes,
      self = this;
    return (
      ELlistSelected[0].classList.remove(selectedList),
      this.classList.add(selectedList),
      carouselChildren.forEach(function (child) {
        if (void 0 !== self.uid && child.uid === self.uid)
          return (
            ELItemSelected[0].classList.remove(selected),
            child.classList.add(selected)
          );
      })
    );
  }
  if (this.className.includes(itemCls) && !this.className.includes(selected)) {
    var carouselChildren2 = ELListWrapper[0].childNodes,
      self = this;
    return (
      ELItemSelected[0].classList.remove(selected),
      this.classList.add(selected),
      carouselChildren2.forEach(function (child) {
        if (void 0 !== self.uid && child.uid === self.uid)
          return (
            ELlistSelected[0].classList.remove(selectedList),
            child.classList.add(selectedList)
          );
      })
    );
  }
}

function getUID(item) {
  return (item.uid = Math.floor(Math.random() * Date.now()));
}
