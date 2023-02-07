let menuToggle = document.querySelector('.mobileNav');
let navigation = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
});