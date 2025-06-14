

// const dropdowns = document.querySelectorAll('.menu-dropdown');

// dropdowns.forEach(dropdown => {
//   const toggle = dropdown.querySelector('.dropdown-toggle');

//   dropdown.addEventListener('mouseenter', () => {
//     // Close all other dropdowns
//     dropdowns.forEach(d => {
//       if (d !== dropdown) {
//         d.classList.remove('open');
//       }
//     });
//     // Open current
//     dropdown.classList.add('open');
//   });

//   dropdown.addEventListener('mouseleave', () => {
//     dropdown.classList.remove('open');
//   });
// });



// nav bar scrolled
const navbar = document.getElementById('navbar');
const lenis = new Lenis({
  smooth: true
});
lenis.on('scroll', ({
  scroll
}) => {
  if (scroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);




//cursor pointer
$(window).mousemove(function (e) {
  $(".ring").css(
    "transform",
    `translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
  );
});
//END cursor pointer


// loader
document.body.style.overflow = 'hidden'; // Prevent scrolling during loader
window.scrollTo(0, 0); // Ensure loader is visible at top
const presvg = document.getElementById('presvg');
const tl2 = gsap.timeline({
  defaults: {
    ease: 'power2.out',
    duration: 1.5,
  },
  onComplete: () => {
    setTimeout(() => {
      document.body.style.overflow = 'visible';
    }, 500);
    document.body.style.overflow = 'visible';
    // Start text animation after loader
  }
});
const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';
// Animate the logo image
tl2.from('.loader-logo', {
    y: 300,
    skewY: 15,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  })
  .to('.loader-logo', {
    y: -600,
    skewY: 0,
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
  }, '+=0.3')
  // Morph SVG to curve
  .to(presvg, {
    attr: {
      d: curve
    },
    duration: 1,
    ease: 'power3.inOut',
  }, '-=0.6')
  // Morph SVG to flat
  .to(presvg, {
    attr: {
      d: flat
    },
    duration: 1,
    ease: 'power3.inOut',
  })
  // Slide loader up and out
  .to('.loader-wrap', {
    y: '-100vh',
    duration: 1.2,
    ease: 'expo.inOut',
  }, '+=0.3')
  // Hide loader after animation
  .to('.loader-wrap', {
    zIndex: -1,
    display: 'none',
    duration: 0,
  });
// END loader






// reveal type
gsap.registerPlugin(ScrollTrigger)
const splitTypes = document.querySelectorAll('.reveal-type')
splitTypes.forEach((char, i) => {
  const bg = char.dataset.bgColor
  const fg = char.dataset.fgColor
  const text = new SplitType(char, {
    types: 'words'
  })
  gsap.fromTo(text.words, {
    color: bg,
  }, {
    color: fg,
    duration: 0.3,
    stagger: 0.02,
    scrollTrigger: {
      trigger: char,
      start: 'top 90%',
      end: 'bottom 40%',
      scrub: true,
      markers: false,
      toggleActions: 'play play reverse reverse'
    }
  })
})
requestAnimationFrame(raf)

// what we do
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".what-we-do-section",
      start: "top top",
      end: "+=800", // increase/decrease based on scroll length
      scrub: true,
      pin: true,
      markers: false // set true for debugging
    }
  });

  // Step 1: Reveal Middle
  tl.from(".event-column-middle", {
    opacity: 0,
    y: 250,
    duration: 5,
    ease: "power2.out"
  });

  // Step 2: Reveal Right
  tl.from(".event-column-left", {
    opacity: 0,
    y: 100,
    duration: 3,
    ease: "power2.out"
  });

  // Step 3: Reveal Left
  tl.from(".event-column-right", {
    opacity: 0,
    y: 100,
    duration: 3,
    ease: "power2.out"
  });
});


//// mobile header
const menuButton = document.querySelector('.menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const menuItems = document.querySelectorAll('.menu a');
const html = document.documentElement;
const body = document.body;

let isOpen = false;

// Function to check if it's mobile view
function isMobileView() {
  return window.innerWidth <= 992;
}

// Function to open the menu
function openMenu() {
  html.classList.add('no-scroll');
  body.classList.add('no-scroll');

  // Slide in menu from right
  gsap.to(menuOverlay, {
    duration: 0.5,
    right: '0%',
    ease: 'power3.out'
  });

  // Animate menu links
  gsap.fromTo(menuItems, {
    opacity: 0,
    x: 20
  }, {
    duration: 0.5,
    opacity: 1,
    x: 0,
    stagger: 0.1,
    delay: 0.2,
    ease: 'power3.out'
  });
}

// Function to close the menu
function closeMenu() {
  html.classList.remove('no-scroll');
  body.classList.remove('no-scroll');

  // Animate links out
  gsap.to(menuItems, {
    duration: 0.3,
    opacity: 0,
    x: 20,
    stagger: -0.1
  });

  // Slide out menu to the right
  gsap.to(menuOverlay, {
    duration: 0.5,
    right: isMobileView() ? '-100%' : '-50%',
    delay: 0.3,
    ease: 'power3.in'
  });
}

// Toggle menu on button click
menuButton.addEventListener('click', () => {
  if (!isOpen) {
    openMenu();
  } else {
    closeMenu();
  }
  isOpen = !isOpen;
  menuButton.classList.toggle('open', isOpen);
});

//// END mobile header

//// dropdown menu
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();

    const parent = toggle.closest('.menu-dropdown');

    // Close all other dropdowns
    document.querySelectorAll('.menu-dropdown').forEach(item => {
      if (item !== parent) {
        item.classList.remove('open');
      }
    });

    // Toggle the clicked one
    parent.classList.toggle('open');
  });
});

//// END dropdown menu


// portfolio
document.querySelectorAll('.portfolio-items').forEach(item => {
  const content = item.querySelector('.portfolio-items-cont');

  item.addEventListener('mouseenter', () => {
    gsap.killTweensOf(content);
    gsap.to(content, {
      y: -30,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.killTweensOf(content);

    gsap.to(content, {
      y: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    });
  });
});


// why mix 
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".step").forEach((step, index) => {
    gsap.from(step, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
});


// cta
gsap.from(".cta-content", {
  duration: 1,
  y: -300,
  opacity: 0,
  stagger: 3,
  scrollTrigger: {
    trigger: ".cta-content",
    start: "top 50%",
    end: "bottom 20%",
    scrub: true,
    markers: false,
    toggleActions: "play reverse play reverse",
    onEnter: () => startCounting(),
  }
});


// letstalk
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".letstalk .letstalk-content", {
    duration: 1,
    x: -300,
    opacity: 0,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".letstalk .letstalk-content",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false,
        toggleActions: "play none none reverse",
    },
  })
});


// astraunet 2
gsap.registerPlugin(ScrollTrigger);

gsap.to(".abt-astr2 img", {
  x: -200,
  ease: "none",
  scrollTrigger: {
    trigger: ".abt-astr2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});
gsap.to(".abt-astr2 img", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});



// inner banner
var tl = gsap.timeline({
  defaults: {
    autoAlpha: 0,
    ease: "power2",
    duration: 1
  }
});

tl.from(".inner-banner img", {
    scale: 1.2,
    duration: 10
  })
  .from(".inner-banner-cnt h2", {
    x: -50
  }, 0.5)
  .from(".inner-banner-cnt p", {
    x: -50
  }, 0.9)

// tl.to(".inner-banner img", { scale: 1.2, opacity: 1, duration: 10 })
//   .from(".inner-banner img", { opacity: 0, duration: 1 }, "<")
//   .from("h2", { x: -30 }, 0.7)
//   .from(".inner-banner", { duration: 2, x: 30 }, 1.1)
//   .from(".button", { y: 30 }, 1.3);


// partners
gsap.registerPlugin(ScrollTrigger);

// gsap.from(".partners-item-out.owl-carousel .item", {
//   duration: 200,
//   x: 100,
//   opacity: 0,
//   stagger: 50,
//   scrollTrigger: {
//     trigger: ".partners-item-out.owl-carousel .item",
//     start: "top 100%",
//     end: "center 50%",
//     scrub: true,
//     markers: false,
//     toggleActions: "play reverse play reverse",
//   },
// });

// gsap.from(".partners-item-out2.owl-carousel .item", {
//   duration: 200,
//   x: -100,
//   opacity: 0,
//   stagger: 50,
//   scrollTrigger: {
//     trigger: ".partners-item-out2.owl-carousel .item",
//     start: "top 100%",
//     end: "center 50%",
//     scrub: true,
//     markers: false,
//     toggleActions: "play none none reverse",
//   },
// });


// partners about
$(document).ready(function () {
  let owl2 = $(".partners-item-out");
  owl2.owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    center: true,
    stagePadding: 0,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      700: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});

// partners about
$(document).ready(function () {
  let owl2 = $(".partners-item-out2");
  owl2.owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    center: true,
    rtl: true,
    stagePadding: 0,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      700: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});



// ceo-message
gsap.from(".ceo-message-in", {
  duration: 1,
  x: 300,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
      trigger: ".ceo-message-in",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      markers: false,
      toggleActions: "play none none reverse",
  },
});


// teams about
gsap.from(".team-block-three", {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".team-block-three",
    start: "top 60%",
    toggleActions: "play none none reverse",
  }
});


// new at mis
gsap.from(".related-blogs", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".right-blog-in",
        start: "top 60%",
        toggleActions: "play none none reverse",
    }
});


// career openings
gsap.from(".career_openings_all", {
    duration: 300,
    x: 100,
    opacity: 0,
    stagger: 50,
    scrollTrigger: {
        trigger: ".career_openings_all",
        start: "top 80%",
        end: "center 30%",
        scrub: true,
        markers: false,
        toggleActions: "play reverse play reverse",
    },
});


// service page
gsap.from(".inner-serv-cont .serv-inner-items-out", {
  duration: 1,
  x: 100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".inner-serv-cont .serv-inner-items-out",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
    markers: false,
    toggleActions: "play none none reverse",
  },
});


// contact
gsap.from(".left-contact", {
  duration: 1,
  x: -100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
      trigger: ".left-contact",
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
  }
});
gsap.from(".right-contact", {
  duration: 1,
  x: 100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
      trigger: ".right-contact",
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
  }
});


// portfolio banner
$(document).ready(function () {
  $(".portf-page-item-out").owlCarousel({
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    center: true,
    // ltr: true,
    stagePadding: 0,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      700: {
        items: 3
      },
      900: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  });
});


// $(document).ready(function () {
//   $(".portf-page-item-out2").owlCarousel({
//     margin: 20,
//     nav: false,
//     autoplay: true,
//     autoplayTimeout: 2000,
//     autoplayHoverPause: true,
//     center: true,
//     rtl: true,
//     stagePadding: 0,
//     loop: true,
//     responsive: {
//       0: {
//         items: 1
//       },
//       400: {
//         items: 2
//       },
//       700: {
//         items: 3
//       },
//       1000: {
//         items: 3
//       }
//     }
//   });
// });


// portfolio banner
$(document).ready(function () {
  $(".portf-page-item-popup").owlCarousel({
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    center: true,
    ltr: true,
    stagePadding: 0,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      700: {
        items: 3
      },
      900: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  });
});


// Lenis disabled
const disableLenisSections = document.querySelectorAll('.modal-main-input');

disableLenisSections.forEach((section) => {
  section.addEventListener('wheel', (e) => {
    lenis.stop();

    section.scrollTop += e.deltaY;

    e.preventDefault();

    setTimeout(() => lenis.start(), 100);
  }, {
    passive: false
  });
});





// about
gsap.from(".left-page-career-in", {
  duration: 1,
  x: -100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
      trigger: ".left-page-career-in",
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
  }
});
gsap.from(".right-page-career-in-out", {
  duration: 1,
  x: 100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
      trigger: ".right-page-career-in-out",
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
      markers: false,
      toggleActions: "play reverse play reverse",
  }
});



// change text
$(document).ready(function () {
  var changebox = $(".changebox");

  var firstclone = changebox.children(":first").clone();
  changebox.append(firstclone);

  var fsstr = changebox.parent().css("font-size");
  fsstr = fsstr.slice(0, fsstr.indexOf("p"));
  var fs = parseInt(fsstr);

  changebox.css("height", changebox.parent().css("line-height"));
  ChangeSize(0);
  setInterval(Next, 2000);

  function Next() {
    if (typeof Next.i == 'undefined') {
      Next.i = 0;
    }
    Next.i++;
    if (Next.i == changebox.children("span").length) {
      Next.i = 1;
      changebox.scrollTop(0);
    }
    changebox.animate({
      scrollTop: (fs * Next.i) + Next.i * 5 + 3
    }, 500);
    setTimeout(function () {
      ChangeSize(Next.i);
    }, 500);
  }

  function ChangeSize(i) {
    var word = changebox.children("span").eq(i);
    var wordsize = word.css("width");
    changebox.css("width", wordsize);
  }
});



// last career page reveal text
// document.addEventListener("DOMContentLoaded", function () {
//   const paragraph2 = document.getElementById("splitText");
//   const words2 = paragraph2.innerHTML.split(" "); // Split by words
//   paragraph2.innerHTML = words2.map(word => `<span class="word2">${word}</span>`).join(" ");

//   gsap.registerPlugin(ScrollTrigger);

//   gsap.from(".word2", {
//     opacity: 0.3,
//     y: 20,
//     stagger: 0.1, // Adds delay between each word
//     duration: 0.5,
//     scrollTrigger: {
//       trigger: "#textSection",
//       start: "center center",
//       end: "+=150%",
//       scrub: true,
//       pin: true
//     }
//   });
// });


// testimonials
// gsap.from(".testim-in", {
//   duration: 1,
//   x: 300,
//   opacity: 0,
//   stagger: 0.3,
//   scrollTrigger: {
//     trigger: ".testim-in",
//     start: "top 80%",
//     end: "top 20%",
//     scrub: true,
//     markers: false,
//     toggleActions: "play none none reverse",
//   },
// });

$('.testimonial-carousel').owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    992: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
});


// filter profilePage
const filterContainer = document.querySelector(".pf-category-filter"),
  galleryItems = document.querySelectorAll(".pf-category-item");

filterContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter-item")) {
    // deactivate existing active 'filter-item'
    filterContainer.querySelector(".active").classList.remove("active");
    // activate new 'filter-item'
    event.target.classList.add("active");
    const filterValue = event.target.getAttribute("data-filter");
    galleryItems.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === 'all') {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  }
});



// validation
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Collect form fields
    const name = document.getElementById('name');
    const email = document.getElementById('mail');
    const phone = document.getElementById('phone');
    const organization = document.getElementById('org');
    const subject = document.getElementById('subject');
    const message = document.querySelector('textarea');
    const terms = document.getElementById('termsCheck');

    // Validation flag
    let valid = true;
    let errorMsg = "";

    // Name validation
    if (name.value.trim() === '') {
      valid = false;
      errorMsg += "Full name is required.\n";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      valid = false;
      errorMsg += "Please enter a valid email address.\n";
    }

    // Optional: phone number check (basic)
    if (phone.value && !/^\d{10,15}$/.test(phone.value.trim())) {
      valid = false;
      errorMsg += "Enter a valid phone number (10–15 digits).\n";
    }

    // Subject check
    if (subject && subject.value.trim() === '') {
      valid = false;
      errorMsg += "Subject is required.\n";
    }

    // Message check
    if (message.value.trim() === '') {
      valid = false;
      errorMsg += "Message cannot be empty.\n";
    }

    // Terms check
    if (!terms.checked) {
      valid = false;
      errorMsg += "You must accept the Terms & Conditions.\n";
    }

    if (valid) {
      alert("Form submitted successfully! ✅");
      this.submit(); // Submit form or handle via AJAX
    } else {
      alert(errorMsg);
    }
  });






// clients banner







// window.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('rotationContainer');
//     const items = container.querySelectorAll('.label-ring');
//     const radius = container.offsetWidth / 2.5; // space from center
//     const centerX = container.offsetWidth / 2;
//     const centerY = container.offsetHeight / 2;
//     const total = items.length;

//     items.forEach((item, index) => {
//       const angle = (index / total) * 2 * Math.PI;
//       const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
//       const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
//       item.style.left = `${x}px`;
//       item.style.top = `${y}px`;
//     });
//   });




// window.addEventListener("DOMContentLoaded", () => {
//     document.querySelector(".cnt-page-main-heading").style.animationPlayState = "running";
//     document.querySelector(".cnt-page-sub-heading").style.animationPlayState = "running";
//   });





