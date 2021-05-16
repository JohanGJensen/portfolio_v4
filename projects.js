const projects = [
  {
    li: "Video Editor",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #F9DD79",
        children: [{ element: "h3", text: "Video Editor" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `Javascript is my primary developer skill,<br>
                    and the language which I have built my<br>
                    toolset around.<br>
                    I work regularly with es5 AND above.<br><br>
                    For my current job, the features I am building<br>
                    all rely on the JavaScript Canvas API.<br><br>
                    I have been programming with JS<br>
                    for roughly 1.5 years now.<br>
                `,
          },
          {
            element: "a",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    li: "Beer Site",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #6189C6",
        children: [{ element: "h3", text: "Beer Site" }],
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
    li: "EasyList",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #549F64",
        children: [{ element: "h3", text: "EasyList" }],
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
    li: "EasyList API",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #294E80",
        children: [{ element: "h3", text: "EasyList API" }],
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
];

const projectList = document.getElementsByClassName("carousel-list-project");
const projectItem = document.getElementsByClassName("carousel-item-project");

setListAndItems(projectList, projectItem, projects);

const getProjectIndex = (cls) => {
  let idx = 0;

  for (let i = 0; projectItem[0].children.length > i; i++) {
    if (projectItem[0].children[i].className?.includes(cls)) idx = i;
  }

  return idx;
};

const setCarouselProjectsPosition = () => {
  let wrapperWidth = projectItem[0].clientWidth;
  let itemWidth;
  let current = false;
  let margin = 100;
  let placement = 250;
  let idx = 0;

  idx = getProjectIndex("carousel-item-selected");

  projectItem[0].childNodes.forEach((item) => {
    if (!item.className?.includes("carousel-item")) return;
    itemWidth = item.clientWidth;

    if (item.className?.includes("carousel-item-selected")) {
      current = true;
      placement = 250;

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

setCarouselProjectsPosition();

window.addEventListener("resize", setCarouselProjectsPosition);

projectItem[0].childNodes.forEach((item) => {
  if (!item.className?.includes("carousel-item")) return;

  item.addEventListener("click", setCarouselProjectsPosition);
});
projectList[0].childNodes.forEach((item) => {
  if (!item.className?.includes("carousel-list")) return;

  item.addEventListener("click", setCarouselProjectsPosition);
});
