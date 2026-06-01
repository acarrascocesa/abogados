/* ==========================================================================
   LÓGICA INTERACTIVA - LOGÍSTICA LEGAL
   Tecnología: JavaScript Vanilla (Moderno, Optimizado, Sin dependencias)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --------------------------------------------------------------------------
  // 1. CONTROL DE LA BARRA DE NAVEGACIÓN Y MENÚ MÓVIL
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const menuIconPath = document.getElementById('menu-icon-path');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cambiar estilo de navbar en Scroll
  const checkNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkNavbarScroll);
  checkNavbarScroll(); // Comprobación inicial

  // Toggle menú móvil
  btnMobileMenu.addEventListener('click', () => {
    const isExpanded = btnMobileMenu.getAttribute('aria-expanded') === 'true';
    btnMobileMenu.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');

    // Cambiar ícono de Hamburguesa a Cerrar (X) con SVG
    if (!isExpanded) {
      menuIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    } else {
      menuIconPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
    }
  });

  // Cerrar menú móvil al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remover active de todos los enlaces y añadir al actual
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        btnMobileMenu.setAttribute('aria-expanded', 'false');
        menuIconPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
      }
    });
  });





  // --------------------------------------------------------------------------
  // 3. ANIMACIONES DE ENTRADA AL SCROLL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Dejar de observar una vez animado
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => scrollObserver.observe(el));


  // --------------------------------------------------------------------------
  // 4. ANIMACIÓN DINÁMICA DE NÚMEROS (LOGROS)
  // --------------------------------------------------------------------------
  const achievementsSection = document.getElementById('logros');
  const numberElements = document.querySelectorAll('.achievement-number[data-target]');
  let animatedStats = false;

  const animateNumbers = () => {
    numberElements.forEach(elem => {
      const target = parseInt(elem.getAttribute('data-target'), 10);
      const isPercentage = elem.textContent.includes('%');
      const hasPlus = elem.textContent.includes('+');
      
      let count = 0;
      const duration = 1500; // 1.5s
      const steps = 60;
      const stepTime = duration / steps;
      const increment = Math.ceil(target / steps);

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        
        // Mantener formato original (+0 o 0%)
        if (isPercentage) {
          elem.textContent = `${count}%`;
        } else if (hasPlus) {
          elem.textContent = `+${count}`;
        } else {
          elem.textContent = count;
        }
      }, stepTime);
    });
  };

  // Observador específico para iniciar los contadores al entrar en pantalla
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        animateNumbers();
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  if (achievementsSection) {
    statsObserver.observe(achievementsSection);
  }


  // --------------------------------------------------------------------------
  // 5. VALIDACIÓN Y ENVÍO SIMULADO DEL FORMULARIO DE CONTACTO
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('legal-contact-form');
  const feedbackMsg = document.getElementById('feedback-message');
  const btnSubmit = document.getElementById('btn-form-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Ocultar cualquier mensaje previo
      feedbackMsg.className = 'form-feedback';
      feedbackMsg.textContent = '';

      // Obtener campos
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value.trim();

      // Validación simple
      if (!name || !phone || !email || !subject || !message) {
        feedbackMsg.textContent = 'Por favor, rellene todos los campos obligatorios.';
        feedbackMsg.classList.add('error');
        return;
      }

      // Desactivar botón y simular carga (UX Premium)
      btnSubmit.disabled = true;
      const originalBtnText = btnSubmit.textContent;
      btnSubmit.textContent = 'Procesando consulta...';

      // Simular llamada API de red
      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.textContent = originalBtnText;

        // Éxito simulado
        feedbackMsg.innerHTML = '<strong>¡Consulta Enviada con Éxito!</strong> Un estratega legal se comunicará con usted a la brevedad.';
        feedbackMsg.classList.add('success');
        
        // Resetear formulario
        contactForm.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          feedbackMsg.style.display = 'none';
        }, 5000);

      }, 1500);
    });
  }


  // --------------------------------------------------------------------------
  // 6. SISTEMA DE TRADUCCIÓN INTERACTIVO (ESPAÑOL / INGLÉS)
  // --------------------------------------------------------------------------
  const btnLanguage = document.getElementById('btn-language');
  let currentLang = 'ES';

  // Diccionario de textos bilingües
  const translations = {
    ES: {
      navFirma: 'La Firma',
      navNosotros: 'Nosotros',
      navServicios: 'Servicios',
      navLogros: 'Logros',
      navCasos: 'Casos de Éxito',
      navContacto: 'Contacto',
      navCta: 'Consulta Estratégica',
      heroTag: 'Ingeniería Jurídica',
      mainHeadline: 'Estrategas<span>Legales</span>',
      heroSubtext: 'Ofrecemos asistencia legal integral en negocios, planificación estratégica, manejo de contingencias y litigios en la República Dominicana.',
      heroCtaPrimary: 'Agenda una Consulta',
      heroCtaSecondary: 'Nuestra Firma',

      quoteWords: '"Nos enfocamos en identificar y comprender las necesidades de nuestros clientes para asistirlos en la consecución de sus objetivos. Utilizamos ingeniería jurídica para crear ventajas legales que impulsen su éxito".',
      quoteMeta: 'Manuel Alejandro Bordas Nina <br><span>Fundador & Director Estratégico</span>',
      aboutTag: 'Estudio Legal',
      aboutHeadline: 'Nuestro estudio <span>legal</span>',
      aboutH3: 'Estrategia enfocada en resultados corporativos.',
      aboutP1: 'Fundado por <strong>Manuel Alejandro Bordas Nina</strong>, <em>Logística Legal | Abogados Estratégicos</em> es una firma de abogados orientada a incorporar valor a los negocios y casos de sus clientes. Nos especializamos en el diseño de estructuras legales para negocios, la elaboración de esquemas contractuales y el manejo de litigios complejos.',
      aboutP2: 'Nuestra experiencia en el manejo de negocios y litigios nos permite enfocarnos en minimizar riesgos y contingencias a través del análisis económico de nuestras operaciones, estructuras y recomendaciones. Nuestro ejercicio profesional se extiende a todo el territorio de la República Dominicana.',
      aboutSectorsTitle: 'Sectores Clave de Ejercicio',
      aboutSectors: [
        'Inmobiliario y Construcción', 'Bancario y Financiero', 'Automotriz',
        'Medios y Entretenimiento', 'Turismo', 'Zonas Francas'
      ],
      firmInfoBoxTitle: 'Ventajas Competitivas',
      firmInfoBoxText: 'Asesoramos a clientes locales e internacionales en todas las industrias estratégicas de la economía dominicana.',
      specialties: [
        { h4: 'Previsión de Contingencias', p: 'Anticipación económica y legal de riesgos contractuales.' },
        { h4: 'Ingeniería Contractual', p: 'Diseño y optimización a la medida para impulsar el éxito comercial.' },
        { h4: 'Litigio Corporativo Complejo', p: 'Estrategia jurídica de alta intensidad en tribunales y arbitrajes.' }
      ],
      labelLogro1: 'Clientes Satisfechos',
      labelLogro2: 'Tasa de Éxito en Litigios',
      labelLogro3: 'Asesoría en Casos y Transacciones',
      servicesTag: 'Áreas de Práctica',
      servicesHeadline: 'Nuestras áreas de <span>especialización</span>',
      servicesSubtext: 'Diseñamos soluciones jurídicas sofisticadas adaptadas al análisis económico y estratégico que requiere tu negocio.',
      servs: [
        { title: 'Estructuras Legales para Negocios', desc: 'Estructuramos sociedades mercantiles, vehículos de inversión complejos, reorganizaciones corporativas complejas y esquemas fiscales que minimicen el impacto de los riesgos corporativos.', link: 'Consultar área' },
        { title: 'Diseño y Esquemas Contractuales', desc: 'Elaboración y negociación de contratos a la medida para operaciones inmobiliarias, de financiamiento, corporativas y de propiedad intelectual, asegurando blindaje contra contingencias comerciales.', link: 'Consultar área' },
        { title: 'Manejo de Litigios Complejos', desc: 'Asistencia y representación en procesos judiciales, civiles, comerciales y administrativos de alta complejidad, con un sólido enfoque estratégico orientado a defender tus intereses económicos.', link: 'Consultar área' }
      ],
      casesTag: 'Prueba Social',
      casesHeadline: 'Casos de éxito <span>destacados</span>',
      casesSubtext: 'Conoce cómo aplicamos la ingeniería jurídica y el análisis económico para proteger el patrimonio y consolidar el éxito de nuestros clientes.',
      caseBadges: ['Inmobiliario', 'Corporativo', 'Litigios'],
      casesList: [
        { title: 'Estructuración Contractual de Fideicomiso', desc: 'Ingeniería jurídica contractual para un desarrollo turístico residencial de gran escala en la costa este de la República Dominicana, minimizando riesgos fiscales y de tenencia de tierras.', label1: 'Transacción', label2: 'Resultado', val2: 'Exitoso' },
        { title: 'Reorganización de Vehículos de Negocio', desc: 'Rediseño estructural de un importante conglomerado automotriz nacional mediante un análisis económico profundo, garantizando una transferencia accionaria interna sin contingencias fiscales.', label1: 'Patrimonio', label2: 'Optimización', val2: '100% Blindado' },
        { title: 'Defensa en Litigio Civil Multimillonario', desc: 'Representación de una destacada entidad financiera frente a una demanda contractual abusiva. Estrategia enfocada en neutralizar contingencias económicas críticas y restablecer el equilibrio legal.', label1: 'Monto de Demanda', label2: 'Sentencia', val2: 'Absolución' }
      ],
      contactTag: 'Contacto Estratégico',
      contactHeadline: 'Inicie su consulta <span>legal</span>',
      contactSubtext: 'Contáctenos para estructurar una solución integral adaptada a sus objetivos comerciales y patrimoniales.',
      contactLabels: { tel: 'Teléfono', mail: 'Correo Electrónico', dir: 'Sede Principal' },
      socialHeadline: 'Nuestras Redes Profesionales',
      formHeading: 'Consulta Estratégica',
      formSubheading: 'Complete el formulario y un especialista de nuestra firma se pondrá en contacto en menos de 24 horas.',
      formLabels: { name: 'Nombre Completo', phone: 'Teléfono', email: 'Correo Electrónico', subject: 'Área de Interés', message: 'Detalles de su Caso', submit: 'Enviar Requerimiento' },
      formOptions: ['Seleccione un servicio...', 'Estructuras Legales para Negocios', 'Diseño y Esquemas Contractuales', 'Manejo de Litigios Complejos', 'Otros Asuntos Estratégicos'],
      footAboutTxt: 'Firma de abogados orientada a incorporar valor y mitigar contingencias comerciales mediante análisis económico e ingeniería jurídica.',
      footLblLinks: 'Navegación',
      footLblServs: 'Servicios',
      footLblMembers: 'Organizaciones',
      footCopyright: '&copy; 2026 Copyright MB Logística Legal I Abogados Estratégicos, S.R.L. Todos los derechos reservados.',
      footLinks: { priv: 'Política de Privacidad', term: 'Términos de Servicio' }
    },
    EN: {
      navFirma: 'The Firm',
      navNosotros: 'About',
      navServicios: 'Services',
      navLogros: 'Achievements',
      navCasos: 'Success Cases',
      navContacto: 'Contact',
      navCta: 'Strategic Consultation',
      heroTag: 'Legal Engineering',
      mainHeadline: 'Strategic<span>Lawyers</span>',
      heroSubtext: 'We offer comprehensive legal assistance in business, strategic planning, risk mitigation, and complex litigation in the Dominican Republic.',
      heroCtaPrimary: 'Schedule a Consultation',
      heroCtaSecondary: 'Our Firm',

      quoteWords: '"We focus on identifying and understanding our clients\' needs to assist them in achieving their goals. We use legal engineering to create advantages that drive their success."',
      quoteMeta: 'Manuel Alejandro Bordas Nina <br><span>Founder & Strategic Director</span>',
      aboutTag: 'Law Firm',
      aboutHeadline: 'Our law <span>practice</span>',
      aboutH3: 'Strategy focused on corporate results.',
      aboutP1: 'Founded by <strong>Manuel Alejandro Bordas Nina</strong>, <em>Logística Legal | Strategic Lawyers</em> is a law firm oriented towards incorporating value into their clients\' businesses and cases. We specialize in designing legal structures for businesses, drafting complex contractual schemes, and managing complex litigation.',
      aboutP2: 'Our experience in business management and litigation allows us to focus on minimizing risks and contingencies through economic analysis of our operations, structures, and recommendations. Our professional practice extends throughout the Dominican Republic.',
      aboutSectorsTitle: 'Key Practice Sectors',
      aboutSectors: [
        'Real Estate & Construction', 'Banking & Finance', 'Automotive',
        'Media & Entertainment', 'Tourism', 'Free Zones'
      ],
      firmInfoBoxTitle: 'Competitive Advantages',
      firmInfoBoxText: 'We advise local and international clients in all strategic industries of the Dominican economy.',
      specialties: [
        { h4: 'Contingency Prevention', p: 'Economic and legal anticipation of contractual risks.' },
        { h4: 'Contractual Engineering', p: 'Tailored design and optimization to drive commercial success.' },
        { h4: 'Complex Corporate Litigation', p: 'High-intensity legal strategy in courts and arbitrations.' }
      ],
      labelLogro1: 'Satisfied Clients',
      labelLogro2: 'Litigation Success Rate',
      labelLogro3: 'Case & Transaction Advisory',
      servicesTag: 'Practice Areas',
      servicesHeadline: 'Our fields of <span>expertise</span>',
      servicesSubtext: 'We design sophisticated legal solutions tailored to the economic and strategic analysis your business requires.',
      servs: [
        { title: 'Business Legal Structures', desc: 'We structure commercial companies, complex investment vehicles, complex corporate reorganizations, and tax schemes that minimize corporate risk impact.', link: 'Inquire Area' },
        { title: 'Contractual Design & Schemes', desc: 'Drafting and negotiating tailored contracts for real estate, financing, corporate, and intellectual property operations, ensuring protection against business contingencies.', link: 'Inquire Area' },
        { title: 'Complex Litigation Management', desc: 'Assistance and representation in highly complex judicial, civil, commercial, and administrative processes, with a solid strategic focus oriented to defend your economic interests.', link: 'Inquire Area' }
      ],
      casesTag: 'Social Proof',
      casesHeadline: 'Featured <span>success cases</span>',
      casesSubtext: 'Learn how we apply legal engineering and economic analysis to protect assets and consolidate our clients\' success.',
      caseBadges: ['Real Estate', 'Corporate', 'Litigation'],
      casesList: [
        { title: 'Trust Contractual Structuring', desc: 'Contractual legal engineering for a large-scale residential tourism development on the east coast of the Dominican Republic, minimizing tax and land tenure risks.', label1: 'Transaction', label2: 'Outcome', val2: 'Successful' },
        { title: 'Business Vehicle Reorganization', desc: 'Structural redesign of a major national automotive conglomerate through deep economic analysis, ensuring internal stock transfer free of tax contingencies.', label1: 'Assets', label2: 'Optimization', val2: '100% Protected' },
        { title: 'Defense in Multimillion Civil Litigation', desc: 'Representation of a leading financial entity facing an abusive contractual lawsuit. Strategy focused on neutralizing critical economic contingencies and restoring legal balance.', label1: 'Lawsuit Amount', label2: 'Judgment', val2: 'Acquittal' }
      ],
      contactTag: 'Strategic Contact',
      contactHeadline: 'Start your <span>legal inquiry</span>',
      contactSubtext: 'Contact us to structure a comprehensive solution tailored to your business and asset objectives.',
      contactLabels: { tel: 'Phone', mail: 'Email Address', dir: 'Headquarters' },
      socialHeadline: 'Our Professional Networks',
      formHeading: 'Strategic Consultation',
      formSubheading: 'Complete the form and one of our firm\'s specialists will contact you in less than 24 hours.',
      formLabels: { name: 'Full Name', phone: 'Phone Number', email: 'Email Address', subject: 'Area of Interest', message: 'Case Details', submit: 'Send Request' },
      formOptions: ['Select a service...', 'Business Legal Structures', 'Contractual Design & Schemes', 'Complex Litigation Management', 'Other Strategic Matters'],
      footAboutTxt: 'Law firm oriented to incorporate value and mitigate commercial contingencies through economic analysis and legal engineering.',
      footLblLinks: 'Navigation',
      footLblServs: 'Services',
      footLblMembers: 'Organizations',
      footCopyright: '&copy; 2026 Copyright MB Logística Legal I Strategic Lawyers, S.R.L. All rights reserved.',
      footLinks: { priv: 'Privacy Policy', term: 'Terms of Service' }
    }
  };

  // Función para traducir los elementos del DOM
  const translateDOM = (lang) => {
    const data = translations[lang];

    // Navbar
    document.getElementById('link-firma').textContent = data.navFirma;
    document.getElementById('link-nosotros').textContent = data.navNosotros;
    document.getElementById('link-servicios').textContent = data.navServicios;
    document.getElementById('link-logros').textContent = data.navLogros;
    document.getElementById('link-casos').textContent = data.navCasos;
    document.getElementById('link-contacto').textContent = data.navContacto;
    document.getElementById('nav-cta').textContent = data.navCta;

    // Hero
    document.getElementById('hero-tag').textContent = data.heroTag;
    document.getElementById('main-headline').innerHTML = data.mainHeadline;
    document.getElementById('hero-subtext').textContent = data.heroSubtext;
    document.getElementById('hero-cta-primary').innerHTML = `${data.heroCtaPrimary} <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
    document.getElementById('hero-cta-secondary').textContent = data.heroCtaSecondary;



    // Quote
    document.getElementById('quote-words').textContent = data.quoteWords;
    document.getElementById('signature-meta').innerHTML = data.quoteMeta;

    // About Nosotros
    document.getElementById('about-tag').textContent = data.aboutTag;
    document.getElementById('about-headline').innerHTML = data.aboutHeadline;
    document.querySelector('.about-content h3').textContent = data.aboutH3;
    
    // Para conservar etiquetas html fuertes y cursivas
    const aboutContentParagraphs = document.querySelectorAll('.about-content p');
    aboutContentParagraphs[0].innerHTML = data.aboutP1;
    aboutContentParagraphs[1].innerHTML = data.aboutP2;
    
    document.querySelector('.about-sectors-title').textContent = data.aboutSectorsTitle;
    const sectorTags = document.querySelectorAll('.sectors-list .sector-tag');
    data.aboutSectors.forEach((sect, idx) => {
      if (sectorTags[idx]) sectorTags[idx].textContent = sect;
    });

    // Caja Ventajas
    document.querySelector('.about-interactive-box .box-title').textContent = data.firmInfoBoxTitle;
    document.querySelector('.about-interactive-box .box-text').textContent = data.firmInfoBoxText;
    
    const specialtyItems = document.querySelectorAll('.specialty-item');
    data.specialties.forEach((spec, idx) => {
      if (specialtyItems[idx]) {
        specialtyItems[idx].querySelector('h4').textContent = spec.h4;
        specialtyItems[idx].querySelector('p').textContent = spec.p;
      }
    });

    // Logros
    document.getElementById('label-logro-1').textContent = data.labelLogro1;
    document.getElementById('label-logro-2').textContent = data.labelLogro2;
    document.getElementById('label-logro-3').textContent = data.labelLogro3;

    // Servicios
    document.getElementById('services-tag').textContent = data.servicesTag;
    document.getElementById('services-headline').innerHTML = data.servicesHeadline;
    document.getElementById('services-subtext').textContent = data.servicesSubtext;
    
    const serviceCards = document.querySelectorAll('.service-card');
    data.servs.forEach((serv, idx) => {
      if (serviceCards[idx]) {
        serviceCards[idx].querySelector('.service-title').textContent = serv.title;
        serviceCards[idx].querySelector('.service-text').textContent = serv.desc;
        serviceCards[idx].querySelector('.service-link').innerHTML = `${serv.link} <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
      }
    });

    // Casos
    document.getElementById('cases-tag').textContent = data.casesTag;
    document.getElementById('cases-headline').innerHTML = data.casesHeadline;
    document.getElementById('cases-subtext').textContent = data.casesSubtext;
    
    const caseCards = document.querySelectorAll('.case-card');
    data.casesList.forEach((c, idx) => {
      if (caseCards[idx]) {
        caseCards[idx].querySelector('.case-badge').textContent = data.caseBadges[idx];
        caseCards[idx].querySelector('.case-title').textContent = c.title;
        caseCards[idx].querySelector('.case-excerpt').textContent = c.desc;
        
        const statItems = caseCards[idx].querySelectorAll('.case-stat-item');
        statItems[0].querySelector('.case-stat-label').textContent = c.label1;
        statItems[1].querySelector('.case-stat-label').textContent = c.label2;
        statItems[1].querySelector('.case-stat-value').textContent = c.val2;
      }
    });

    // Contacto
    document.getElementById('contact-tag').textContent = data.contactTag;
    document.getElementById('contact-headline').innerHTML = data.contactHeadline;
    document.getElementById('contact-subtext').textContent = data.contactSubtext;
    
    document.getElementById('cont-lbl-tel').textContent = data.contactLabels.tel;
    document.getElementById('cont-lbl-mail').textContent = data.contactLabels.mail;
    document.getElementById('cont-lbl-dir').textContent = data.contactLabels.dir;
    document.getElementById('social-headline').textContent = data.socialHeadline;

    // Formulario
    document.getElementById('form-heading').textContent = data.formHeading;
    document.getElementById('form-description').textContent = data.formSubheading;
    
    document.getElementById('lbl-form-name').textContent = data.formLabels.name;
    document.getElementById('lbl-form-phone').textContent = data.formLabels.phone;
    document.getElementById('lbl-form-email').textContent = data.formLabels.email;
    document.getElementById('lbl-form-subj').textContent = data.formLabels.subject;
    document.getElementById('lbl-form-msg').textContent = data.formLabels.message;
    document.getElementById('btn-form-submit').textContent = data.formLabels.submit;
    
    // Select de opciones
    const selectOptions = document.querySelectorAll('#form-subject option');
    data.formOptions.forEach((opt, idx) => {
      if (selectOptions[idx]) selectOptions[idx].textContent = opt;
    });

    // Footer
    document.getElementById('foot-about-txt').textContent = data.footAboutTxt;
    document.getElementById('foot-lbl-links').textContent = data.footLblLinks;
    document.getElementById('foot-lbl-servs').textContent = data.footLblServs;
    document.getElementById('foot-lbl-members').textContent = data.footLblMembers;
    document.getElementById('foot-copyright').innerHTML = data.footCopyright;
    document.getElementById('foot-lnk-priv').textContent = data.footLinks.priv;
    document.getElementById('foot-lnk-term').textContent = data.footLinks.term;
  };

  // Manejador del botón de idioma
  btnLanguage.addEventListener('click', () => {
    if (currentLang === 'ES') {
      currentLang = 'EN';
      translateDOM('EN');
      btnLanguage.setAttribute('aria-label', 'Switch to Spanish');
      btnLanguage.querySelector('span').textContent = 'ES';
      // Bandera de España en translatepress para cambiar a español
      btnLanguage.querySelector('img').src = 'https://logisticalegal.com.do/wp-content/plugins/translatepress-multilingual/assets/images/flags/es_ES.png';
      btnLanguage.querySelector('img').alt = 'Español';
    } else {
      currentLang = 'ES';
      translateDOM('ES');
      btnLanguage.setAttribute('aria-label', 'Cambiar a Inglés');
      btnLanguage.querySelector('span').textContent = 'EN';
      // Bandera de US para cambiar a inglés
      btnLanguage.querySelector('img').src = 'https://logisticalegal.com.do/wp-content/plugins/translatepress-multilingual/assets/images/flags/en_US.png';
      btnLanguage.querySelector('img').alt = 'English US';
    }
  });

});
