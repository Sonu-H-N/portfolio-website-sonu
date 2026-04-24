// Theme toggle
const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
    document.body.classList.toggle("light-mode");
};

// Hamburger
const menu = document.getElementById("menu-toggle");
const links = document.getElementById("nav-links");

menu.onclick = () => {
    links.classList.toggle("active");
};

// Typing effect
let text = "Sonu H N";
let i = 0;

function typing(){
    if(i < text.length){
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing,100);
    }
}
typing();

// Scroll animation
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el=>{
        let top = el.getBoundingClientRect().top;
        if(top < window.innerHeight-100){
            el.classList.add("active");
        }
    });
});