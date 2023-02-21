let menuToggle = document.querySelector('.mobileNav');
let navigation = document.querySelector('nav');
let mobileNavbar = document.querySelector('.mobileNavbar');
let shownProjectIndex = 0;
let projects = [
    {
        image: "images/recipebook.png",
        title: "Recipe Book",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vero alias illum magni repudiandae non reprehenderit minus corporis nisi earum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, eos.",
        technologies: ["Sass", "Javascript", "Vue", "Pinia"],
        demo: "#",
        github: "#"
    },
    {
        image: "images/recipebook.png",
        title: "History Quiz",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vero alias illum magni repudiandae non reprehenderit minus corporis nisi earum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, eos.",
        technologies: ["Sass", "Javascript", "Vue", "Pinia"],
        demo: "#",
        github: "#"
    },
    {
        image: "images/recipebook.png",
        title: "Ghibli Movie List",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vero alias illum magni repudiandae non reprehenderit minus corporis nisi earum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, eos.",
        technologies: ["Sass", "Javascript"],
        demo: "#",
        github: "#"
    },
    {
        image: "images/recipebook.png",
        title: "Space Tourism",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vero alias illum magni repudiandae non reprehenderit minus corporis nisi earum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, eos.",
        technologies: ["Sass", "Javascript", "Vue"],
        demo: "#",
        github: "#"
    }
];

let projectImage = document.querySelector('.projectImage');
let projectTitle = document.querySelector('.projectTitle');
let projectDesc = document.querySelector('.projectDesc');
let techBar = document.querySelector('.techBar');
let demo = document.querySelector('.demoLink');
let githubLink = document.querySelector('.githubLink');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let allDots = document.querySelectorAll('.dot');
let projectNavBarElements = document.querySelectorAll('.projectNavbar li');
let emptyInputMessage = document.querySelector('.emptyInput');
let invalidEmailMessage = document.querySelector('.invalidEmail');
let successfulSendingMessage = document.querySelector('.successfulSending');

const serviceID = "";
const templateID = "";

let sendButton = document.querySelector('#sendMessage');

function validateEmail(email) {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

sendButton.addEventListener('click', () => {
    emptyInputMessage.classList.remove('active');
    invalidEmailMessage.classList.remove('active');
    successfulSendingMessage.classList.remove('active');
    let nameInputValue = document.querySelector('#fromName').value;
    let emailInputValue = document.querySelector('#fromEmail').value;
    let messageInputValue = document.querySelector('#message').value;
    console.log(nameInputValue, emailInputValue, messageInputValue);
    if(!nameInputValue || !emailInputValue || !messageInputValue) {
        emptyInputMessage.classList.add('active');
    }
    else if(!validateEmail(emailInputValue)) {
        invalidEmailMessage.classList.add('active');
    }
    else {
        let contactTemplateParams = {
            fromName: nameInputValue,
            email: emailInputValue,
            message: messageInputValue
        };
        emailjs.send(serviceID, templateID, contactTemplateParams)
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            },
            function(error) {
            console.log('FAILED...', error);
        });
        nameInputValue = "";
        emailInputValue = "";
        messageInputValue = "";
        successfulSendingMessage.classList.add('active');
    }
    
});

document.addEventListener('DOMContentLoaded', ()=> {
    showProject(shownProjectIndex);
});

next.addEventListener('click', ()=> {
    slideProject(1);
});
prev.addEventListener('click', ()=> {
    slideProject(-1);
});

addSlideEvent(allDots);
addSlideEvent(projectNavBarElements);

function addSlideEvent(elements) {
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ()=> {
            shownProjectIndex = i;
            showProject(shownProjectIndex);
        });
    }
}

function showProject(shownProjectIndex) {
    projectImage.setAttribute('src', projects[shownProjectIndex].image);
    projectTitle.innerHTML = projects[shownProjectIndex].title;
    projectDesc.innerHTML = projects[shownProjectIndex].description;
    demo.setAttribute('href', projects[shownProjectIndex].demo);
    githubLink.setAttribute('href', projects[shownProjectIndex].github);

    techBar.innerHTML = "";

    projects[shownProjectIndex].technologies.forEach((technology) => {
        techBar.insertAdjacentHTML("beforeend", `<span>${technology}</span>`);
    });

    allDots.forEach((dot) => {
        dot.classList.remove('active');
    });
    allDots[shownProjectIndex].classList.add('active');

    projectNavBarElements.forEach((element) => {
        element.classList.remove('active');
    });
    projectNavBarElements[shownProjectIndex].classList.add('active');
}

function slideProject(n) {
    shownProjectIndex += n;
    if(shownProjectIndex < 0) {
        shownProjectIndex = projects.length - 1;
    }
    if(shownProjectIndex === projects.length) {
        shownProjectIndex = 0;
    }
    showProject(shownProjectIndex);
}

function scrollToElement(elementId) {
    let element = document.querySelector(elementId);
    window.scroll(0, element.offsetTop - 90);
}

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNavbar.classList.toggle('active');
});

window.addEventListener("scroll", () => {
    navigation.classList.toggle("sticky", window.scrollY > 0);
});