document.addEventListener('DOMContentLoaded', () => {
    //menu celular
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open'); 
        });

        //fechar o menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    //seções e animação de scroll

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