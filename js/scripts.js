document.addEventListener('DOMContentLoaded', () => {
    // 1. Destaque do Menu Ativo (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0 
    };

    const navObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                //encontra o link correspondente e adiciona 'active'
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.nav-menu a[href="#${targetId}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    //animação do scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 //aciona quando 20% do elemento está visível
    };

    const scrollObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); //para de observar após a primeira exibição
            }
        });
    };

    const scrollObserver = new IntersectionObserver(scrollObserverCallback, scrollObserverOptions);
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
});