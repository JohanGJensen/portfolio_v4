const progress = document.getElementById('site-progress');
const body = document.getElementsByTagName('body');

progress.setAttribute('value', window.scrollY);

const siteProgress = () => {
    let totalHeight = body[0].clientHeight - this.innerHeight;

    progress.setAttribute('value', (this.scrollY / totalHeight) * 100);
};

window.addEventListener('scroll', siteProgress);

const items = [
    {
        li: 'Javascript',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #F9DD79',
                children: [{ element: 'h3', text: 'Javascript' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `Javascript is my primary developer skill,<br>
                                                    and the language which I have built my<br>
                                                    toolset around.<br>
                                                    I work regularly with es5 AND above.<br><br>
                                                    For my current job, the features I am building<br>
                                                    all rely on the JavaScript Canvas API.<br><br>
                                                    I have been programming with JS<br>
                                                    for roughly 1.5 years now.<br>
                ` }]
            }
        ]
    },
    {
        li: 'React',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #6189C6',
                children: [{ element: 'h3', text: 'React' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `I was introduced to React right around<br>
                                        the time where class extended components<br>
                                        were getting replaced with a new feature<br>
                                        known as “hooks”.<br><br>
                                        This means I have been taught<br>
                                        to use classes, but worked<br>
                                        in a professional setting with hooks.<br>
                ` }]
            }
        ]
    },
    {
        li: 'Sencha Ext',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #549F64',
                children: [{ element: 'h3', text: 'Sencha Ext' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `This framework has been my bread and butter<br>
                                                    for a full year now. At my current job I work<br>
                                                    on an application that is built from the ground up<br>
                                                    with Sencha (2.0.0).<br><br>
                                                    My role is not maintenance, but building<br>
                                                    features for the application.<br>
                ` }]
            }
        ]
    },
    {
        li: 'TypeScript',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #294E80',
                children: [{ element: 'h3', text: 'TypeScript' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `
                    React and TypeScript go<br>
                    almost 1:1 hand in hand.<br><br>
                    There is a good reason why so many require it.<br>
                    The type checking adds a layer of app stability<br>
                    VanillaJS simply does not have.<br>
                ` }]
            }
        ]
    },
    {
        li: 'Python',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #FFE66E',
                children: [{ element: 'h3', text: 'Python' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `
                    Python I have used in combination with projects<br>
                    at my current job.<br><br>
                    The application I work on utilizes Docker-Compose to<br>
                    host a cluster of workers that handles specific tasks<br>
                    and requests sent by the application itself.   
                ` }]
            }
        ]
    },
    {
        li: 'Docker',
        children: [
            {
                element: 'div',
                class: 'carousel-item-header',
                style: 'background-color: #35A0F0',
                children: [{ element: 'h3', text: 'Docker' }]
            },
            {
                element: 'div',
                class: 'carousel-item-body',
                children: [{
                    element: 'p', text: `
                                I use Docker daily, mainly to launch the containers<br>
                                needed to perform my tasks at hand.
` }]
            }
        ]
    },
];

const wList = document.getElementsByClassName('carousel-list-wrapper');
const wItem = document.getElementsByClassName('carousel-item-wrapper');

const itemItem = document.getElementsByClassName('carousel-item');
const currentItem = document.getElementsByClassName('carousel-item-selected');

setListAndItems(wList, wItem, items);

const getIndex = () => {
    let idx = 0;

    for (let i = 0; wItem[0].children.length > i; i++) {
        if (wItem[0].children[i].className?.includes('carousel-item-selected')) idx = i;
    };

    return idx;
};

const setCarouselItemsPosition = () => {
    let wrapperWidth = wItem[0].clientWidth;
    let itemWidth;
    let current = false;
    let margin = 100;
    let placement = 250;
    let idx = 0;

    idx = getIndex();

    wItem[0].childNodes.forEach(item => {
        if (!item.className?.includes('carousel-item')) return;
        itemWidth = item.clientWidth;

        if (item.className?.includes('carousel-item-selected')) {
            current = true;
            placement = 250;

            item.style.left = (wrapperWidth / 2) - (itemWidth / 2) + 'px';

            return;
        }

        if (current) {
            item.style.left = ((wrapperWidth / 2) + margin + placement) + 'px';

            placement += itemWidth + margin;
        } else {
            item.style.left = ((wrapperWidth / 2) - ((itemWidth + margin) * idx) - placement) + 'px';

            // placement += itemWidth + margin;
            idx--;
        }
    })
}

setCarouselItemsPosition();

window.addEventListener('resize', setCarouselItemsPosition);

wItem[0].childNodes.forEach(item => {
    if (!item.className?.includes('carousel-item')) return;

    item.addEventListener('click', setCarouselItemsPosition);
});
wList[0].childNodes.forEach(item => {
    if (!item.className?.includes('carousel-list')) return;

    item.addEventListener('click', setCarouselItemsPosition);
});