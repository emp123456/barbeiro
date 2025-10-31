// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let isScrolled = false;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50 && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollY <= 50 && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('#booking-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.phone || !data.business || !data.email || !data.plan) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Show success message
            showToast('Solicitação Enviada! 🚀', 'Nossa equipe entrará em contato em breve para apresentar a solução ideal.');
            
            // Reset form
            this.reset();
        });
    }

    // Toast notification function
    function showToast(title, description) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 1rem;
            box-shadow: var(--shadow-strong);
            z-index: 1000;
            animation: slide-in-right 0.3s ease-out;
            max-width: 300px;
        `;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slide-in-right 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe elements with animations
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Phone number formatting
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            e.target.value = value;
        });
    }

    // Email validation
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                this.focus();
            }
        });
    }

    // Customization functionality (for personalizar.html page)
    const customizationForm = document.querySelector('#customization-form');

    // Add Service functionality
    const addServiceBtn = document.querySelector('#add-service');
    const servicesContainer = document.querySelector('#services-container');

    if (addServiceBtn && servicesContainer) {
        addServiceBtn.addEventListener('click', function() {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg';
            serviceItem.innerHTML = `
                <input type="text" name="service_name[]" class="form-input" placeholder="Nome do serviço">
                <input type="number" name="service_price[]" class="form-input" placeholder="Preço (R$)" step="0.01">
                <input type="number" name="service_duration[]" class="form-input" placeholder="Duração (min)">
                <div class="flex gap-2">
                    <input type="text" name="service_notes[]" class="form-input" placeholder="Observações">
                    <button type="button" class="remove-service btn btn-outline text-red-500">×</button>
                </div>
            `;
            servicesContainer.appendChild(serviceItem);

            // Add remove functionality
            const removeBtn = serviceItem.querySelector('.remove-service');
            removeBtn.addEventListener('click', function() {
                serviceItem.remove();
            });
        });
    }

    // Add Barber functionality
    const addBarberBtn = document.querySelector('#add-barber');
    const teamContainer = document.querySelector('#team-container');

    if (addBarberBtn && teamContainer) {
        addBarberBtn.addEventListener('click', function() {
            const teamMember = document.createElement('div');
            teamMember.className = 'team-member grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg';
            teamMember.innerHTML = `
                <input type="text" name="barber_name[]" class="form-input" placeholder="Nome do barbeiro">
                <input type="text" name="barber_specialty[]" class="form-input" placeholder="Especialidade">
                <div class="flex gap-2">
                    <input type="file" name="barber_photo[]" accept="image/*" class="form-input">
                    <button type="button" class="remove-barber btn btn-outline text-red-500">×</button>
                </div>
            `;
            teamContainer.appendChild(teamMember);

            // Add remove functionality
            const removeBtn = teamMember.querySelector('.remove-barber');
            removeBtn.addEventListener('click', function() {
                teamMember.remove();
            });
        });
    }

    // Save Customization
    const saveCustomizationBtn = document.querySelector('#save-customization');

    if (saveCustomizationBtn && customizationForm) {
        saveCustomizationBtn.addEventListener('click', function() {
            const formData = new FormData(customizationForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.barbershop_name || !data.address || !data.phone || !data.email) {
                alert('Por favor, preencha pelo menos as informações básicas da barbearia.');
                return;
            }

            // Show success message
            showToast('Personalização Salva! 🎨', 'Suas preferências foram salvas. Nossa equipe usará essas informações para criar sua solução personalizada.');
            
            // Reset form
            customizationForm.reset();
        });
    }

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--gradient-gold);
        color: var(--background);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-gold);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
    });

    // Preload critical images
    const criticalImages = [
        'assets/img/hero-barber.jpg',
        'assets/img/about-interior.jpg',
        'assets/img/service-haircut.jpg',
        'assets/img/service-beard.jpg',
        'assets/img/service-shave.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
