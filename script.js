
/* ============================================================
   VISIÓN 2035
   BLOQUE 08 — TEMA 01: EDUCACIÓN
   Archivo: js/script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ============================================================
       BLOQUE 08.1 — REFERENCIAS PRINCIPALES
       ============================================================ */

    const educationSection = document.querySelector('#tema-educacion');

    if (!educationSection) {
        return;
    }

    const educationElements = {
        section: educationSection,
        cards: educationSection.querySelectorAll(
            '.education2035-card, .education2035-proposal, .education2035-feature'
        ),
        comparisonItems: educationSection.querySelectorAll(
            '.education2035-comparison-item'
        ),
        pillars: educationSection.querySelectorAll(
            '.education2035-pillar'
        ),
        timelineItems: educationSection.querySelectorAll(
            '.education2035-timeline-item'
        ),
        stats: educationSection.querySelectorAll(
            '.education2035-stat'
        ),
        buttons: educationSection.querySelectorAll(
            '[data-education-action]'
        )
    };


    /* ============================================================
       BLOQUE 08.2 — ANIMACIÓN DE ENTRADA
       ============================================================ */

    const educationAnimatedElements = educationSection.querySelectorAll(
        '.education2035-reveal, ' +
        '.education2035-card, ' +
        '.education2035-pillar, ' +
        '.education2035-proposal, ' +
        '.education2035-feature, ' +
        '.education2035-comparison-item, ' +
        '.education2035-timeline-item'
    );

    educationAnimatedElements.forEach((element, index) => {
        element.style.setProperty(
            '--education-delay',
            `${Math.min(index * 70, 560)}ms`
        );
    });


    const educationRevealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        }
    );


    educationAnimatedElements.forEach(element => {
        educationRevealObserver.observe(element);
    });


    /* ============================================================
       BLOQUE 08.3 — CONTADOR DE ESTADÍSTICAS
       ============================================================ */

    const animateEducationCounter = element => {
        if (element.dataset.educationAnimated === 'true') {
            return;
        }

        const target = Number(element.dataset.educationValue);

        if (!Number.isFinite(target)) {
            return;
        }

        const suffix = element.dataset.educationSuffix || '';
        const duration = Number(element.dataset.educationDuration) || 1400;

        element.dataset.educationAnimated = 'true';

        const startTime = performance.now();

        const updateCounter = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            /*
             * Easing suave:
             * comienza rápido y desacelera al final.
             */
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(
                target * easedProgress
            );

            element.textContent = `${currentValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    };


    const educationStatsObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateEducationCounter(entry.target);
                educationStatsObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.7
        }
    );


    educationElements.stats.forEach(stat => {
        educationStatsObserver.observe(stat);
    });


    /* ============================================================
       BLOQUE 08.4 — EFECTO HOVER DE TARJETAS
       ============================================================ */

    educationElements.cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('education2035-active');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('education2035-active');
        });
    });


    /* ============================================================
       BLOQUE 08.5 — TILT SUAVE EN TARJETAS
       ============================================================ */

    const supportsHover = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    ).matches;


    if (supportsHover) {
        const tiltCards = educationSection.querySelectorAll(
            '.education2035-tilt'
        );

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', event => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 3;

                const rotateX =
                    ((centerY - y) / centerY) * 3;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }


    /* ============================================================
       BLOQUE 08.6 — INTERACCIÓN HOY / 2035
       ============================================================ */

    const comparisonContainer = educationSection.querySelector(
        '.education2035-comparison'
    );

    if (comparisonContainer) {
        const comparisonButtons =
            comparisonContainer.querySelectorAll(
                '[data-education-view]'
            );

        const comparisonPanels =
            comparisonContainer.querySelectorAll(
                '[data-education-panel]'
            );


        comparisonButtons.forEach(button => {
            button.addEventListener('click', () => {
                const requestedView =
                    button.dataset.educationView;

                if (!requestedView) {
                    return;
                }


                comparisonButtons.forEach(item => {
                    item.classList.toggle(
                        'active',
                        item === button
                    );

                    item.setAttribute(
                        'aria-selected',
                        item === button ? 'true' : 'false'
                    );
                });


                comparisonPanels.forEach(panel => {
                    const panelView =
                        panel.dataset.educationPanel;

                    const isActive =
                        panelView === requestedView;

                    panel.classList.toggle(
                        'active',
                        isActive
                    );

                    panel.hidden = !isActive;
                });
            });
        });
    }


    /* ============================================================
       BLOQUE 08.7 — PESTAÑAS PROBLEMA / SOLUCIÓN / DISEÑO / MENSAJE
       ============================================================ */

    const formulaContainer = educationSection.querySelector(
        '.education2035-formula'
    );

    if (formulaContainer) {
        const formulaButtons =
            formulaContainer.querySelectorAll(
                '[data-education-formula]'
            );

        const formulaPanels =
            formulaContainer.querySelectorAll(
                '[data-education-formula-panel]'
            );


        const activateFormula = formulaName => {
            formulaButtons.forEach(button => {
                const isActive =
                    button.dataset.educationFormula === formulaName;

                button.classList.toggle(
                    'active',
                    isActive
                );

                button.setAttribute(
                    'aria-selected',
                    isActive ? 'true' : 'false'
                );
            });


            formulaPanels.forEach(panel => {
                const isActive =
                    panel.dataset.educationFormulaPanel === formulaName;

                panel.classList.toggle(
                    'active',
                    isActive
                );

                panel.hidden = !isActive;
            });
        };


        formulaButtons.forEach(button => {
            button.addEventListener('click', () => {
                activateFormula(
                    button.dataset.educationFormula
                );
            });
        });


        const initialFormula =
            formulaContainer.querySelector(
                '[data-education-formula].active'
            );

        if (initialFormula) {
            activateFormula(
                initialFormula.dataset.educationFormula
            );
        }
    }


    /* ============================================================
       BLOQUE 08.8 — LÍNEA DE TIEMPO
       ============================================================ */

    const timeline = educationSection.querySelector(
        '.education2035-timeline'
    );

    if (timeline) {
        const timelineItems =
            timeline.querySelectorAll(
                '.education2035-timeline-item'
            );

        const timelineObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            'education2035-timeline-visible'
                        );
                    }
                });
            },
            {
                threshold: 0.25
            }
        );


        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }


    /* ============================================================
       BLOQUE 08.9 — BARRAS DE PROGRESO
       ============================================================ */

    const progressBars =
        educationSection.querySelectorAll(
            '.education2035-progress-bar'
        );


    const animateProgressBar = bar => {
        if (bar.dataset.educationAnimated === 'true') {
            return;
        }

        const value =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(bar.dataset.educationProgress) || 0
                )
            );

        bar.dataset.educationAnimated = 'true';

        /*
         * Se utiliza requestAnimationFrame para evitar
         * que la barra aparezca instantáneamente.
         */
        requestAnimationFrame(() => {
            bar.style.width = `${value}%`;
        });
    };


    const progressObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.5
        }
    );


    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });


    /* ============================================================
       BLOQUE 08.10 — INDICADOR DE RECORRIDO
       ============================================================ */

    const educationProgress =
        educationSection.querySelector(
            '.education2035-section-progress'
        );

    if (educationProgress) {
        const progressFill =
            educationProgress.querySelector(
                '.education2035-section-progress-fill'
            );


        if (progressFill) {
            const updateEducationProgress = () => {
                const rect =
                    educationSection.getBoundingClientRect();

                const viewportHeight =
                    window.innerHeight;

                const sectionHeight =
                    educationSection.offsetHeight;

                const start =
                    viewportHeight * 0.85;

                const distance =
                    sectionHeight - viewportHeight * 0.2;

                const passed =
                    start - rect.top;

                let percentage =
                    (passed / distance) * 100;

                percentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            percentage
                        )
                    );

                progressFill.style.width =
                    `${percentage}%`;
            };


            let progressTicking = false;


            const onEducationProgressScroll = () => {
                if (progressTicking) {
                    return;
                }

                progressTicking = true;

                requestAnimationFrame(() => {
                    updateEducationProgress();
                    progressTicking = false;
                });
            };


            window.addEventListener(
                'scroll',
                onEducationProgressScroll,
                { passive: true }
            );

            window.addEventListener(
                'resize',
                updateEducationProgress
            );

            updateEducationProgress();
        }
    }


    /* ============================================================
       BLOQUE 08.11 — BOTONES DE NAVEGACIÓN
       ============================================================ */

    const smoothEducationScroll = selector => {
        const target =
            document.querySelector(selector);

        if (!target) {
            return;
        }

        const header =
            document.querySelector('.site-header');

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            18;


        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };


    educationElements.buttons.forEach(button => {
        button.addEventListener('click', event => {
            const action =
                button.dataset.educationAction;

            if (!action) {
                return;
            }


            if (
                action.startsWith('#')
            ) {
                event.preventDefault();
                smoothEducationScroll(action);
            }
        });
    });


    /* ============================================================
       BLOQUE 08.12 — BOTÓN "VOLVER A TEMAS"
       ============================================================ */

    const backToThemes =
        educationSection.querySelector(
            '[data-back-to-themes]'
        );


    if (backToThemes) {
        backToThemes.addEventListener(
            'click',
            event => {
                event.preventDefault();

                smoothEducationScroll('#temas');
            }
        );
    }


    /* ============================================================
       BLOQUE 08.13 — NAVEGACIÓN HACIA MULTIMEDIA
       ============================================================ */

    const multimediaButtons =
        educationSection.querySelectorAll(
            '[data-education-multimedia]'
        );


    multimediaButtons.forEach(button => {
        button.addEventListener(
            'click',
            event => {
                const target =
                    button.dataset.educationMultimedia;

                if (!target) {
                    return;
                }

                event.preventDefault();

                smoothEducationScroll(target);
            }
        );
    });


    /* ============================================================
       BLOQUE 08.14 — EFECTO DE ESCRITURA
       ============================================================ */

    const typingElements =
        educationSection.querySelectorAll(
            '[data-education-typing]'
        );


    typingElements.forEach(element => {
        const originalText =
            element.textContent.trim();

        if (!originalText) {
            return;
        }

        element.textContent = '';
        element.classList.add(
            'education2035-typing'
        );


        let started = false;


        const typingObserver =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (
                            !entry.isIntersecting ||
                            started
                        ) {
                            return;
                        }

                        started = true;

                        let index = 0;

                        const speed =
                            Number(
                                element.dataset.educationTypingSpeed
                            ) || 35;


                        const typeNextCharacter = () => {
                            if (
                                index >=
                                originalText.length
                            ) {
                                element.classList.add(
                                    'education2035-typing-complete'
                                );

                                return;
                            }


                            element.textContent +=
                                originalText.charAt(index);

                            index++;

                            setTimeout(
                                typeNextCharacter,
                                speed
                            );
                        };


                        typeNextCharacter();

                        typingObserver.unobserve(
                            element
                        );
                    });
                },
                {
                    threshold: 0.8
                }
            );


        typingObserver.observe(element);
    });


    /* ============================================================
       BLOQUE 08.15 — DESTACAR TARJETA ACTIVA
       ============================================================ */

    const interactiveCards =
        educationSection.querySelectorAll(
            '[data-education-card]'
        );


    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            interactiveCards.forEach(item => {
                item.classList.remove(
                    'education2035-selected'
                );
            });

            card.classList.add(
                'education2035-selected'
            );
        });
    });


    /* ============================================================
       BLOQUE 08.16 — NÚCLEO FUTURISTA
       ============================================================ */

    const futureCore =
        educationSection.querySelector(
            '.education2035-future-core'
        );


    if (
        futureCore &&
        supportsHover
    ) {
        futureCore.addEventListener(
            'mousemove',
            event => {
                const rect =
                    futureCore.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const moveX =
                    (x - 0.5) * 14;

                const moveY =
                    (y - 0.5) * 14;


                futureCore.style.setProperty(
                    '--core-x',
                    `${moveX}px`
                );

                futureCore.style.setProperty(
                    '--core-y',
                    `${moveY}px`
                );
            }
        );


        futureCore.addEventListener(
            'mouseleave',
            () => {
                futureCore.style.setProperty(
                    '--core-x',
                    '0px'
                );

                futureCore.style.setProperty(
                    '--core-y',
                    '0px'
                );
            }
        );
    }


    /* ============================================================
       BLOQUE 08.17 — PARTICULAS / PUNTOS DE DATOS
       ============================================================ */

    const dataNodes =
        educationSection.querySelectorAll(
            '.education2035-data-node'
        );


    dataNodes.forEach((node, index) => {
        const delay =
            Number(
                node.dataset.educationDelay
            ) ||
            (index * 180);


        node.style.animationDelay =
            `${delay}ms`;
    });


    /* ============================================================
       BLOQUE 08.18 — HOVER EN PILARES
       ============================================================ */

    educationElements.pillars.forEach(pillar => {
        pillar.addEventListener(
            'mouseenter',
            () => {
                educationElements.pillars.forEach(
                    otherPillar => {
                        if (
                            otherPillar !== pillar
                        ) {
                            otherPillar.classList.add(
                                'education2035-dimmed'
                            );
                        }
                    }
                );
            }
        );


        pillar.addEventListener(
            'mouseleave',
            () => {
                educationElements.pillars.forEach(
                    otherPillar => {
                        otherPillar.classList.remove(
                            'education2035-dimmed'
                        );
                    }
                );
            }
        );
    });


    /* ============================================================
       BLOQUE 08.19 — RELOJ / AÑO FUTURO
       ============================================================ */

    const futureYear =
        educationSection.querySelector(
            '[data-education-year]'
        );


    if (futureYear) {
        const targetYear =
            Number(
                futureYear.dataset.educationYear
            ) || 2035;


        const currentYear =
            new Date().getFullYear();


        const yearsRemaining =
            Math.max(
                0,
                targetYear - currentYear
            );


        futureYear.textContent =
            targetYear;


        const remainingElement =
            educationSection.querySelector(
                '[data-education-years]'
            );


        if (remainingElement) {
            remainingElement.textContent =
                yearsRemaining;
        }
    }


    /* ============================================================
       BLOQUE 08.20 — ACCESIBILIDAD: TECLADO
       ============================================================ */

    const keyboardCards =
        educationSection.querySelectorAll(
            '[data-education-keyboard]'
        );


    keyboardCards.forEach(card => {
        if (
            !card.hasAttribute('tabindex')
        ) {
            card.setAttribute(
                'tabindex',
                '0'
            );
        }


        card.addEventListener(
            'keydown',
            event => {
                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {
                    event.preventDefault();
                    card.click();
                }
            }
        );
    });


    /* ============================================================
       BLOQUE 08.21 — REDUCED MOTION
       ============================================================ */

    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


    if (prefersReducedMotion) {
        educationSection.classList.add(
            'education2035-reduced-motion'
        );

        educationAnimatedElements.forEach(
            element => {
                element.classList.add(
                    'is-visible'
                );
            }
        );

        progressBars.forEach(bar => {
            const value =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(
                            bar.dataset.educationProgress
                        ) || 0
                    )
                );

            bar.style.width =
                `${value}%`;
        });
    }


    /* ============================================================
       BLOQUE 08.22 — DETECCIÓN DE SECCIÓN ACTIVA
       ============================================================ */

    const sectionIndicator =
        educationSection.querySelector(
            '[data-education-section-status]'
        );


    if (sectionIndicator) {
        const statusObserver =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        sectionIndicator.classList.toggle(
                            'active',
                            entry.isIntersecting
                        );
                    });
                },
                {
                    threshold: 0.15
                }
            );


        statusObserver.observe(
            educationSection
        );
    }


    /* ============================================================
       BLOQUE 08.23 — EFECTO PARALLAX
       ============================================================ */

    const parallaxElements =
        educationSection.querySelectorAll(
            '[data-education-parallax]'
        );


    if (
        parallaxElements.length > 0 &&
        supportsHover &&
        !prefersReducedMotion
    ) {
        let parallaxTicking = false;


        const updateEducationParallax = () => {
            const sectionRect =
                educationSection.getBoundingClientRect();

            const viewportCenter =
                window.innerHeight / 2;

            const sectionCenter =
                sectionRect.top +
                sectionRect.height / 2;

            const offset =
                (sectionCenter - viewportCenter) /
                window.innerHeight;


            parallaxElements.forEach(element => {
                const strength =
                    Number(
                        element.dataset.educationParallax
                    ) || 10;

                const translate =
                    offset * strength;

                element.style.transform =
                    `translate3d(0, ${translate}px, 0)`;
            });


            parallaxTicking = false;
        };


        const onParallaxScroll = () => {
            if (parallaxTicking) {
                return;
            }

            parallaxTicking = true;

            requestAnimationFrame(
                updateEducationParallax
            );
        };


        window.addEventListener(
            'scroll',
            onParallaxScroll,
            { passive: true }
        );


        updateEducationParallax();
    }


    /* ============================================================
       BLOQUE 08.24 — LIMPIEZA AL CAMBIAR DE PESTAÑA
       ============================================================ */

    document.addEventListener(
        'visibilitychange',
        () => {
            if (
                document.hidden
            ) {
                educationSection.classList.add(
                    'education2035-page-hidden'
                );
            } else {
                educationSection.classList.remove(
                    'education2035-page-hidden'
                );
            }
        }
    );


    /* ============================================================
       BLOQUE 08.25 — REGISTRO EN CONSOLA
       ============================================================ */

    console.info(
        'VISIÓN 2035 · Bloque 08 — Educación cargado correctamente.'
    );
});


// =========================================================
// LÓGICA PARA ABRIR Y CERRAR EL MENÚ EN CELULARES
// =========================================================
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        // Al hacer clic en el botón de hamburguesa
        menuToggle.addEventListener("click", function() {
            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("active");
            
            // Actualizar el atributo de accesibilidad
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
        });

        // Cerrar el menú automáticamente al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
