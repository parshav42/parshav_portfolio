/* ==================================================
   Premium Portfolio — Interactions
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------
       1. Scroll-reveal animation
    --------------------------------------------------- */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
        revealObserver.observe(el);
    });

    /* --------------------------------------------------
       2. Hero stats counter
       Triggers when hero section enters viewport.
       Smooth count-up over 1.8s using ease-out.
    --------------------------------------------------- */
    const statNums = document.querySelectorAll(".stat-num[data-target]");
    const DURATION = 1800;

    function animateCounter(el) {
        if (el.dataset.counted === "true") return;
        el.dataset.counted = "true";
        const target = Number(el.dataset.target);
        let startTime = null;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.round(target * easedProgress);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    if (statNums.length) {
        const statsSection = document.getElementById("home");
        const statsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        statNums.forEach((el) => animateCounter(el));
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );
        if (statsSection) {
            statsObserver.observe(statsSection);
        } else {
            statNums.forEach((el) => animateCounter(el));
        }
    }

    /* --------------------------------------------------
       3. Cursor-reactive neural network background
       Canvas is scoped to the sections after the hero.
    --------------------------------------------------- */
    const neuralStage = document.getElementById("neuralStage");
    const neuralCanvas = document.getElementById("neuralCanvas");
    const aboutSection = document.getElementById("about");
    if (neuralStage && neuralCanvas) {
        const ctx = neuralCanvas.getContext("2d");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mouse = { x: -1000, y: -1000, active: false };
        const nodes = [];
        const sparks = [];
        const LINK_DISTANCE = 156;
        const REACTION_RADIUS = 190;
        let width = 0;
        let height = 0;
        let lastSparkAt = 0;

        function createNodes() {
            nodes.length = 0;
            const isMobile = window.matchMedia("(max-width: 640px)").matches;
            const count = isMobile ? 42 : Math.min(118, Math.max(76, Math.round((width * height) / 24000)));
            for (let i = 0; i < count; i += 1) {
                nodes.push({
                    x: 24 + Math.random() * Math.max(1, width - 48),
                    y: 36 + Math.random() * Math.max(1, height - 72),
                    vx: (Math.random() - 0.5) * 0.12,
                    vy: (Math.random() - 0.5) * 0.12,
                    size: 1.35 + Math.random() * 1.1
                });
            }
        }

        function resizeCanvas() {
            const bounds = neuralStage.getBoundingClientRect();
            width = Math.max(1, Math.round(bounds.width));
            height = Math.max(1, Math.round(neuralStage.offsetHeight));
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            neuralCanvas.width = Math.round(width * pixelRatio);
            neuralCanvas.height = Math.round(height * pixelRatio);
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            createNodes();
        }

        function distance(a, b) {
            return Math.hypot(a.x - b.x, a.y - b.y);
        }

        function addSparks(now) {
            if (!mouse.active || now - lastSparkAt < 80) return;
            const nearby = nodes
                .map((node) => ({ node, distance: distance(node, mouse) }))
                .filter((item) => item.distance < REACTION_RADIUS)
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 5)
                .map((item) => item.node);

            nearby.forEach((node) => {
                const neighbour = nodes
                    .filter((candidate) => candidate !== node)
                    .map((candidate) => ({ candidate, distance: distance(node, candidate) }))
                    .filter((item) => item.distance < LINK_DISTANCE)
                    .sort((a, b) => a.distance - b.distance)[0];
                if (neighbour) sparks.push({ from: node, to: neighbour.candidate, start: now, duration: 420 });
            });
            sparks.splice(10);
            lastSparkAt = now;
        }

        function drawLandscape() {
            // A quiet, game-inspired skyline anchors the lower edge of About.
            const aboutHeight = aboutSection ? aboutSection.offsetHeight : Math.min(540, height * 0.22);
            const horizon = Math.max(320, Math.min(aboutHeight - 16, 560));
            const peak = Math.max(118, horizon - 175);

            ctx.beginPath();
            ctx.moveTo(-40, horizon);
            ctx.lineTo(width * 0.12, horizon - 82);
            ctx.lineTo(width * 0.28, peak);
            ctx.lineTo(width * 0.46, horizon - 106);
            ctx.lineTo(width * 0.65, horizon - 38);
            ctx.lineTo(width * 0.82, horizon - 138);
            ctx.lineTo(width + 40, horizon - 56);
            ctx.lineTo(width + 40, horizon + 40);
            ctx.lineTo(-40, horizon + 40);
            ctx.closePath();
            ctx.fillStyle = "rgba(125, 211, 252, 0.25)";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-30, horizon + 8);
            ctx.lineTo(width * 0.18, horizon - 38);
            ctx.lineTo(width * 0.38, horizon - 134);
            ctx.lineTo(width * 0.56, horizon - 34);
            ctx.lineTo(width * 0.73, horizon - 92);
            ctx.lineTo(width + 30, horizon - 12);
            ctx.lineTo(width + 30, horizon + 48);
            ctx.lineTo(-30, horizon + 48);
            ctx.closePath();
            ctx.fillStyle = "rgba(56, 189, 248, 0.17)";
            ctx.fill();

            const buildings = [
                { x: width * 0.07, w: 36, h: 74 },
                { x: width * 0.15, w: 50, h: 110 },
                { x: width * 0.75, w: 48, h: 98 },
                { x: width * 0.86, w: 34, h: 64 }
            ];
            buildings.forEach((building, index) => {
                const y = horizon - building.h;
                ctx.fillStyle = "rgba(14, 165, 233, 0.24)";
                ctx.fillRect(building.x, y, building.w, building.h);
                ctx.strokeStyle = "rgba(2, 132, 199, 0.52)";
                ctx.lineWidth = 1.25;
                ctx.strokeRect(building.x, y, building.w, building.h);
                ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
                for (let row = 12; row < building.h - 10; row += 16) {
                    ctx.fillRect(building.x + 9, y + row, building.w - 18, 2);
                }
                if (index === 1 || index === 2) {
                    ctx.beginPath();
                    ctx.moveTo(building.x + building.w / 2, y);
                    ctx.lineTo(building.x + building.w / 2, y - 21);
                    ctx.strokeStyle = "rgba(2, 132, 199, 0.62)";
                    ctx.stroke();
                }
            });

            ctx.beginPath();
            ctx.moveTo(0, horizon + 1);
            ctx.lineTo(width, horizon + 1);
            ctx.strokeStyle = "rgba(14, 165, 233, 0.38)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        function draw(now) {
            ctx.clearRect(0, 0, width, height);
            drawLandscape();

            nodes.forEach((node) => {
                if (!prefersReducedMotion) {
                    node.x += node.vx;
                    node.y += node.vy;
                    if (node.x < 20 || node.x > width - 20) node.vx *= -1;
                    if (node.y < 28 || node.y > height - 28) node.vy *= -1;
                }
            });

            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const linkLength = distance(a, b);
                    if (linkLength > LINK_DISTANCE) continue;
                    const reaction = mouse.active ? Math.max(0, 1 - Math.min(distance(a, mouse), distance(b, mouse)) / REACTION_RADIUS) : 0;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.10 + reaction * 0.34})`;
                    ctx.lineWidth = 0.55 + reaction * 0.65;
                    ctx.stroke();
                }
            }

            if (mouse.active) {
                const closest = nodes
                    .map((node) => ({ node, distance: distance(node, mouse) }))
                    .filter((item) => item.distance < REACTION_RADIUS)
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 4);
                closest.forEach(({ node, distance: nodeDistance }) => {
                    const opacity = 0.28 * (1 - nodeDistance / REACTION_RADIUS);
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(node.x, node.y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                });
            }

            for (let i = sparks.length - 1; i >= 0; i -= 1) {
                const spark = sparks[i];
                const progress = (now - spark.start) / spark.duration;
                if (progress >= 1) {
                    sparks.splice(i, 1);
                    continue;
                }
                const x = spark.from.x + (spark.to.x - spark.from.x) * progress;
                const y = spark.from.y + (spark.to.y - spark.from.y) * progress;
                ctx.beginPath();
                ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#38bdf8";
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            nodes.forEach((node) => {
                const proximity = mouse.active ? Math.max(0, 1 - distance(node, mouse) / REACTION_RADIUS) : 0;
                const radius = node.size + proximity * 2.4;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${0.36 + proximity * 0.6})`;
                if (proximity > 0) {
                    ctx.shadowBlur = 6 + proximity * 14;
                    ctx.shadowColor = "rgba(56, 189, 248, 0.85)";
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            if (!prefersReducedMotion) requestAnimationFrame(draw);
        }

        neuralStage.addEventListener("pointermove", (event) => {
            const bounds = neuralStage.getBoundingClientRect();
            mouse.x = event.clientX - bounds.left;
            mouse.y = event.clientY - bounds.top;
            mouse.active = true;
            addSparks(performance.now());
        }, { passive: true });
        neuralStage.addEventListener("pointerleave", () => { mouse.active = false; });
        window.addEventListener("resize", resizeCanvas, { passive: true });
        resizeCanvas();
        requestAnimationFrame(draw);
    }

    /* --------------------------------------------------
       4. Sticky navbar — toggle bg on scroll
    --------------------------------------------------- */
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    /* --------------------------------------------------
       4. Active navigation link (scrollspy)
    --------------------------------------------------- */
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = Array.from(navLinks).map((link) => {
        const href = link.getAttribute("href").slice(1);
        return document.getElementById(href);
    }).filter(Boolean);

    const scrollSpyObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
            const id = entry.target.id;
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                link.classList.toggle("active", entry.isIntersecting);
            }
        }),
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((sec) => scrollSpyObserver.observe(sec));

    /* --------------------------------------------------
       5. Cursor-follow glow in hero + laptop parallax
    --------------------------------------------------- */
    const hero = document.querySelector(".hero");
    const heroGlow = document.getElementById("heroGlow");
    const heroFloat = document.querySelector(".hero-laptop");
    if (heroGlow && hero) {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let rect = hero.getBoundingClientRect();
        let ticking = false;

        const move = (e) => {
            const r = hero.getBoundingClientRect();
            rect = r;
            targetX = e.clientX - r.left;
            targetY = e.clientY - r.top;
            heroGlow.style.opacity = "0.5";
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(tick);
            }
        };
        const tick = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            const dx = currentX - rect.width / 2;
            const dy = currentY - rect.height / 2;

            heroGlow.style.transform =
                `translate(${currentX}px, ${currentY}px) scale(0.9)`;

            heroFloat.style.transform =
                `rotateX(18deg) translate(${dx * 0.025}px, ${dy * 0.04}px)`;

            if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
                ticking = true;
                requestAnimationFrame(tick);
            } else {
                ticking = false;
            }
        };
        const hideGlow = () => {
            heroGlow.style.opacity = "0";
            heroFloat.style.transform = "";
        };
        hero.addEventListener("mousemove", move);
        hero.addEventListener("mouseleave", hideGlow);
    }

    /* --------------------------------------------------
       6. Mobile navigation toggle
    --------------------------------------------------- */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navList");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            navToggle.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("open")) {
                    navMenu.classList.remove("open");
                    navToggle.classList.remove("open");
                }
            });
        });
    }

    /* --------------------------------------------------
       7. Contact form (light client-side handling)
    --------------------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get("name") || "there";
            alert(`Hey there! 👋  — I don't have a backend wired up yet, but thanks for reaching out, ${name}. Drop me a line at parshav.khoche@example.com.`);
            contactForm.reset();
        });
    }

    /* --------------------------------------------------
       8. Resize handler
    --------------------------------------------------- */
    window.addEventListener("resize", () => {
        if (hero) {
            hero.getBoundingClientRect();
        }
    });
});
