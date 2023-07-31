let menuToggle = document.querySelector('.mobileNav');
let navigation = document.querySelector('nav');
let mobileNavbar = document.querySelector('.mobileNavbar');
let shownProjectIndex = 0;
let projects = [
    {
        image: "images/recipe-bgrounded.png",
        title: "Recipe Book",
        description: "A Recipe Book egy recepteket kezelő full-stack alkalmazás. Bejelentkezés után hozzáférhetünk a saját receptgyűjteményünkhöz, hozzáadhatunk újakat, vagy módosíthatjuk a meglévő receptjeinket.",
        technologies: ["Vue", "ExpressJS", "PostgreSQL", "Sass", "REST API"],
        demo: "https://recipebook-frontend.fly.dev/",
        github: "https://github.com/LunaDephensis/Recipebook"
    },
    {
        image: "images/history-bgrounded.png",
        title: "History Quiz",
        description: "Létrehoztam egy történelmi kvízjátékot, amiben a játékosok különböző témakörökben tehetik próbára a tudásukat. A helyes válaszok után pontokat szerezhetnek, melyekkel kitüntetéseket oldhatnak fel. Eredményeik a local storageban lesznek eltárolva.",
        technologies: ["Sass", "Vue"],
        demo: "https://historyquiz-demo.netlify.app/",
        github: "https://github.com/LunaDephensis/HistoryQuiz"
    },
    {
        image: "images/ghibli-bgrounded2.png",
        title: "Ghibli Movie List",
        description: "A projekt során egy olyan filmlista létrehozása volt a célom, ahol a keresésen túl a felhasználónak lehetősége van személyre szabható szűrésre és rendszerezésre egyaránt. Az adatokat a harmadik féltől származó Ghibli API biztosítja.",
        technologies: ["Sass", "Javascript", "REST API"],
        demo: "#",
        github: "https://github.com/LunaDephensis/GhibliMovieList"
    },
    {
        image: "images/space-bgrounded.png",
        title: "Space Tourism",
        description: "A dizájn pontos megvalósítására törekedtem a Space Tourism nevű Frontend Mentor challenge teljesítése közben. A challenge részletes leírása megtekinthető <a target='_blank' href='https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3'>ITT</a>.",
        technologies: ["Sass", "Javascript", "Vue"],
        demo: "https://spacetourism-demo.netlify.app/destination",
        github: "https://github.com/LunaDephensis/SpaceTourism"
    },
    {
        image: "images/countries-bgrounded.png",
        title: "Countries",
        description: "Ezt a Frontend Mentor challenge-et a Tailwind CSS framework és a React együttes felhasználásával valósítottam meg. A challenge részletes leírása megtekinthető <a target='_blank' href='https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca'>ITT</a>.",
        technologies: ["Tailwind", "React", "REST API"],
        demo: "https://countries-react-demo.netlify.app/",
        github: "https://github.com/LunaDephensis/countries-react"
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
let desktopNavElements = document.querySelectorAll('.navbar li a');
let mobileNavElements = document.querySelectorAll('.mobileNavbar li a');
let skillsPage = document.querySelector('#skills');
let projectsPage = document.querySelector('#projects');
let contactPage = document.querySelector('#contact');

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

function scrollToElement(event, elementId) {
    desktopNavElements.forEach((element) => {
        element.classList.remove('active');
    });
    mobileNavElements.forEach((element) => {
        element.classList.remove('active');
    });
    let element = document.querySelector(elementId);
    window.scroll(0, element.offsetTop - 90);
    event.target.classList.add('active');
    mobileNavbar.classList.remove('active');
    menuToggle.classList.remove('active');
}

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNavbar.classList.toggle('active');
});

window.addEventListener("scroll", () => {
    navigation.classList.toggle("sticky", window.scrollY > 0);
});

window.addEventListener("scroll", () => {
    
    if(window.scrollY > skillsPage.offsetTop - 150 && window.scrollY < projectsPage.offsetTop - 150) {
        removeClassFrom(desktopNavElements);
        removeClassFrom(mobileNavElements);
        desktopNavElements[0].classList.add('active');
        mobileNavElements[0].classList.add('active');
    }
    else if(window.scrollY > projectsPage.offsetTop - 150 && window.scrollY < contactPage.offsetTop - 150) {
        removeClassFrom(desktopNavElements);
        removeClassFrom(mobileNavElements);
        desktopNavElements[1].classList.add('active');
        mobileNavElements[1].classList.add('active');
    }
    else if(window.scrollY > contactPage.offsetTop - 150) {
        removeClassFrom(desktopNavElements);
        removeClassFrom(mobileNavElements);
        desktopNavElements[2].classList.add('active');
        mobileNavElements[2].classList.add('active');
    }
    else {
        removeClassFrom(desktopNavElements);
        removeClassFrom(mobileNavElements);
    }
});

function removeClassFrom(elementList) {
    elementList.forEach((element) => {
        element.classList.remove('active');
    });
}