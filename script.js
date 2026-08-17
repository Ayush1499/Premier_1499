// GSAP ScrollTrigger Register karo
gsap.registerPlugin(ScrollTrigger);

var allh1 = document.querySelectorAll("h1");
allh1.forEach(function(elem){
    var clutter = ""
    var texth1 = elem.textContent
    var splitedtext = texth1.split("")
    splitedtext.forEach(function(e){
        clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter
})
// for 1 element only
// var texth1 = document.querySelector("#firsth1").textContent
// var splitedtext = texth1.split("")
// var clutter = ""
// splitedtext.forEach(function(elem){
//     clutter += `<span>${elem}</span>`
// })
// document.querySelector("#firsth1").innerHTML=clutter
// console.log(clutter);

gsap.to("#page_para h1 span", {
    color: "var(--para-text-active)", // Light/Dark mode ke hisab se bright color ban jayega
    opacity: 1,
    stagger: 0.2,
    scrollTrigger:{
        trigger:"#page_para #firsth1",
        start:"top 75%",
        end:"top 10%",
        scrub:2,
    }
});



// ==========================================
// VIRTUAL DARK/LIGHT MODE TOGGLE BUTTON CREATION
// ==========================================
const nav = document.querySelector("nav");

// Ek naya <h2> element virtually create karo jo navbar ke right end mein fit ho
const toggleNavBtn = document.createElement("h2");
toggleNavBtn.id = "theme-toggle-btn";
toggleNavBtn.style.cursor = "pointer";
toggleNavBtn.style.display = "flex";
toggleNavBtn.style.justifyContent = "center";
toggleNavBtn.style.alignItems = "center";
toggleNavBtn.style.width = "10vw"; // Match vibe with nav h2 width

// Icon container inside the toggle button (Sun/Moon icon)
const themeIcon = document.createElement("i");
themeIcon.className = "ri-moon-line"; // Default icon
themeIcon.style.fontSize = "22px";
toggleNavBtn.appendChild(themeIcon);

// Navbar mein search icon (`nav h2:last-child`) ke just pehle ya end mein append karo
nav.appendChild(toggleNavBtn);

// Toggle Click Event Listener
toggleNavBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Icon change logic based on active mode
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.className = "ri-sun-line"; // Light mode icon on dark background
    gsap.to(themeIcon, { rotation: 360, duration: 0.4 });
  } else {
    themeIcon.className = "ri-moon-line"; // Dark mode icon on light background
    gsap.to(themeIcon, { rotation: 0, duration: 0.4 });
  }
});

// ==========================================
// 1. #PAGE2 SETUP (Fade & Zoom feature)
// ==========================================
const part1 = document.querySelector("#part1");
const imageFrame = part1.querySelector("img");
const title = part1.querySelector("h1");

const imageUrlsPage2 = [
  "https://images.unsplash.com/photo-1627292441194-0280c19e74e4?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
];

const parentFrame2 = document.createElement("div");
parentFrame2.style.position = "relative";
parentFrame2.style.width = "90%";
parentFrame2.style.height = "95%";
parentFrame2.style.overflow = "hidden";

imageFrame.remove();

imageUrlsPage2.forEach((url, index) => {
  const img = document.createElement("img");
  img.src = url;
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = "35% 35%";
  img.style.opacity = index === 0 ? "1" : "0";
  img.style.visibility = index === 0 ? "visible" : "hidden";
  parentFrame2.appendChild(img);
});

part1.insertBefore(parentFrame2, title);
const allImagesPage2 = parentFrame2.querySelectorAll("img");

const progressWrapper2 = document.createElement("div");
progressWrapper2.style.width = "90%";
progressWrapper2.style.height = "2px";
progressWrapper2.style.backgroundColor = "rgba(128,128,128,0.3)";
progressWrapper2.style.marginTop = "10px";
progressWrapper2.style.borderRadius = "4px";
progressWrapper2.style.overflow = "hidden";

const progressBar2 = document.createElement("div");
progressBar2.style.height = "100%";
progressBar2.style.width = "0%";
progressBar2.style.backgroundColor = "var(--text-color)";
progressWrapper2.appendChild(progressBar2);
part1.insertBefore(progressWrapper2, title);

let infiniteTl2;
let isHoveredOrClicked2 = false;

ScrollTrigger.create({
  trigger: part1,
  start: "top 80%",
  end: "bottom 20%",
  onEnter: () => {
    if (!infiniteTl2) startInfiniteLoop2();
  },
  onLeaveBack: () => {
    if (infiniteTl2) infiniteTl2.pause();
  },
});

function startInfiniteLoop2() {
  infiniteTl2 = gsap.timeline({ repeat: -1 });
  allImagesPage2.forEach((img, index) => {
    const nextIndex = (index + 1) % allImagesPage2.length;
    infiniteTl2
      .fromTo(
        progressBar2,
        { width: "0%" },
        { width: "100%", duration: 3, ease: "none" },
      )
      .to(allImagesPage2[nextIndex], {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        allImagesPage2[index],
        { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
        "<",
      );
  });
}

function getActiveImage(images) {
  return (
    Array.from(images).find(
      (img) => parseFloat(window.getComputedStyle(img).opacity) > 0.5,
    ) || images[0]
  );
}

parentFrame2.addEventListener("mouseenter", () => {
  if (infiniteTl2) infiniteTl2.pause();
  gsap.to(getActiveImage(allImagesPage2), {
    scale: 1.15,
    duration: 0.4,
    ease: "power2.out",
  });
});
parentFrame2.addEventListener("mouseleave", () => {
  if (infiniteTl2) infiniteTl2.resume();
  allImagesPage2.forEach((img) =>
    gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
  );
});
parentFrame2.addEventListener("click", () => {
  isHoveredOrClicked2 = !isHoveredOrClicked2;
  if (isHoveredOrClicked2) {
    if (infiniteTl2) infiniteTl2.pause();
    gsap.to(getActiveImage(allImagesPage2), {
      scale: 1.15,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    if (infiniteTl2) infiniteTl2.resume();
    allImagesPage2.forEach((img) =>
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
    );
  }
});

// ==========================================
// 2. #PAGE4 SETUP (Sliding Images Animation)
// ==========================================
const page4 = document.querySelector("#page4");
const page4Img = page4.querySelector("img");

const imageUrlsPage4 = [
  "https://images.unsplash.com/photo-1643737331524-68bbf021ad26?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
];

const parentFrame4 = document.createElement("div");
parentFrame4.style.position = "relative";
parentFrame4.style.width = "90%";
parentFrame4.style.height = "90%";
parentFrame4.style.overflow = "hidden";
parentFrame4.style.borderRadius = "10px";

page4Img.remove();

const allImagesPage4 = imageUrlsPage4.map((url, index) => {
  const img = document.createElement("img");
  img.src = url;
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = "30% 30%";

  if (index === 0) {
    gsap.set(img, { x: "0%", autoAlpha: 1 });
  } else {
    gsap.set(img, { x: "100%", autoAlpha: 0 });
  }

  parentFrame4.appendChild(img);
  return img;
});

page4.appendChild(parentFrame4);

const progressWrapper4 = document.createElement("div");
progressWrapper4.style.width = "90%";
progressWrapper4.style.height = "2px";
progressWrapper4.style.backgroundColor = "rgba(128,128,128,0.3)";
progressWrapper4.style.marginTop = "15px";
progressWrapper4.style.borderRadius = "4px";
progressWrapper4.style.overflow = "hidden";

const progressBar4 = document.createElement("div");
progressBar4.style.height = "100%";
progressBar4.style.width = "0%";
progressBar4.style.backgroundColor = "var(--text-color)";
progressWrapper4.appendChild(progressBar4);
page4.appendChild(progressWrapper4);

let infiniteTl4;
let isHoveredOrClicked4 = false;

ScrollTrigger.create({
  trigger: page4,
  start: "top 80%",
  end: "bottom 20%",
  onEnter: () => {
    if (!infiniteTl4) startInfiniteLoop4();
  },
  onLeaveBack: () => {
    if (infiniteTl4) infiniteTl4.pause();
  },
});

function startInfiniteLoop4() {
  infiniteTl4 = gsap.timeline({ repeat: -1 });
  allImagesPage4.forEach((img, index) => {
    const nextIndex = (index + 1) % allImagesPage4.length;
    const nextImg = allImagesPage4[nextIndex];

    infiniteTl4
      .fromTo(
        progressBar4,
        { width: "0%" },
        { width: "100%", duration: 3, ease: "none" },
      )
      .to(nextImg, {
        x: "0%",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        img,
        { x: "-100%", autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
        "<",
      )
      .set(img, { x: "100%" });
  });
}

parentFrame4.addEventListener("mouseenter", () => {
  if (infiniteTl4) infiniteTl4.pause();
  gsap.to(getActiveImage(allImagesPage4), {
    scale: 1.12,
    duration: 0.4,
    ease: "power2.out",
  });
});
parentFrame4.addEventListener("mouseleave", () => {
  if (infiniteTl4) infiniteTl4.resume();
  allImagesPage4.forEach((img) =>
    gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
  );
});
parentFrame4.addEventListener("click", () => {
  isHoveredOrClicked4 = !isHoveredOrClicked4;
  if (isHoveredOrClicked4) {
    if (infiniteTl4) infiniteTl4.pause();
    gsap.to(getActiveImage(allImagesPage4), {
      scale: 1.12,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    if (infiniteTl4) infiniteTl4.resume();
    allImagesPage4.forEach((img) =>
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
    );
  }
});

// ==========================================
// 3. #PAGE6 SIXTH_A SETUP (Sliding Images Animation)
// ==========================================
const sixthA = document.querySelector("#sixth_a");
const sixthAImg = sixthA.querySelector("img");
const sixthATitle = sixthA.querySelector("h1");

const imageUrlsSixthA = [
  "https://images.unsplash.com/photo-1758575603807-1f01152edcb5?q=80&w=787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
];

const parentFrameSixthA = document.createElement("div");
parentFrameSixthA.style.position = "relative";
parentFrameSixthA.style.width = "90%";
parentFrameSixthA.style.height = "95%";
parentFrameSixthA.style.overflow = "hidden";
parentFrameSixthA.style.borderRadius = "10px";

sixthAImg.remove();

const allImagesSixthA = imageUrlsSixthA.map((url, index) => {
  const img = document.createElement("img");
  img.src = url;
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = "35% 35%";

  if (index === 0) {
    gsap.set(img, { x: "0%", autoAlpha: 1 });
  } else {
    gsap.set(img, { x: "100%", autoAlpha: 0 });
  }

  parentFrameSixthA.appendChild(img);
  return img;
});

sixthA.insertBefore(parentFrameSixthA, sixthATitle);

const progressWrapperSixthA = document.createElement("div");
progressWrapperSixthA.style.width = "90%";
progressWrapperSixthA.style.height = "2px";
progressWrapperSixthA.style.backgroundColor = "rgba(128,128,128,0.3)";
progressWrapperSixthA.style.marginTop = "10px";
progressWrapperSixthA.style.borderRadius = "4px";
progressWrapperSixthA.style.overflow = "hidden";

const progressBarSixthA = document.createElement("div");
progressBarSixthA.style.height = "100%";
progressBarSixthA.style.width = "0%";
progressBarSixthA.style.backgroundColor = "var(--text-color)";
progressWrapperSixthA.appendChild(progressBarSixthA);
sixthA.insertBefore(progressWrapperSixthA, sixthATitle);

let infiniteTlSixthA;
let isHoveredOrClickedSixthA = false;

ScrollTrigger.create({
  trigger: sixthA,
  start: "top 80%",
  end: "bottom 20%",
  onEnter: () => {
    if (!infiniteTlSixthA) startInfiniteLoopSixthA();
  },
  onLeaveBack: () => {
    if (infiniteTlSixthA) infiniteTlSixthA.pause();
  },
});

function startInfiniteLoopSixthA() {
  infiniteTlSixthA = gsap.timeline({ repeat: -1 });
  allImagesSixthA.forEach((img, index) => {
    const nextIndex = (index + 1) % allImagesSixthA.length;
    const nextImg = allImagesSixthA[nextIndex];

    infiniteTlSixthA
      .fromTo(
        progressBarSixthA,
        { width: "0%" },
        { width: "100%", duration: 3, ease: "none" },
      )
      .to(nextImg, {
        x: "0%",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        img,
        { x: "-100%", autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
        "<",
      )
      .set(img, { x: "100%" });
  });
}

parentFrameSixthA.addEventListener("mouseenter", () => {
  if (infiniteTlSixthA) infiniteTlSixthA.pause();
  gsap.to(getActiveImage(allImagesSixthA), {
    scale: 1.12,
    duration: 0.4,
    ease: "power2.out",
  });
});
parentFrameSixthA.addEventListener("mouseleave", () => {
  if (infiniteTlSixthA) infiniteTlSixthA.resume();
  allImagesSixthA.forEach((img) =>
    gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
  );
});
parentFrameSixthA.addEventListener("click", () => {
  isHoveredOrClickedSixthA = !isHoveredOrClickedSixthA;
  if (isHoveredOrClickedSixthA) {
    if (infiniteTlSixthA) infiniteTlSixthA.pause();
    gsap.to(getActiveImage(allImagesSixthA), {
      scale: 1.12,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    if (infiniteTlSixthA) infiniteTlSixthA.resume();
    allImagesSixthA.forEach((img) =>
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" }),
    );
  }
});
