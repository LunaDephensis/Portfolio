let menuToggle = document.querySelector('.mobileNav');
let navigation = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
});

window.addEventListener("scroll", () => {
    navigation.classList.toggle("sticky", window.scrollY > 0);
});