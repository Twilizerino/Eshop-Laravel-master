import gsap from "gsap";

let slider;
let gsapAnimation;

function initSlider() {
    slider = document.getElementById("slider");
    if (!slider || slider.children.length === 0) return;

    let sw = slider.children[0].offsetWidth;
    let tw = (slider.children.length / 2) * sw;
    let duration = Math.max(15, tw / 100);

    // Zabráníme duplicitním animacím
    if (gsapAnimation) gsapAnimation.kill();

    gsapAnimation = gsap.to(slider, {
        x: `-${tw}px`,
        duration: duration,
        ease: "power1.inOut",
        repeat: -1
    });

    addHoverEffects();
}

function addHoverEffects() {
    document.querySelectorAll("#slider img").forEach(img => {
        if (!img.dataset.listenerAdded) {
            img.addEventListener("mousemove", (e) => handleImageHover(e, img));
            img.addEventListener("mouseleave", () => resetImage(img));
            img.addEventListener("click", () => navigateToDetail(img));
            img.dataset.listenerAdded = "true"; // Zabrání opětovnému přidávání event listenerů
        }
    });
}

function handleImageHover(e, img) {
    let rect = img.getBoundingClientRect();
    let offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    let offsetY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(img, {
        scale: 1.5,  // 🟢 Zvýšený scale na 1.5 pro plynulejší efekt
        x: offsetX * -100,
        y: offsetY * -50,
        duration: 0.3,
        ease: "power2.out"
    });

    if (gsapAnimation) gsapAnimation.pause(); // Pozastavení slideru
}

function resetImage(img) {
    gsap.to(img, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
    });

    if (gsapAnimation) gsapAnimation.resume(); // Obnovení slideru
}

function navigateToDetail(img) {
    let url = img.getAttribute("data-url");
    if (url) {
        window.location.href = url;
    }
}

// Inicializace při načtení a Livewire eventech
document.addEventListener("DOMContentLoaded", initSlider);
document.addEventListener("livewire:load", initSlider);
document.addEventListener("livewire:updated", initSlider);