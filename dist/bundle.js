/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@johang/carouseljs/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@johang/carouseljs/index.js ***!
  \**************************************************/
/***/ ((module) => {

// ###################### START CAROUSEL ##########################
function Carousel(classes, items) {
  this.listSelectedRef = null;
  this.itemSelectedRef = null;

  this.menuWrapper = null;
  this.itemWrapper = null;

  this.positionStyle = {
    margin: 0,
  };

  this.init = function () {
    const { menu, item } = classes;

    if (menu) {
      this.menuWrapper = document.getElementsByClassName(menu.wrapper);
      this.setMenu(this.menuWrapper, items);
    }

    if (item) {
      this.itemWrapper = document.getElementsByClassName(item.wrapper);
      this.setItems(this.itemWrapper, items);

      this.setCarouselItemsPosition();
      this.addPositionListeners();
    }

  };

  this.setListAndItems = function (listDest, itemDest) {
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
      if (!el.className || el.className.includes(classes.item.base)) {
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

    const { menu } = classes;

    destEl.forEach((el) => {
      if (!el.className || el.className.includes(menu.base)) {
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

    const { selected, base } = classes.item;
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

      if (item.src && item.element === "img") {
        if ("string" != typeof item.src)
          return console.warn("Please ensure image src is a string");

        el.src = item.src;
        el.alt = item.alt || "image caption";
      }

      if (item.element === "a") {
        el.href = item.href || "#";
        el.target = "_blank";
        el.innerHTML = item.text;
      }

      destEl.appendChild(el);
    }, this);

    this.itemWrapper = destEl;

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

    const { selected, base } = classes.menu;
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

    this.menuWrapper = destEl;
    this.setListListeners(destEl);
  };

  this.setSelectedRefs = (action, payload) => {
    const { menu, item } = classes;

    if (menu.base === action) {
      this.listSelectedRef = payload;
    }
    if (item.base === action) {
      this.itemSelectedRef = payload;
    }
  };

  this.setNewSelected = (type, el) => {
    const { menu, item } = classes;
    const className = el.className;

    let target;
    let other;
    let targetSelect;
    let otherSelect;

    if (type === "item") {
      target = item;
      other = menu;
      targetSelect = this.itemSelectedRef;
      otherSelect = this.listSelectedRef;
    }
    if (type === "list") {
      target = menu;
      other = item;
      targetSelect = this.listSelectedRef;
      otherSelect = this.itemSelectedRef;
    }

    if (
      className.includes(target.base) &&
      !className.includes(targetSelect)
    ) {
      targetSelect.classList.remove(target.selected);
      el.classList.add(target.selected);
      this.setSelectedRefs(target.base, el);

      /**
       * other refers to the opposite type of the carousel (item or menu)
       */
      if (other?.wrapper) {
        const otherWrapper = document.getElementsByClassName(other.wrapper);
        const itemChildren = otherWrapper[0].childNodes;

        itemChildren.forEach(function (child) {
          if (child.id === el.id) {
            otherSelect.classList.remove(other.selected);
            child.classList.add(other.selected);
            this.setSelectedRefs(other.base, child);
          }
        }, this);
      }
    }
  };

  this.onEnter = function () {
    this.classList.add(classes.item.hover);
  };

  this.onLeave = function () {
    this.classList.remove(classes.item.hover);
  };

  this.setUID = function (item) {
    const uid = Math.floor(Math.random() * Date.now());

    item.uid = uid;
  };

  this.getIndex = () => {
    let idx = 0;

    for (let i = 0; this.itemWrapper.children.length > i; i++) {
      if (
        this.itemWrapper.children[i].className?.includes(classes.item.selected)
      )
        idx = i;
    }

    return idx;
  };

  this.setCarouselItemsPosition = () => {
    let wrapperWidth = this.itemWrapper.clientWidth;
    let itemWidth;
    let current = false;
    let margin = this.positionStyle.margin;
    let placement = this.itemSelectedRef.clientWidth / 2;
    let idx = this.getIndex() || 0;

    this.itemWrapper.childNodes.forEach((item) => {
      if (!item.className?.includes(classes.item.base)) return;

      itemWidth = item.clientWidth;

      if (item.className?.includes(classes.item.selected)) {
        current = true;

        item.style.left = wrapperWidth / 2 - itemWidth / 2 + "px";

        return;
      }

      if (current) {
        item.style.left = wrapperWidth / 2 + margin + placement + "px";

        placement += itemWidth + margin;
      } else {
        item.style.left =
          wrapperWidth / 2 - (itemWidth + margin) * idx - placement + "px";

        idx--;
      }
    });
  };

  this.setPositionStyle = (prop, value) => {
    if (!prop || !value) return;

    this.positionStyle[prop] = value;
  };

  this.addPositionListeners = () => {
    window.addEventListener("resize", this.setCarouselItemsPosition);

    if (this.itemWrapper && this.itemWrapper) {
      this.itemWrapper.childNodes.forEach((item) => {
        if (!item.className?.includes(classes.item.base)) return;

        item.addEventListener("click", this.setCarouselItemsPosition);
      });
    }


    if (this.menuWrapper && this.menuWrapper) {
      this.menuWrapper.childNodes.forEach((item) => {
        if (!item.className?.includes(classes.menu.base)) return;

        item.addEventListener("click", this.setCarouselItemsPosition);
      });
    }
  };
}
// ####################### END CAROUSEL #######@@##################

module.exports = Carousel;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/carousel.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/carousel.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".carousel-list-wrapper {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  text-decoration: none;\n\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 90%;\n}\n\n.carousel-item-wrapper {\n  padding: 0;\n  margin: 0;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 90%;\n\n  border-top: 1px solid #333;\n  border-left: 1px solid #333;\n  border-right: 1px solid #333;\n}\n\n.remove-margin {\n  margin: 0;\n  padding: 10px 0;\n}\n\n.carousel-list {\n  cursor: pointer;\n  margin: 0 0 1px 0;\n  width: 100%;\n}\n\n.carousel-item {\n  cursor: pointer;\n  display: block;\n  width: 100%;\n  height: auto;\n  padding: 0;\n\n  transition: 0.1s left ease;\n\n  border-bottom: 1px solid #333;\n}\n\n.carousel-item:hover,\n.carousel-item:active,\n.carousel-item:focus {\n  background-color: #fdfcfc;\n}\n\n.carousel-item-selected,\n.project-item-selected {\n  display: block;\n}\n\n.project-item-selected>.carousel-item-body {\n  visibility: visible;\n  opacity: 1;\n  max-height: 1000px;\n\n  display: flex;\n  flex-direction: column;\n\n  transition: max-height 0.6s ease-in-out;\n  transition: opacity 0.1s ease-in-out;\n}\n\n.carousel-item-selected>.carousel-item-body {\n  visibility: visible;\n  opacity: 1;\n  max-height: 500px;\n  transition: max-height 0.6s ease-in-out;\n  transition: opacity 0.1s ease-in-out;\n}\n\n.carousel-item-header {\n  display: block;\n}\n\n.carousel-item-body {\n  visibility: hidden;\n  opacity: 0;\n  max-height: 0px;\n}\n\n.project-item-link {\n  color: #c86060;\n}\n\n.project-item-selected .carousel-item-body img {\n  max-height: 500px;\n  object-fit: contain;\n}\n\n.project-item-selected .project-item-text {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0 20px;\n}\n\n@media screen and (min-width: 736px) {\n\n  .carousel-list-wrapper,\n  .carousel-list-project {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n\n    width: 80%;\n    gap: 3em;\n  }\n\n  .carousel-item-wrapper,\n  .carousel-item-project {\n    padding: 0;\n    margin: 0;\n\n    position: relative;\n    display: block;\n    width: 100%;\n\n    overflow-y: hidden;\n    overflow-x: hidden;\n    white-space: nowrap;\n\n    border: none;\n  }\n\n  .carousel-item-wrapper {\n    height: 500px;\n  }\n\n  .carousel-item-project {\n    height: 900px;\n  }\n\n  .carousel-list {\n    cursor: pointer;\n    margin: 0 0 1px 0;\n    color: #b3b4b6;\n    width: auto;\n    height: auto;\n  }\n\n  .carousel-list:hover,\n  .carousel-list:active,\n  .carousel-list:focus {\n    color: #394757;\n  }\n\n  .carousel-list-selected p {\n    color: #394757;\n  }\n\n  .carousel-item {\n    background-color: #fdfcfc;\n    position: absolute;\n    display: inline-block;\n    width: 300px;\n    height: 300px;\n    max-width: 500px;\n    /* max-height: 400px; */\n    padding: 0;\n    margin: 0 0px;\n\n    white-space: normal;\n    transition: 0.1s left ease;\n\n    border: none;\n  }\n\n  /* .carousel-item-image {\n    width: auto;\n    height: auto;\n  } */\n\n  .carousel-item-selected {\n    position: absolute;\n    display: inline-block;\n    z-index: 10;\n\n    width: 500px;\n    height: 400px;\n\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n  }\n\n  .project-item-selected {\n    position: absolute;\n    display: inline-block;\n    z-index: 10;\n\n    width: 90%;\n    max-width: 1000px;\n    height: 750px;\n    overflow: hidden;\n\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n  }\n\n  /* .project-item-selected .project-item-text {\n    width: 100%;\n    padding: 0 20px;\n  } */\n\n  .project-item-selected .carousel-item-body img {\n    width: 100%;\n    height: auto;\n    max-height: 450px;\n  }\n\n  .carousel-item-selected>.carousel-item-header,\n  .project-item-selected>.carousel-item-header {\n    height: auto;\n  }\n\n  .carousel-item-selected>.carousel-item-body {\n    /* .project-item-selected>.project-item-body, */\n    /* .project-item-selected>.carousel-item-body { */\n\n    display: flex;\n    flex-direction: row;\n  }\n\n  .carousel-item-header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n  }\n\n  .carousel-item-body,\n  .project-item-body {\n    display: none;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n\n  .carousel-list-wrapper,\n  .carousel-list-project {\n    width: 60%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/carousel.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,SAAS;EACT,gBAAgB;EAChB,qBAAqB;;EAErB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;;EAEnB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,SAAS;;EAET,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;;EAEnB,UAAU;;EAEV,0BAA0B;EAC1B,2BAA2B;EAC3B,4BAA4B;AAC9B;;AAEA;EACE,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,cAAc;EACd,WAAW;EACX,YAAY;EACZ,UAAU;;EAEV,0BAA0B;;EAE1B,6BAA6B;AAC/B;;AAEA;;;EAGE,yBAAyB;AAC3B;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,kBAAkB;;EAElB,aAAa;EACb,sBAAsB;;EAEtB,uCAAuC;EACvC,oCAAoC;AACtC;;AAEA;EACE,mBAAmB;EACnB,UAAU;EACV,iBAAiB;EACjB,uCAAuC;EACvC,oCAAoC;AACtC;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,eAAe;AACjB;;AAEA;;EAEE;;IAEE,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;;IAEnB,UAAU;IACV,QAAQ;EACV;;EAEA;;IAEE,UAAU;IACV,SAAS;;IAET,kBAAkB;IAClB,cAAc;IACd,WAAW;;IAEX,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;;IAEnB,YAAY;EACd;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,WAAW;IACX,YAAY;EACd;;EAEA;;;IAGE,cAAc;EAChB;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,yBAAyB;IACzB,kBAAkB;IAClB,qBAAqB;IACrB,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,uBAAuB;IACvB,UAAU;IACV,aAAa;;IAEb,mBAAmB;IACnB,0BAA0B;;IAE1B,YAAY;EACd;;EAEA;;;KAGG;;EAEH;IACE,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;;IAEX,YAAY;IACZ,aAAa;;IAEb,0CAA0C;EAC5C;;EAEA;IACE,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;;IAEX,UAAU;IACV,iBAAiB;IACjB,aAAa;IACb,gBAAgB;;IAEhB,0CAA0C;EAC5C;;EAEA;;;KAGG;;EAEH;IACE,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;;EAEA;;IAEE,YAAY;EACd;;EAEA;IACE,+CAA+C;IAC/C,iDAAiD;;IAEjD,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,YAAY;EACd;;EAEA;;IAEE,aAAa;EACf;AACF;;AAEA;;EAEE;;IAEE,UAAU;EACZ;AACF","sourcesContent":[".carousel-list-wrapper {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  text-decoration: none;\n\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 90%;\n}\n\n.carousel-item-wrapper {\n  padding: 0;\n  margin: 0;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 90%;\n\n  border-top: 1px solid #333;\n  border-left: 1px solid #333;\n  border-right: 1px solid #333;\n}\n\n.remove-margin {\n  margin: 0;\n  padding: 10px 0;\n}\n\n.carousel-list {\n  cursor: pointer;\n  margin: 0 0 1px 0;\n  width: 100%;\n}\n\n.carousel-item {\n  cursor: pointer;\n  display: block;\n  width: 100%;\n  height: auto;\n  padding: 0;\n\n  transition: 0.1s left ease;\n\n  border-bottom: 1px solid #333;\n}\n\n.carousel-item:hover,\n.carousel-item:active,\n.carousel-item:focus {\n  background-color: #fdfcfc;\n}\n\n.carousel-item-selected,\n.project-item-selected {\n  display: block;\n}\n\n.project-item-selected>.carousel-item-body {\n  visibility: visible;\n  opacity: 1;\n  max-height: 1000px;\n\n  display: flex;\n  flex-direction: column;\n\n  transition: max-height 0.6s ease-in-out;\n  transition: opacity 0.1s ease-in-out;\n}\n\n.carousel-item-selected>.carousel-item-body {\n  visibility: visible;\n  opacity: 1;\n  max-height: 500px;\n  transition: max-height 0.6s ease-in-out;\n  transition: opacity 0.1s ease-in-out;\n}\n\n.carousel-item-header {\n  display: block;\n}\n\n.carousel-item-body {\n  visibility: hidden;\n  opacity: 0;\n  max-height: 0px;\n}\n\n.project-item-link {\n  color: #c86060;\n}\n\n.project-item-selected .carousel-item-body img {\n  max-height: 500px;\n  object-fit: contain;\n}\n\n.project-item-selected .project-item-text {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0 20px;\n}\n\n@media screen and (min-width: 736px) {\n\n  .carousel-list-wrapper,\n  .carousel-list-project {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n\n    width: 80%;\n    gap: 3em;\n  }\n\n  .carousel-item-wrapper,\n  .carousel-item-project {\n    padding: 0;\n    margin: 0;\n\n    position: relative;\n    display: block;\n    width: 100%;\n\n    overflow-y: hidden;\n    overflow-x: hidden;\n    white-space: nowrap;\n\n    border: none;\n  }\n\n  .carousel-item-wrapper {\n    height: 500px;\n  }\n\n  .carousel-item-project {\n    height: 900px;\n  }\n\n  .carousel-list {\n    cursor: pointer;\n    margin: 0 0 1px 0;\n    color: #b3b4b6;\n    width: auto;\n    height: auto;\n  }\n\n  .carousel-list:hover,\n  .carousel-list:active,\n  .carousel-list:focus {\n    color: #394757;\n  }\n\n  .carousel-list-selected p {\n    color: #394757;\n  }\n\n  .carousel-item {\n    background-color: #fdfcfc;\n    position: absolute;\n    display: inline-block;\n    width: 300px;\n    height: 300px;\n    max-width: 500px;\n    /* max-height: 400px; */\n    padding: 0;\n    margin: 0 0px;\n\n    white-space: normal;\n    transition: 0.1s left ease;\n\n    border: none;\n  }\n\n  /* .carousel-item-image {\n    width: auto;\n    height: auto;\n  } */\n\n  .carousel-item-selected {\n    position: absolute;\n    display: inline-block;\n    z-index: 10;\n\n    width: 500px;\n    height: 400px;\n\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n  }\n\n  .project-item-selected {\n    position: absolute;\n    display: inline-block;\n    z-index: 10;\n\n    width: 90%;\n    max-width: 1000px;\n    height: 750px;\n    overflow: hidden;\n\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n  }\n\n  /* .project-item-selected .project-item-text {\n    width: 100%;\n    padding: 0 20px;\n  } */\n\n  .project-item-selected .carousel-item-body img {\n    width: 100%;\n    height: auto;\n    max-height: 450px;\n  }\n\n  .carousel-item-selected>.carousel-item-header,\n  .project-item-selected>.carousel-item-header {\n    height: auto;\n  }\n\n  .carousel-item-selected>.carousel-item-body {\n    /* .project-item-selected>.project-item-body, */\n    /* .project-item-selected>.carousel-item-body { */\n\n    display: flex;\n    flex-direction: row;\n  }\n\n  .carousel-item-header {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n  }\n\n  .carousel-item-body,\n  .project-item-body {\n    display: none;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n\n  .carousel-list-wrapper,\n  .carousel-list-project {\n    width: 60%;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/fonts.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/fonts.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/RobotoCondensed-Bold.ttf */ "./src/fonts/RobotoCondensed-Bold.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/RobotoCondensed-Regular.ttf */ "./src/fonts/RobotoCondensed-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Nobile-Regular.ttf */ "./src/fonts/Nobile-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n@font-face {\n    font-family: 'roboto-bold';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('truetype');\n}\n\n\n@font-face {\n    font-family: 'roboto-regular';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('truetype');\n}\n\n@font-face {\n    font-family: 'nobile';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('truetype');\n}", "",{"version":3,"sources":["webpack://./src/styles/fonts.css"],"names":[],"mappings":";AACA;IACI,0BAA0B;IAC1B,+DAAgE;AACpE;;;AAGA;IACI,6BAA6B;IAC7B,+DAAmE;AACvE;;AAEA;IACI,qBAAqB;IACrB,+DAA0D;AAC9D","sourcesContent":["\n@font-face {\n    font-family: 'roboto-bold';\n    src: url('../fonts/RobotoCondensed-Bold.ttf') format('truetype');\n}\n\n\n@font-face {\n    font-family: 'roboto-regular';\n    src: url('../fonts/RobotoCondensed-Regular.ttf') format('truetype');\n}\n\n@font-face {\n    font-family: 'nobile';\n    src: url('../fonts/Nobile-Regular.ttf') format('truetype');\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_carousel_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./carousel.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/carousel.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fonts_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./fonts.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/fonts.css");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_carousel_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_fonts_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html body {\n  margin: 0;\n  padding: 0;\n  font-family: \"nobile\";\n}\n\nbody {\n  overflow-x: hidden;\n  position: relative;\n}\n\n#site-progress {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  -webkit-appearance: none;\n  appearance: none;\n  -moz-appearance: none;\n  z-index: 99;\n\n  margin: 0;\n  padding: 0;\n\n  background-color: #394757;\n  color: #c86060;\n\n  border: none;\n  height: 5px;\n  width: 100%;\n}\n\n#site-progress::-moz-progress-bar {\n  background-color: #c86060;\n}\n\n#site-progress::-moz-progress-value {\n  background-color: #c86060;\n}\n\n/* #site-progress::-webkit-progress-bar {\n    background-color: #C86060;\n} */\n#site-progress::-webkit-progress-value {\n  background-color: #c86060;\n}\n\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  margin: 60px 0;\n}\n\n.title-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  margin: 0 0 10px 0;\n  width: 100%;\n}\n\n.container-landing-page {\n  width: 80%;\n}\n\n.container-know,\n.container-project,\n.container-cv {\n  width: 100%;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.container-know,\n.container-project {\n  max-height: 1000px;\n  overflow: hidden;\n}\n\n.container-cv {\n  height: auto;\n}\n\nhr {\n  border: none;\n  background: #c86060;\n}\n\n.hr-landing-page {\n  margin: 0 auto 10px;\n  height: 2px;\n  width: 300px;\n}\n\n.title-hr {\n  margin: 10px;\n  height: 2px;\n  width: 10%;\n}\n\nh1 {\n  font-size: 2em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0 auto;\n  text-align: center;\n  width: 300px;\n}\n\nh2 {\n  font-size: 2em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0;\n  text-align: center;\n  width: auto;\n}\n\nh3 {\n  font-size: 1.5em;\n  font-family: \"roboto-regular\";\n  color: #ffffff;\n  margin: 0;\n  padding: 10px 0;\n  text-align: center;\n  width: 100%;\n}\n\nh4 {\n  font-size: 0.85em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0 auto;\n  text-align: center;\n  width: 300px;\n}\n\na {\n  text-decoration: none;\n  color: #ffffff;\n  font-family: \"nobile\";\n  font-size: 0.9em;\n}\n\n.carousel-item-body>P {\n  margin: 0;\n  padding: 20px;\n  font-size: 0.8em;\n  width: auto;\n  height: auto;\n  text-align: left;\n  background-color: none;\n}\n\n.carousel-list>p {\n  text-align: center;\n}\n\n.btn {\n  font-size: 1.2em;\n  font-family: \"nobile\";\n  border: none;\n  outline: none;\n  text-decoration: none;\n  padding: 12px 20px;\n  margin-top: 50px;\n  border-radius: 7px;\n  background-color: #c86060;\n  color: #ffffff;\n}\n\n.btn:hover {\n  background-color: #ffffff;\n  color: #394757;\n\n  transition: background-color 0.2s ease-in;\n  transition: color 0.1s ease-in;\n}\n\nfooter {\n  background-color: #394757;\n  width: 100%;\n  height: auto;\n}\n\nfooter .footer-container {\n  height: 100%;\n  width: 50%;\n}\n\nfooter .footer-list {\n  list-style: none;\n  padding: 0 0 20px 0;\n  height: 100%;\n  width: 100%;\n  margin: 0;\n}\n\nfooter .footer-container .footer-list-item {\n  text-align: start;\n  width: 100%;\n  padding: 20px 0 0 60px;\n}\n\n@media screen and (min-width: 736px) {\n  #site-progress {\n    display: block;\n  }\n\n  .container {\n    margin: 0;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .title-container {\n    width: auto;\n  }\n\n  .container-landing-page {\n    width: auto;\n    height: 100vh;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .container-cv {\n    height: 800px;\n  }\n\n  .hr-landing-page {\n    width: auto;\n  }\n\n  .title-hr {\n    width: 50px;\n  }\n\n  h1 {\n    font-size: 3.8em;\n    width: auto;\n  }\n\n  h2 {\n    font-size: 3em;\n  }\n\n  h3 {\n    font-size: 2.5em;\n  }\n\n  h4 {\n    font-size: 1.5em;\n    width: auto;\n  }\n\n  .carousel-item-body>P {\n    font-size: 1em;\n  }\n\n  .btn {\n    margin-top: 250px;\n  }\n\n  footer {\n    width: 500px;\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    margin: auto;\n  }\n\n  footer .footer-container .footer-list-item {\n    text-align: end;\n    padding: 20px 0 0 0;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n  /* .container-content {\n        width: auto;\n    } */\n}", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAGA;EACE,SAAS;EACT,UAAU;EACV,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,MAAM;EACN,OAAO;EACP,wBAAwB;EACxB,gBAAgB;EAChB,qBAAqB;EACrB,WAAW;;EAEX,SAAS;EACT,UAAU;;EAEV,yBAAyB;EACzB,cAAc;;EAEd,YAAY;EACZ,WAAW;EACX,WAAW;AACb;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;;GAEG;AACH;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,uBAAuB;EACvB,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;;EAEnB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,UAAU;AACZ;;AAEA;;;EAGE,WAAW;;EAEX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;;EAEE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,6BAA6B;EAC7B,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,6BAA6B;EAC7B,cAAc;EACd,SAAS;EACT,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,6BAA6B;EAC7B,cAAc;EACd,SAAS;EACT,eAAe;EACf,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,6BAA6B;EAC7B,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,cAAc;EACd,qBAAqB;EACrB,gBAAgB;AAClB;;AAEA;EACE,SAAS;EACT,aAAa;EACb,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,YAAY;EACZ,aAAa;EACb,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,cAAc;;EAEd,yCAAyC;EACzC,8BAA8B;AAChC;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE;IACE,cAAc;EAChB;;EAEA;IACE,SAAS;IACT,uBAAuB;IACvB,mBAAmB;EACrB;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,WAAW;IACX,aAAa;;IAEb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;EACrB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,gBAAgB;IAChB,WAAW;EACb;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;IAChB,WAAW;EACb;;EAEA;IACE,cAAc;EAChB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,YAAY;IACZ,4BAA4B;IAC5B,6BAA6B;IAC7B,YAAY;EACd;;EAEA;IACE,eAAe;IACf,mBAAmB;EACrB;AACF;;AAEA;EACE;;OAEK;AACP","sourcesContent":["@import \"carousel.css\";\n@import \"fonts.css\";\n\nhtml body {\n  margin: 0;\n  padding: 0;\n  font-family: \"nobile\";\n}\n\nbody {\n  overflow-x: hidden;\n  position: relative;\n}\n\n#site-progress {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  -webkit-appearance: none;\n  appearance: none;\n  -moz-appearance: none;\n  z-index: 99;\n\n  margin: 0;\n  padding: 0;\n\n  background-color: #394757;\n  color: #c86060;\n\n  border: none;\n  height: 5px;\n  width: 100%;\n}\n\n#site-progress::-moz-progress-bar {\n  background-color: #c86060;\n}\n\n#site-progress::-moz-progress-value {\n  background-color: #c86060;\n}\n\n/* #site-progress::-webkit-progress-bar {\n    background-color: #C86060;\n} */\n#site-progress::-webkit-progress-value {\n  background-color: #c86060;\n}\n\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  margin: 60px 0;\n}\n\n.title-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  margin: 0 0 10px 0;\n  width: 100%;\n}\n\n.container-landing-page {\n  width: 80%;\n}\n\n.container-know,\n.container-project,\n.container-cv {\n  width: 100%;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.container-know,\n.container-project {\n  max-height: 1000px;\n  overflow: hidden;\n}\n\n.container-cv {\n  height: auto;\n}\n\nhr {\n  border: none;\n  background: #c86060;\n}\n\n.hr-landing-page {\n  margin: 0 auto 10px;\n  height: 2px;\n  width: 300px;\n}\n\n.title-hr {\n  margin: 10px;\n  height: 2px;\n  width: 10%;\n}\n\nh1 {\n  font-size: 2em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0 auto;\n  text-align: center;\n  width: 300px;\n}\n\nh2 {\n  font-size: 2em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0;\n  text-align: center;\n  width: auto;\n}\n\nh3 {\n  font-size: 1.5em;\n  font-family: \"roboto-regular\";\n  color: #ffffff;\n  margin: 0;\n  padding: 10px 0;\n  text-align: center;\n  width: 100%;\n}\n\nh4 {\n  font-size: 0.85em;\n  font-family: \"roboto-regular\";\n  color: #394757;\n  margin: 0 auto;\n  text-align: center;\n  width: 300px;\n}\n\na {\n  text-decoration: none;\n  color: #ffffff;\n  font-family: \"nobile\";\n  font-size: 0.9em;\n}\n\n.carousel-item-body>P {\n  margin: 0;\n  padding: 20px;\n  font-size: 0.8em;\n  width: auto;\n  height: auto;\n  text-align: left;\n  background-color: none;\n}\n\n.carousel-list>p {\n  text-align: center;\n}\n\n.btn {\n  font-size: 1.2em;\n  font-family: \"nobile\";\n  border: none;\n  outline: none;\n  text-decoration: none;\n  padding: 12px 20px;\n  margin-top: 50px;\n  border-radius: 7px;\n  background-color: #c86060;\n  color: #ffffff;\n}\n\n.btn:hover {\n  background-color: #ffffff;\n  color: #394757;\n\n  transition: background-color 0.2s ease-in;\n  transition: color 0.1s ease-in;\n}\n\nfooter {\n  background-color: #394757;\n  width: 100%;\n  height: auto;\n}\n\nfooter .footer-container {\n  height: 100%;\n  width: 50%;\n}\n\nfooter .footer-list {\n  list-style: none;\n  padding: 0 0 20px 0;\n  height: 100%;\n  width: 100%;\n  margin: 0;\n}\n\nfooter .footer-container .footer-list-item {\n  text-align: start;\n  width: 100%;\n  padding: 20px 0 0 60px;\n}\n\n@media screen and (min-width: 736px) {\n  #site-progress {\n    display: block;\n  }\n\n  .container {\n    margin: 0;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .title-container {\n    width: auto;\n  }\n\n  .container-landing-page {\n    width: auto;\n    height: 100vh;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .container-cv {\n    height: 800px;\n  }\n\n  .hr-landing-page {\n    width: auto;\n  }\n\n  .title-hr {\n    width: 50px;\n  }\n\n  h1 {\n    font-size: 3.8em;\n    width: auto;\n  }\n\n  h2 {\n    font-size: 3em;\n  }\n\n  h3 {\n    font-size: 2.5em;\n  }\n\n  h4 {\n    font-size: 1.5em;\n    width: auto;\n  }\n\n  .carousel-item-body>P {\n    font-size: 1em;\n  }\n\n  .btn {\n    margin-top: 250px;\n  }\n\n  footer {\n    width: 500px;\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    margin: auto;\n  }\n\n  footer .footer-container .footer-list-item {\n    text-align: end;\n    padding: 20px 0 0 0;\n  }\n}\n\n@media screen and (min-width: 1200px) {\n  /* .container-content {\n        width: auto;\n    } */\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Nobile-Regular.ttf":
/*!**************************************!*\
  !*** ./src/fonts/Nobile-Regular.ttf ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "Nobile-Regular.ttf";

/***/ }),

/***/ "./src/fonts/RobotoCondensed-Bold.ttf":
/*!********************************************!*\
  !*** ./src/fonts/RobotoCondensed-Bold.ttf ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "RobotoCondensed-Bold.ttf";

/***/ }),

/***/ "./src/fonts/RobotoCondensed-Regular.ttf":
/*!***********************************************!*\
  !*** ./src/fonts/RobotoCondensed-Regular.ttf ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "RobotoCondensed-Regular.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _johang_carouseljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @johang/carouseljs */ "./node_modules/@johang/carouseljs/index.js");
/* harmony import */ var _johang_carouseljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_johang_carouseljs__WEBPACK_IMPORTED_MODULE_1__);



const progress = document.getElementById("site-progress");
const body = document.getElementById("site-body");

progress.setAttribute("value", window.scrollY);

const siteProgress = () => {
  let totalHeight = body.clientHeight - window.innerHeight;

  progress.setAttribute("value", (window.scrollY / totalHeight) * 100);
};

window.addEventListener("scroll", siteProgress);

const skills = [
  {
    li: "React",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #6189C6",
        children: [{ element: "h3", text: "React" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `I was introduced to React right around<br>
            the time where class extended components<br>
            were getting replaced with a new feature<br>
            known as “hooks”.<br><br>
            This means I have been taught<br>
            to use classes, but worked<br>
            in a professional setting with hooks.<br>
                `,
          },
        ],
      },
    ],
  },
  {
    li: "TypeScript",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #294E80",
        children: [{ element: "h3", text: "TypeScript" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `
            React and TypeScript go<br>
            almost 1:1 hand in hand.<br><br>
            There is a good reason why so many require it.<br>
            The type checking adds a layer of app stability<br>
            VanillaJS simply does not have.<br>
            `,
          },
        ],
      },
    ],
  },
  {
    li: "NodeJs",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #68a063",
        children: [{ element: "h3", text: "NodeJs" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `
            In nodejs I am comfortable<br>
            working with vanilla, or<br>
            with libraries such as express.<br>
            I understand how to use nodejs as an API communicating<br>
            between database and application,<br>
            aswell as server-side rendered applications.<br>
            `,
          },
        ],
      },
    ],
  },
  {
    li: "Sencha Ext",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #549F64",
        children: [{ element: "h3", text: "Sencha Ext" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `This framework has been my bread and butter<br>
            for a full year now. At my current job I work<br>
            on an application that is built from the ground up<br>
            with Sencha (2.0.0).<br><br>
            My role is not maintenance, but building<br>
            features for the application.<br>
                `,
          },
        ],
      },
    ],
  },
  {
    li: "Angular",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #dd1b16",
        children: [{ element: "h3", text: "Angular" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        style: "flex-direction: column;",
        children: [
          {
            element: "p",
            text: `Through my current job<br>
            I have been working with Angular.<br>
            While it is mostly maintenance, I have been<br>
            making a few features for the application<br>
            in Angular.<br><br>
                `,
          },
          {
            element: "a",
            class: "project-item-link",
            text: "See example project",
            style: "padding-left: 20px;",
            href: "https://johangjensen.github.io/cocktail_lookup_angular/",
          },
        ],
      },
    ],
  },
];

const projects = [
  {
    li: "Beer Site",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #f6b468",
        children: [{ element: "h3", text: "Beer Site" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/beersite.png",
            alt: "beer site",
          },
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                During the quarantine I found a passion for beer brewing.Therefore I have built a website dedicated to this hobby.<br>
                The website is server-side rendered using NodeJs. It is hosted on Heroku and is deployed as a docker container.<br>
                <br>
                As my portfolio of homebrew grows, so will this website.
                <br>
                `,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Application",
                href: "https://beer-site-container.herokuapp.com/",
              },
            ],
          },

        ],
      },
    ],
  },
  {
    li: "EasyList",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #2196F3",
        children: [{ element: "h3", text: "EasyList" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/easylist_phone.jpg",
            alt: "easylist",
          },
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                A simple todo application built for personal use. The app itself is made with React and Mantine UI library.`,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Repository",
                href: "https://github.com/JohanGJensen/easylist-ui-pwa",
              },
              {
                element: "p",
                class: "remove-margin",
                text: `
                Additionally, the api was built using nodeJs, Express and MongoDB.`,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to REST API Repository",
                href: "https://github.com/JohanGJensen/EasyList_RESTAPI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    li: "Flaskeposten",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #4F46E5",
        children: [{ element: "h3", text: "Flaskeposten" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/flaskeposten.jpg",
            alt: "easylist",
          },
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                A small chat app written with NodeJS & React.<br>
                This project uses:<br>
                - Websockets<br>
                - Tailwind css<br>
                - firebase database<br>
                `,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Repository",
                href: "https://github.com/JohanGJensen/flaskepost",
              },
            ],
          },
        ],
      },
    ],
  },
];

const projectClasses = {
  menu: {
    wrapper: "carousel-list-project",
    selected: "carousel-list-selected",
    base: "carousel-list",
    hover: "carousel-list-hover",
  },
  item: {
    wrapper: "carousel-item-project",
    selected: "project-item-selected",
    base: "carousel-item",
    hover: "carousel-project-item-hover",
  }
};

const projectCarousel = new (_johang_carouseljs__WEBPACK_IMPORTED_MODULE_1___default())(projectClasses, projects);
projectCarousel.setPositionStyle("margin", 20);
projectCarousel.init();

const skillClasses = {
  menu: {
    wrapper: "carousel-list-know",
    selected: "carousel-list-selected",
    base: "carousel-list",
    hover: "carousel-list-hover",
  },
  item: {
    wrapper: "carousel-item-know",
    selected: "carousel-item-selected",
    base: "carousel-item",
    hover: "carousel-item-hover",
  }
};

const skillCarousel = new (_johang_carouseljs__WEBPACK_IMPORTED_MODULE_1___default())(skillClasses, skills);
skillCarousel.setPositionStyle("margin", 20);
skillCarousel.init();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map