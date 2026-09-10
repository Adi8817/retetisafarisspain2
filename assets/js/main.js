/* =============================================================
   Reteti Adventure Safaris — Main JavaScript
   -------------------------------------------------------------
   Handles: mobile menu, itinerary accordion, FAQ accordion,
   language switcher, scroll animations, back-to-top, and the
   contact form interaction.

   No HTML is generated dynamically. All visible content lives
   in index.html; this file only enhances existing markup.
   ============================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initItineraryAccordion();
    initFaqAccordion();
    initHeroSlider();
    initFeaturedGallery();
    initGalleryViewMore();
    initTestimonialCarousel();
    initScrollAnimations();
    initHeaderScroll();
    initBackToTop();
    initContactForm();
    initLanguageSwitcher();
    var savedLang = null;
    try { savedLang = localStorage.getItem("reteti-lang"); } catch (e) {}
    if (savedLang === "es") setLanguage("es");
  });

  /* ---------------------------------------------------------
     1. Mobile Menu
     --------------------------------------------------------- */
  function initMobileMenu() {
    var hamburger = document.getElementById("hamburger");
    var mobileNav = document.getElementById("mobile-nav");
    var closeNav = document.getElementById("close-nav");
    if (!hamburger || !mobileNav) return;

    var openMenu = function () {
      mobileNav.classList.add("open");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    
    var closeMenu = function () {
      mobileNav.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    var toggleMenu = function (e) {
      if (e) e.stopPropagation();
      if (mobileNav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    hamburger.addEventListener("click", toggleMenu);
    if (closeNav) closeNav.addEventListener("click", closeMenu);

    // Close when a mobile link is tapped
    mobileNav.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close when tapping outside the menu panel
    document.addEventListener("click", function (e) {
      if (!mobileNav.classList.contains("open")) return;
      if (mobileNav.contains(e.target) || e.target === hamburger || hamburger.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------
     2. Itinerary Accordion
     --------------------------------------------------------- */
  function initItineraryAccordion() {
    var headers = document.querySelectorAll(".itin-header");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var body = header.nextElementSibling;
        var isActive = header.classList.contains("active");
        header.classList.toggle("active", !isActive);
        if (body) body.classList.toggle("open", !isActive);
      });
    });
  }

  /* ---------------------------------------------------------
     3. FAQ Accordion
     --------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      if (!question) return;
      question.addEventListener("click", function () {
        var isActive = item.classList.contains("active");
        // Close all others for a single-open accordion
        items.forEach(function (other) {
          other.classList.remove("active");
        });
        item.classList.toggle("active", !isActive);
      });
    });
  }

  /* ---------------------------------------------------------
     4. Language Switcher (multilingual scaffold)
     -------------------------------------------------------------
     English is the source content already present in the HTML.
     Spanish (and any future language) can be filled into the
     TRANSLATIONS object below. Missing keys fall back to the
     original English text captured on first load.
     --------------------------------------------------------- */
  var TRANSLATIONS = {
    en: {}, // populated from the DOM on load
    es: {
    "nav.about": "Sobre Nosotros",
    "nav.kilimanjaro": "Kilimanjaro",
    "nav.packages": "Safaris",
    "nav.destinations": "Destinos",
    "nav.reviews": "Opiniones",
    "nav.faq": "Preguntas",
    "nav.cta": "Solicitar Presupuesto Gratis",
    "trust.1": "Precios Claros desde el Primer Día",
    "trust.2": "Comunicación Directa por WhatsApp",
    "trust.3": "Un Equipo Local, de Principio a Fin",
    "trust.4": "Asistencia desde el Aeropuerto hasta el Safari",
    "trust.5": "Tu Viaje, No una Plantilla",
    "trust.srtitle": "Por qué los viajeros de España eligen Reteti",
    "about.eyebrow": "Sobre Nosotros",
    "about.subhead": "Descubre África con un operador de safaris local que conoce Kenia y Tanzania de primera mano.",
    "about.p1": "Planificar tu primer safari africano desde España debería ser emocionante, no complicado. En Reteti Adventure Safaris, lo hacemos personal desde la primera conversación.",
    "__html__about.title": "Tu <span class=\"highlight\">Safari en Kenia y Tanzania</span>, Diseñado para Viajeros desde España",
    "__html__about.p2": "Somos un <strong>operador de safaris local de Kenia y Tanzania</strong>, creando viajes cuidadosamente planificados para viajeros de España que quieren vivir África más allá de un paquete turístico estándar. Desde la legendaria <strong>Maasai Mara y el Serengeti</strong> hasta el <strong>cráter del Ngorongoro, Amboseli, el Kilimanjaro y Zanzíbar</strong>, te ayudamos a elegir los destinos y experiencias que realmente encajan con la forma en que quieres viajar.",
    "__html__about.p3": "Ya sea que estés planeando una <strong>luna de miel romántica, tu primer safari, una aventura en familia, un viaje privado con amigos o una experiencia inolvidable de la Gran Migración</strong>, tu itinerario se construye alrededor de tus fechas, intereses, ritmo de viaje y presupuesto.",
    "form.kicker": "Presupuesto Personalizado Gratis",
    "form.h3": "Empieza a Planificar Tu Aventura Africana",
    "form.subhead": "Cuéntanos con qué sueñas y crearemos un safari personalizado en Kenia o Tanzania según tus fechas, intereses y presupuesto.",
    "f.name": "Nombre Completo *",
    "f.mobile": "Número de Móvil *",
    "f.email": "Correo Electrónico *",
    "f.city": "Tu Ciudad *",
    "f.destination": "Destino *",
    "f.month": "Fecha de Viaje",
    "f.travellers": "Nº de Viajeros *",
    "f.budget": "Presupuesto / Persona",
    "f.requirements": "Requisitos Especiales",
    "__ph__fp.name": "Nombre Completo *",
    "__ph__fp.mobile": "Número de Móvil *",
    "__ph__fp.email": "Correo Electrónico *",
    "__ph__fp.requirements": "Requisitos Especiales",
    "fo.city": "Tu Ciudad *",
    "fo.dest": "Elige un destino...",
    "fo.month": "Aún no decidido",
    "fo.travellers": "¿Cuántos?",
    "fo.tr1": "Solo/a",
    "fo.tr2": "Pareja",
    "fo.tr3": "3 a 5 Personas",
    "fo.tr4": "5 a 10 Personas",
    "fo.tr5": "10 o más",
    "fo.budget": "Selecciona un rango...",
    "btn.submit": "Crear Mi Plan de Safari Gratis",
    "form.note": "🔒 Sin compromiso · Itinerario personalizado · Tu información permanece privada",
    "success.title": "¡Consulta enviada con éxito!",
    "success.desc": "Gracias por contactar con Reteti Adventure Safaris. Nuestro equipo te responderá en un plazo de 24 horas con un itinerario personalizado y un presupuesto sin compromiso.",
    "btn.wa": "Confirmar por WhatsApp",
    "about.badge1.t": "De España a África, de Forma Sencilla",
    "about.badge1.d": "Acompañamiento personal desde tu primera consulta hasta tu regreso a casa, con una planificación clara y apoyo durante todo tu safari.",
    "about.badge2.t": "Tu Safari. Tu Ritmo. Tu Manera.",
    "about.badge2.d": "Itinerarios privados y personalizados diseñados según tus fechas, intereses, presupuesto y las experiencias que más te importan.",
    "about.badge3.t": "Expertos Locales. Experiencia Africana Real.",
    "about.badge3.d": "Viaja con guías experimentados de Kenia y Tanzania que conocen la fauna, los paisajes y las rutas a fondo.",
    "pkg.eyebrow": "LOS MEJORES SAFARIS DE KENIA PARA VIAJEROS ESPAÑOLES",
    "__html__pkg.title": "Nuestros Safaris de <span class=\"highlight\">Kenia y Tanzania</span> Más Populares",
    "pkg.lead": "Elige un itinerario para inspirarte y luego hazlo tuyo. Cada safari se puede ajustar según tus fechas de viaje, intereses, tamaño del grupo y nivel de confort preferido.",
    "why.eyebrow": "POR QUÉ LOS VIAJEROS ESPAÑOLES ELIGEN ÁFRICA ORIENTAL",
    "__html__why.title": "¿Por qué <span class=\"highlight\">Kenia y Tanzania</span>?",
    "why.lead": "Kenia y Tanzania ofrecen una combinación extraordinaria de fauna salvaje, paisajes, cultura y aventura, todo en un viaje inolvidable. Desde presenciar la Gran Migración en las inmensas llanuras del Serengeti y la Maasai Mara hasta descubrir la belleza del Ngorongoro y Amboseli, cada día trae una nueva experiencia. Conoce a las comunidades locales, explora paisajes sobrecogedores y vive la África más autentica, con momentos inolvidables en cada rincón.",
    "why.c1.t": "Observa a los Cinco Grandes de África en Libertad",
    "why.c1.d": "Contempla leones, elefantes, leopardos, rinocerontes y búfalos en su hábitat natural, no detrás de una valla ni en un zoológico.",
    "why.c2.t": "Presencia la Gran Migración",
    "why.c2.d": "Observa a millones de ñus y otros animales desplazarse por el Serengeti y la Maasai Mara en uno de los mayores espectáculos de la naturaleza.",
    "why.c3.t": "Safari y Zanzíbar en un Solo Viaje",
    "why.c3.d": "Combina aventuras inolvidables de fauna salvaje con playas de arena blanca, aguas turquesas y la cultura única de Zanzíbar.",
    "why.c4.t": "La Escapada Perfecta en Pareja",
    "why.c4.d": "Desde game drives privados hasta lodges románticos y atardeceres inolvidables, crea un safari pensado para dos.",
    "why.c5.t": "Una Aventura para Toda la Familia",
    "why.c5.d": "Descubre África en familia a través de la fauna salvaje, la naturaleza y experiencias inolvidables diseñadas según la edad de tus hijos y vuestro ritmo de viaje.",
    "why.c6.t": "África, un Paraíso para la Fotografía",
    "why.c6.d": "Captura elefantes a los pies del Kilimanjaro, leones en la sabana y momentos inolvidables de fauna salvaje en el Serengeti y la Maasai Mara.",
    "why.c7.t": "Dos Países. Un Safari Extraordinario.",
    "why.c7.d": "Explora lo mejor de Kenia y Tanzania en un viaje cuidadosamente planificado, desde la Maasai Mara y Amboseli hasta el Serengeti y el Ngorongoro.",
    "why.c8.t": "Planifica desde España. Viaja con Confianza.",
    "why.c8.d": "Trabaja directamente con nuestro equipo local de safaris para diseñar tu itinerario, conocer tus opciones y prepararte para tu viaje a África Oriental.",
    "dest.eyebrow": "DESTINOS PRINCIPALES",
    "__html__dest.title": "Descubre los Destinos de Safari Más Emblemáticos de <span class=\"highlight\">Kenia y Tanzania</span>",
    "dest.lead": "Desde la legendaria Maasai Mara y el Serengeti hasta el cráter del Ngorongoro y Zanzíbar, descubre los destinos que hacen inolvidable un safari por Kenia y Tanzania.",
    "dest.kenya.h": "Destinos de Safari en Kenia",
    "dest.tanzania.h": "Destinos de Safari en Tanzania",
    "dest.opt.kenya": "Kenia",
    "dest.opt.tanzania": "Tanzania",
    "dest.opt.both": "Kenia y Tanzania",
    "d1.name": "Reserva Nacional de Maasai Mara",
    "d1.sub": "El Destino de Safari Más Famoso de Kenia",
    "d2.name": "Parque Nacional de Amboseli",
    "d2.sub": "Elefantes y Vistas al Kilimanjaro",
    "d3.name": "Parque Nacional del Lago Nakuru",
    "d3.sub": "Rinocerontes, Flamencos y Paisajes del Valle del Rift",
    "d4.name": "Parque Nacional de Nairobi",
    "d4.sub": "Fauna Salvaje a las Puertas de la Ciudad",
    "d5.name": "Parques Nacionales de Tsavo",
    "d5.sub": "La Frontera Salvaje e Indómita de Kenia",
    "d6.name": "Playa de Diani",
    "d6.sub": "El Safari se Encuentra con el Océano Índico",
    "d7.name": "Parque Nacional del Serengeti",
    "d7.sub": "El Hogar Legendario de la Gran Migración",
    "d8.name": "Cráter del Ngorongoro",
    "d8.sub": "El País de las Maravillas de la Fauna Africana",
    "d9.name": "Parque Nacional de Tarangire",
    "d9.sub": "Gigantes, Baobabs y Fauna Escondida",
    "d10.name": "Monte Kilimanjaro",
    "d10.sub": "La Montaña Más Alta de África",
    "d11.name": "Zanzíbar",
    "d11.sub": "Safari, Especias y Playas del Océano Índico",
    "d12.name": "Parque Nacional del Lago Manyara",
    "d12.sub": "Leones Trepadores y la Belleza del Valle del Rift",
    "itin.eyebrow": "Itinerario de Ejemplo",
    "__html__itin.title": "<span class=\"highlight\">Kenia y Tanzania</span> – 10 Días Paso a Paso",
    "itin.lead": "Un vistazo detallado a nuestra ruta de safari más popular. Todos los itinerarios son totalmente personalizables según tus fechas y preferencias.",
    "day.1": "Día 1",
    "day.1.title": "Llegada a Nairobi y Bienvenida",
    "day.1.body": "Llegada al Aeropuerto Internacional Jomo Kenyatta. Nuestro guía-conductor te recibe y te traslada a tu hotel en Nairobi. Briefing del safari, cena y alojamiento en Nairobi.",
    "day.2": "Día 2",
    "day.2.title": "Nairobi → Lago Nakuru",
    "day.2.body": "Viaje en coche hasta el Parque Nacional del Lago Nakuru (4-5 h). Comida, registro en el alojamiento y game drive por la tarde. Lo más destacado:",
    "day.2.b1": "Flamencos y pelícanos en el lago",
    "day.2.b2": "Rinocerontes blancos y negros",
    "day.2.b3": "Leones trepadores (con suerte)",
    "day.3": "Día 3",
    "day.3.title": "Lago Nakuru → Reserva de Masai Mara",
    "day.3.body": "Game drive matutino en Nakuru y traslado a la Masai Mara (6 h). Game drive por la tarde a la llegada. Cena y alojamiento en lodge o campamento.",
    "day.45": "Días 4-5",
    "day.45.title": "Safari de Día Completo en la Masai Mara",
    "day.45.body": "Dos días completos explorando la Mara. Safari opcional en globo aerostático al amanecer. Picnic a orillas del río Mara.",
    "day.45.b1": "Los Cinco Grandes: leones, elefantes, búfalos, leopardos y rinocerontes",
    "day.45.b2": "Gran Migración (jul.-oct.)",
    "day.45.b3": "Visita opcional a un poblado masái",
    "day.6": "Día 6",
    "day.6.title": "Mara → Serengeti, Tanzania",
    "day.6.body": "Cruce de la frontera en Isibania hacia Tanzania. Nuestro equipo tanzano se hace cargo y te acompaña hasta el Serengeti Central. Comida en ruta; llegada al atardecer.",
    "day.78": "Días 7-8",
    "day.78.title": "Safari por el Serengeti y Ngorongoro",
    "day.78.body": "Safari de día completo por el Serengeti y traslado al cráter del Ngorongoro. Descenso al cráter (2.300 m) para observar una concentración increíble de fauna: elefantes, hipopótamos, rinocerontes negros, leones e hienas manchadas.",
    "day.910": "Días 9-10",
    "day.910.title": "Amboseli y Regreso a Nairobi",
    "day.910.body": "Traslado al Parque Nacional de Amboseli para disfrutar de las vistas del Kilimanjaro. Game drives por la tarde y por la mañana. El día 10, traslado a Nairobi para los vuelos internacionales.",
    "day.910.b1": "Grandes manadas de elefantes",
    "day.910.b2": "Vistas panorámicas del Kilimanjaro",
    "day.910.b3": "Abundante avifauna",
    "inc.heading": "Incluido y No Incluido",
    "inc.yes": "Incluido",
    "inc.y1": "Todas las entradas a los parques nacionales",
    "inc.y2": "Pensión completa durante todo el viaje",
    "inc.y3": "Transporte en Land Cruiser 4x4",
    "inc.y4": "Guía-conductor experto",
    "inc.y5": "Traslados de llegada y salida al aeropuerto",
    "inc.y6": "Agua mineral durante el safari",
    "inc.no": "No Incluido",
    "inc.n1": "Vuelos internacionales",
    "inc.n2": "Visados de Kenia/Tanzania",
    "inc.n3": "Bebidas alcohólicas",
    "inc.n4": "Propinas (opcional)",
    "inc.n5": "Safari en globo (opcional, coste adicional)",
    "inc.n6": "Seguro de viaje",
    "panel.kicker": "Resumen de la Ruta",
    "fact.accom": "Alojamiento",
    "fact.accom.v": "Lodges de lujo y campamentos con tiendas",
    "fact.meals": "Comidas",
    "fact.meals.v": "Pensión completa durante todo el viaje",
    "fact.drives": "Game Drives",
    "fact.drives.v": "Diarios, con guía experto",
    "fact.transfers": "Traslados",
    "fact.transfers.v": "Land Cruiser 4x4 y aeropuerto",
    "whybox.title": "Lo más destacado del safari",
    "whybox.1": "Ruta optimizada para maximizar los encuentros con la fauna",
    "whybox.2": "Grupos reducidos (máx. 8) para una experiencia cercana",
    "whybox.3": "Guías con más de 10 años de experiencia en el terreno",
    "whybox.5": "Asistencia multilingüe antes, durante y después",
    "btn.freequote": "Solicitar Presupuesto Gratis",
    "gallery.eyebrow": "Momentos de Nuestros Viajeros",
    "__html__gallery.title": "<span class=\"highlight\">Viajes Reales. Recuerdos</span> Reales de Safari.",
    "gallery.lead": "Momentos reales, fauna salvaje inolvidable y paisajes sobrecogedores de los safaris disfrutados por viajeros de España.",
    "gallery.more": "Ver Más Fotos",
    "testi.eyebrow": "Opiniones de Viajeros",
    "__html__testi.title": "Lo que los Viajeros <em>Españoles</em> Dicen de Reteti",
    "testi.lead": "Descubre por qué viajeros de toda España eligen Reteti Adventure Safaris para vivir experiencias inolvidables de safari en Kenia y Tanzania.",
    "faq.eyebrow": "Preguntas Frecuentes",
    "__html__faq.title": "<span class=\"highlight\">¿Tienes Dudas Antes de Reservar?</span> Te lo Contamos Todo.",
    "faq.lead": "Todo lo que los viajeros preguntan con más frecuencia antes de reservar un safari con nosotros en Kenia o Tanzania.",
    "faq.q1": "¿Es Reteti un operador de safaris legítimo?",
    "faq.a1": "Reteti Adventure Safaris es una empresa de safaris de gestión local con sede en Nairobi, con equipos trabajando sobre el terreno en Kenia y Tanzania.",
    "faq.q2": "¿Alguien me recibirá en el aeropuerto?",
    "faq.a2": "Sí. Los traslados de llegada y salida se coordinan según tu itinerario confirmado.",
    "faq.q3": "¿Son cómodos los vehículos de safari?",
    "faq.a3": "Utilizamos vehículos de safari diseñados específicamente, elegidos por su comodidad, visibilidad y aptitud para la observación de fauna.",
    "faq.q4": "¿Será mi alojamiento igual al mostrado?",
    "faq.a4": "Los lodges y campamentos seleccionados se confirman como parte de tu itinerario antes del viaje.",
    "faq.q5": "¿Vuestros guías hablan español?",
    "faq.a5": "Nuestros guías profesionales hablan inglés. Si la asistencia en español es importante para ti, avísanos al planificar tu safari para que podamos comentar las opciones disponibles.",
    "faq.q7": "¿Se cumplirá mi itinerario según lo planeado?",
    "faq.a7": "Confirmamos tu itinerario antes del viaje. Si las circunstancias requieren cambios, te lo comunicaremos y te ayudaremos a organizar la mejor alternativa disponible.",
    "faq.q8": "¿Hay costes ocultos?",
    "faq.a8": "Sin sorpresas. Tu propuesta personalizada detalla claramente lo que incluye y lo que no antes de reservar.",
    "form.eyebrow": "Planifica Tu Safari",
    "__html__form.title": "Obtén Tu Presupuesto de Safari<br />Gratuito y Personalizado para <em>Viajeros desde España</em>",
    "form.lead": "Cuéntanos algunos detalles y nuestros especialistas en safaris crearán un itinerario personalizado: los campamentos adecuados, la ruta ideal y el mejor precio. Sin compromiso.",
    "benefit.1.t": "Itinerario a Tu Medida",
    "benefit.1.d": "Plan día a día diseñado según tus fechas y presupuesto.",
    "benefit.2.t": "Guías Locales Expertos",
    "benefit.2.d": "100% de gestión local, sin intermediarios y con precios justos.",
    "benefit.3.t": "Respuesta en 24 Horas",
    "benefit.3.d": "Un presupuesto rápido y personalizado de nuestro equipo de safaris.",
    "form.visual.badge": "Valorado con 4,9/5 por Nuestros Viajeros",
    "footer.about": "Empresa de safaris 100% de gestión local con sede en Nairobi. Creamos experiencias únicas en Kenia y Tanzania sin intermediarios. Fauna, cultura y naturaleza, sin filtros.",
    "footer.h1": "Paquetes de Safari",
    "fl.1": "Kenia y Tanzania – 10 Días",
    "fl.2": "Lo Mejor de Kenia y Tanzania",
    "fl.3": "Safari Clásico en Kenia – 8 Días",
    "fl.4": "Kenia y Tanzania – 9 Días",
    "fl.5": "Safari en Avioneta – 5 Días",
    "fl.all": "Ver todos los paquetes",
    "footer.h2": "Destinos",
    "fl.alldest": "Ver todos los destinos",
    "footer.h3": "Contacto",
    "footer.copy": "© 2026 Reteti Adventure Safaris. Todos los derechos reservados.",
    "footer.d1": "Masai Mara, Kenia",
    "footer.d2": "Serengeti, Tanzania",
    "footer.d3": "Ngorongoro, Tanzania",
    "footer.d4": "Amboseli, Kenia",
    "footer.d5": "Lago Nakuru, Kenia",
    "footer.credit": "Diseñado y desarrollado por",
    "wa.tooltip": "¡Chatea con nosotros por WhatsApp!",
    "cta2.eyebrow": "TU AVENTURA AFRICANA COMIENZA AQUÍ",
    "cta2.title": "¿Listo para Vivir Kenia y Tanzania?",
    "cta2.desc1": "Cuéntanos cuándo quieres viajar, con quién y qué te gustaría vivir.",
    "cta2.desc2": "Crearemos un safari personalizado para ti.",
    "cta2.btn": "Solicitar Mi Plan de Safari Gratuito",
    "cta2.note": "Sin compromiso · Itinerario personalizado · Precios claros",
    "month.sep": "Septiembre",
    "month.oct": "Octubre",
    "month.nov": "Noviembre",
    "month.dec": "Diciembre",
    "month.jan27": "Enero 2027",
    "month.feb27": "Febrero 2027",
    "month.mar27": "Marzo 2027",
    "month.apr27": "Abril 2027",
    "month.may27": "Mayo 2027",
    "month.jun27": "Junio 2027",
    "pkg.priceLabel": "Desde / Persona",
    "pkg3.priceLabel": "Desde / Adulto",
    "pkg1.type": "MÁS VENDIDO",
    "pkg1.days": "10 Días",
    "pkg1.nights": "9 Noches",
    "pkg1.title": "El Safari Esencial de África Oriental",
    "pkg1.desc": "Dos países. Los Cinco Grandes. Una aventura africana inolvidable. Descubre lo mejor de Kenia y Tanzania en un safari perfectamente equilibrado. Desde la legendaria Maasai Mara hasta las interminables llanuras del Serengeti y el cráter del Ngorongoro, repleto de fauna salvaje, vive los paisajes y la vida salvaje que hacen que África Oriental sea extraordinaria.",
    "pkg1.chip1": "Maasai Mara",
    "pkg1.chip2": "Serengeti",
    "pkg1.chip3": "Cráter del Ngorongoro",
    "pkg1.cta": "Personalizar Mi Safari",
    "pkg2.type": "FAVORITO PARA LUNA DE MIEL",
    "pkg2.days": "13 Días",
    "pkg2.nights": "12 Noches",
    "pkg2.title": "Luna de Miel: Safari y Zanzíbar",
    "pkg2.desc": "África salvaje. Momentos privados. El paraíso al final. Comienza tu luna de miel rodeado de la increíble fauna de África y después relájate en las playas de arena blanca de Zanzíbar. Un viaje romántico que combina experiencias de safari privadas, lodges preciosos y el océano Índico, pensado especialmente para dos.",
    "pkg2.chip1": "Safari Privado",
    "pkg2.chip2": "Lodges Románticos",
    "pkg2.chip3": "Estancia en la Playa de Zanzíbar",
    "pkg2.cta": "Planificar Mi Luna de Miel",
    "pkg3.type": "FAVORITO EN FAMILIA",
    "pkg3.days": "10 Días",
    "pkg3.nights": "9 Noches",
    "pkg3.title": "Aventura Familiar en Kenia y Tanzania",
    "pkg3.desc": "Una aventura africana de la que tu familia hablará durante años. Descubre África en familia con encuentros inolvidables con la fauna salvaje, paisajes sobrecogedores y experiencias pensadas con comodidad y flexibilidad. Observa elefantes a los pies del monte Kilimanjaro, busca leones en la Maasai Mara y descubre juntos la vida salvaje del Serengeti. El precio de los niños se calcula por separado según la edad y la configuración de la habitación.",
    "pkg3.chip1": "Lodges para Familias",
    "pkg3.chip2": "Elefantes de Amboseli",
    "pkg3.chip3": "Maasai Mara",
    "pkg3.cta": "Planificar Mi Safari en Familia",
    "pkg4.type": "JUL.–OCT. · TEMPORADA",
    "pkg4.days": "9 Días",
    "pkg4.nights": "8 Noches",
    "pkg4.title": "Safari Emblemático de la Gran Migración",
    "pkg4.desc": "Presencia uno de los grandes espectáculos de la naturaleza. Sigue el ritmo de uno de los mayores espectáculos de fauna salvaje del mundo. Explora la Maasai Mara y el Serengeti durante la temporada de la migración, con guías expertos que te ayudarán a aprovechar al máximo tu tiempo en los parques.",
    "pkg4.chip1": "Gran Migración",
    "pkg4.chip2": "Grandes Felinos",
    "pkg4.chip3": "Fotografía",
    "pkg4.cta": "Consultar Fechas de la Migración",
    "pkg5.type": "LUJO PRIVADO",
    "pkg5.days": "12 Días",
    "pkg5.nights": "11 Noches",
    "pkg5.title": "Kenia y Tanzania de Lujo Privado",
    "pkg5.desc": "África, a tu ritmo. Sin renunciar a nada. Vive Kenia y Tanzania a un ritmo más exclusivo, alojándote en lodges y campamentos de lujo cuidadosamente seleccionados, con una experiencia de safari completamente privada. Pensado para viajeros que valoran la privacidad, la comodidad, ubicaciones excepcionales y un servicio personalizado.",
    "pkg5.chip1": "Lodges y Campamentos Premium",
    "pkg5.chip2": "Game Drives Privados",
    "pkg5.chip3": "Gastronomía Gourmet",
    "pkg5.cta": "Diseñar Mi Safari de Lujo",
    "pkg6.type": "GRUPO PRIVADO",
    "pkg6.days": "9 Días",
    "pkg6.nights": "8 Noches",
    "pkg6.title": "Safari Privado entre Amigos y Familia",
    "pkg6.desc": "Comparte África con las personas que más importan. Trae a tus personas favoritas y vivid África juntos. Un safari privado pensado para amigos, hermanos, parejas que viajan juntas o pequeños grupos privados, con itinerarios flexibles y vehículo propio.",
    "pkg6.chip1": "Vehículo Privado",
    "pkg6.chip2": "Itinerario Flexible",
    "pkg6.chip3": "Cinco Grandes",
    "pkg6.cta": "Planificar Nuestro Safari"
  }
  };

  function initLanguageSwitcher() {
    // Capture the original English content as the baseline.
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      TRANSLATIONS.en[el.getAttribute("data-i18n")] = el.textContent.trim();
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      TRANSLATIONS.en["__html__" + el.getAttribute("data-i18n-html")] =
        el.innerHTML.trim();
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      TRANSLATIONS.en["__ph__" + el.getAttribute("data-i18n-placeholder")] =
        el.getAttribute("placeholder") || "";
    });

    var buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  function setLanguage(lang) {
    var dict = TRANSLATIONS[lang] || {};
    var fallback = TRANSLATIONS.en;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key] != null ? dict[key] : fallback[key];
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var val =
        dict["__html__" + key] != null
          ? dict["__html__" + key]
          : fallback["__html__" + key];
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val =
        dict["__ph__" + key] != null
          ? dict["__ph__" + key]
          : fallback["__ph__" + key];
      if (val != null) el.setAttribute("placeholder", val);
    });

    // Reflect the active state on every language button.
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("reteti-lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  /* ---------------------------------------------------------
     4b. Header shrink-on-scroll
     --------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     5. Scroll Animations (reveal package cards)
     --------------------------------------------------------- */
  function initScrollAnimations() {
    var cards = document.querySelectorAll(".pkg-card");
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
              el.classList.add("visible");
            }, i * 90);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* ---------------------------------------------------------
     6. Back to Top
     --------------------------------------------------------- */
  function initBackToTop() {
    var backTop = document.getElementById("back-top");
    if (!backTop) return;

    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     7. Hero Slider
     --------------------------------------------------------- */
  function initHeroSlider() {
    var root = document.getElementById("hero-slider");
    if (!root) return;
    var slides = root.querySelectorAll(".hero-slide");
    var dots = root.querySelectorAll(".hero-dot");
    var prev = document.getElementById("hero-prev");
    var next = document.getElementById("hero-next");
    var heroInner = document.getElementById("hero-inner");
    var heroHeadline = document.getElementById("hero-headline");
    var heroSub = document.getElementById("hero-sub");
    var heroCta = document.getElementById("hero-cta");
    var heroCtaLabel = document.getElementById("hero-cta-label");
    var heroTagline = document.getElementById("hero-tagline");
    if (slides.length < 2) return;

    var current = 0;
    var timer = null;
    var INTERVAL = 6000;

    function applyContent(slide) {
      if (!slide) return;
      var suffix = document.documentElement.getAttribute("lang") === "es" ? "-es" : "";
      function attr(name) {
        return slide.getAttribute(name + suffix) || slide.getAttribute(name) || "";
      }
      if (heroHeadline) heroHeadline.textContent = attr("data-headline");
      if (heroSub) heroSub.textContent = attr("data-sub");
      if (heroCtaLabel) heroCtaLabel.textContent = attr("data-cta");
      if (heroCta) heroCta.setAttribute("href", slide.getAttribute("data-cta-href") || "#quote-form");
      if (heroTagline) heroTagline.textContent = attr("data-tagline");
    }

    function go(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
      if (heroInner) {
        heroInner.classList.add("is-fading");
        setTimeout(function () {
          applyContent(slides[current]);
          heroInner.classList.remove("is-fading");
        }, 220);
      } else {
        applyContent(slides[current]);
      }
    }
    function nextSlide() {
      go(current + 1);
    }
    function prevSlide() {
      go(current - 1);
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, INTERVAL);
    }

    if (next)
      next.addEventListener("click", function () {
        nextSlide();
        restart();
      });
    if (prev)
      prev.addEventListener("click", function () {
        prevSlide();
        restart();
      });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        go(parseInt(dot.getAttribute("data-slide"), 10));
        restart();
      });
    });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);

    document.addEventListener("langchange", function () {
      applyContent(slides[current]);
    });

    restart();
  }

  /* ---------------------------------------------------------
     8. Featured Gallery (thumbnail swap)
     --------------------------------------------------------- */
  function initFeaturedGallery() {
    var mainImg = document.getElementById("featured-main-img");
    var thumbs = document.querySelectorAll("#featured-thumbs .featured-thumb");
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var src = thumb.getAttribute("data-src");
        if (!src) return;
        mainImg.style.opacity = "0";
        setTimeout(function () {
          mainImg.setAttribute("src", src);
          mainImg.style.opacity = "1";
        }, 180);
        thumbs.forEach(function (t) {
          t.classList.remove("is-active");
        });
        thumb.classList.add("is-active");
      });
    });
  }

  /* ---------------------------------------------------------
     9. Testimonial Carousel
     --------------------------------------------------------- */
  function initTestimonialCarousel() {
    var root = document.getElementById("testi-carousel");
    var viewport = document.getElementById("testi-viewport");
    var track = document.getElementById("testi-track");
    var dotsWrap = document.getElementById("testi-dots");
    var prevBtn = document.getElementById("testi-prev");
    var nextBtn = document.getElementById("testi-next");
    if (!root || !viewport || !track) return;

    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    var index = 0;
    var timer = null;
    var INTERVAL = 4500;
    var perView = getPerView();

    function getPerView() {
      var w = window.innerWidth;
      if (w <= 620) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, total - perView);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var pages = maxIndex() + 1;
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement("button");
        dot.className = "testi-dot" + (i === index ? " is-active" : "");
        dot.setAttribute("aria-label", "Go to review " + (i + 1));
        (function (i) {
          dot.addEventListener("click", function () {
            goTo(i);
            restart();
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function render() {
      var slideWidth = viewport.clientWidth / perView;
      track.style.transform = "translateX(" + -(index * slideWidth) + "px)";
      updateDots();
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      render();
    }

    function next() {
      index = index >= maxIndex() ? 0 : index + 1;
      render();
    }

    function prev() {
      index = index <= 0 ? maxIndex() : index - 1;
      render();
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        next();
        restart();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        prev();
        restart();
      });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);

    // Swipe support
    var touchStartX = 0;
    var touchDeltaX = 0;
    viewport.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
        touchDeltaX = 0;
        if (timer) clearInterval(timer);
      },
      { passive: true }
    );
    viewport.addEventListener(
      "touchmove",
      function (e) {
        touchDeltaX = e.touches[0].clientX - touchStartX;
      },
      { passive: true }
    );
    viewport.addEventListener("touchend", function () {
      if (touchDeltaX > 40) prev();
      else if (touchDeltaX < -40) next();
      restart();
    });

    window.addEventListener("resize", function () {
      var newPerView = getPerView();
      if (newPerView !== perView) {
        perView = newPerView;
        buildDots();
      }
      index = Math.min(index, maxIndex());
      render();
    });

    buildDots();
    render();
    restart();
  }

  /* ---------------------------------------------------------
     10. Contact Form
     --------------------------------------------------------- */
  function initContactForm() {
    var forms = document.querySelectorAll(".inquiry-form form");
    forms.forEach(function (form) {
      var block = form.closest(".inquiry-form");
      var success = block ? block.querySelector(".form-success") : null;

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = form.querySelector('[name="your-name"]');
        var email = form.querySelector('[name="your-email"]');
        var mobile = form.querySelector('[name="your-mobile"]');

        // Minimal required-field validation.
        if (name && !name.value.trim()) {
          name.focus();
          return;
        }
        if (mobile && !mobile.value.trim()) {
          mobile.focus();
          return;
        }
        if (email && !email.value.trim()) {
          email.focus();
          return;
        }

        // Pre-fill the WhatsApp confirmation link with the enquiry.
        var waBtn = success ? success.querySelector("a[href*='wa.me']") : null;
        if (waBtn) {
          var msg =
            "Hello Reteti Safaris! I just sent a safari enquiry. Name: " +
            (name ? name.value.trim() : "");
          waBtn.setAttribute(
            "href",
            "https://wa.me/254700302965?text=" + encodeURIComponent(msg)
          );
        }

        // Swap the form for the success message.
        form.style.display = "none";
        if (success) success.style.display = "block";
      });
    });
  }

  /* ---------------------------------------------------------
   8b. Guest Gallery - View More Photos
   --------------------------------------------------------- */
function initGalleryViewMore() {
  var moreBtn = document.getElementById("gallery-more-btn");
  var hiddenItems = document.querySelectorAll(".gallery-item.is-hidden");
  if (!moreBtn || !hiddenItems.length) return;

  moreBtn.addEventListener("click", function (e) {
    e.preventDefault();

    hiddenItems.forEach(function (item) {
      item.classList.remove("is-hidden");
    });

    moreBtn.parentElement.style.display = "none";
  });
}

  /* ---------- Gallery Lightbox ---------- */
  function initGalleryLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var lightbox = document.getElementById("gallery-lightbox");
    if (!items.length || !lightbox) return;

    var imgEl = document.getElementById("lightbox-img");
    var counterEl = document.getElementById("lightbox-counter");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    var current = 0;
    var touchStartX = null;

    function show(index) {
      current = (index + items.length) % items.length;
      var link = items[current];
      imgEl.src = link.getAttribute("href");
      imgEl.alt = link.querySelector("img").getAttribute("alt") || "Safari photo";
      counterEl.textContent = (current + 1) + " / " + items.length;
    }

    function open(index) {
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(current - 1); });
    nextBtn.addEventListener("click", function () { show(current + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? show(current - 1) : show(current + 1);
      }
      touchStartX = null;
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", initGalleryLightbox);
})();
