const progress = document.getElementById("site-progress");
const body = document.getElementsByTagName("body");

progress.setAttribute("value", window.scrollY);

const siteProgress = () => {
  let totalHeight = body[0].clientHeight - this.innerHeight;

  progress.setAttribute("value", (this.scrollY / totalHeight) * 100);
};

window.addEventListener("scroll", siteProgress);

const skills = [
  {
    li: "Javascript",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #F9DD79",
        children: [{ element: "h3", text: "Javascript" }],
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
            for roughly 3 years now.<br>
                `,
          },
        ],
      },
    ],
  },
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
    li: "Python",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #FFE66E",
        children: [{ element: "h3", text: "Python" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "p",
            text: `
                    Python I have used in combination with projects<br>
                    at my current job.<br><br>
                    The application I work on utilizes Docker-Compose to<br>
                    host a cluster of workers that handles specific tasks<br>
                    and requests sent by the application itself.
                `,
          },
        ],
      },
    ],
  },
];

const projects = [
  {
    li: "Video Editor",
    children: [
      {
        element: "div",
        class: "carousel-item-header",
        style: "background-color: #394757",
        children: [{ element: "h3", text: "Video Editor" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                At the moment I am using my sparetime<br>
                developing a web application video editor<br>
                for fun.<br>
                Build with React,TypeScript and Redux.<br>
                <br>
                This app will also feature more complex functionality<br>
                in the near future.<br>
                <br>
                *WORK IN PROGRESS*<br>
                `,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Application",
                href: "https://johangjensen.github.io/video_editor/",
              },
            ],
          },
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/video_editor.jpg",
            alt: "video editor",
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
        style: "background-color: #f6b468",
        children: [{ element: "h3", text: "Beer Site" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                During the quarantine I found a passion<br>
                for beer brewing.<br>
                Therefore I have built a website<br>
                dedicated to this hobby.<br>
                <br>
                The website is server-side rendered using NodeJs.<br>
                It is hosted on Heroku and is deployed as a docker container.<br>
                <br>
                As my portfolio of homebrew grows, so will this website.<br>
                <br>
                *WORK IN PROGRESS*<br>
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
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/beersite.jpg",
            alt: "beer site",
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
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                A simple todo application built<br>
                for personal use.<br>
                The app itself was made with the intent of<br>
                understanding Xamarin Forms(mobile .net SDK)<br>
                and C# in general better.<br>
                `,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Repository",
                href: "https://github.com/JohanGJensen/EasyList",
              },
            ],
          },
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/easylist_phone.jpg",
            alt: "easylist",
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
        style: "background-color: #68a063",
        children: [{ element: "h3", text: "EasyList API" }],
      },
      {
        element: "div",
        class: "carousel-item-body",
        children: [
          {
            element: "div",
            class: "project-item-text",
            children: [
              {
                element: "p",
                class: "remove-margin",
                text: `
                REST API I built to communicate<br>
                with my EasyList application and database.<br>
                <br>
                This application uses NodeJs with Express.<br>
                The Database in MongoDB.<br>
                `,
              },
              {
                element: "a",
                class: "project-item-link",
                text: "Go to Repository",
                href: "https://github.com/JohanGJensen/EasyList_RESTAPI",
              },
            ],
          },
          {
            element: "img",
            class: "carousel-item-image",
            src: "./images/easylist_api.png",
            alt: "easylist api",
          },
        ],
      },
    ],
  },
];

const projectList = document.getElementsByClassName("carousel-list-project");
const projectItem = document.getElementsByClassName("carousel-item-project");

let projectListClasses = {
  wrapper: "carousel-list-project",
  selected: "carousel-list-selected",
  base: "carousel-list",
  hover: "carousel-list-hover",
};

let projectItemClasses = {
  wrapper: "carousel-item-project",
  selected: "project-item-selected",
  base: "carousel-item",
  hover: "carousel-project-item-hover",
};

const projectCarousel = new Carousel(projectListClasses, projectItemClasses);
projectCarousel.setListAndItems(projectList, projectItem, projects);
projectCarousel.setPositionStyle("margin", 20);

projectCarousel.setCarouselItemsPosition();
projectCarousel.addPositionListeners();

const skillList = document.getElementsByClassName("carousel-list-know");
const skillItem = document.getElementsByClassName("carousel-item-know");

let skillListClasses = {
  wrapper: "carousel-list-know",
  selected: "carousel-list-selected",
  base: "carousel-list",
  hover: "carousel-list-hover",
};
let skillItemClasses = {
  wrapper: "carousel-item-know",
  selected: "carousel-item-selected",
  base: "carousel-item",
  hover: "carousel-item-hover",
};

const knowCarousel = new Carousel(skillListClasses, skillItemClasses);
knowCarousel.setListAndItems(skillList, skillItem, skills);
knowCarousel.setPositionStyle("margin", 20);

knowCarousel.setCarouselItemsPosition();
knowCarousel.addPositionListeners();
