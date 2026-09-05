(() => {
    const revealItems =
        document.querySelectorAll(".reveal");
    /*
        Reveal elements when they enter
        the viewport.
    */
    if ("IntersectionObserver" in window) {
        const observer =
            new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "is-visible"
                            );
                            obs.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.12
                }
            );
        revealItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(item => {
            item.classList.add(
                "is-visible"
            );
        });
    }
    /*
        Very subtle movement on the
        hero graphic while scrolling.
    */
    const heroRing =
        document.querySelector(".hero-ring");
    let ticking = false;
    window.addEventListener(
        "scroll",
        () => {
            if (
                ticking ||
                !heroRing ||
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }
            ticking = true;
            requestAnimationFrame(() => {
                const y =
                    Math.min(
                        window.scrollY,
                        500
                    );
                heroRing.style.transform =
                    `translateY(${y * 0.035}px)
                     rotate(${y * 0.008}deg)`;
                ticking = false;
            });
        },
        {
            passive: true
        }
    );
})();
