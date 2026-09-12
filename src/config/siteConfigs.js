/**
 * Site Configuration Variants
 * Define all site variants here with their specific configurations
 * Each variant represents a complete brand/site identity
 */

const siteConfigs = {
  tutorspie: {
    variant: "tutorspie",
    name: "TutorsPie",
    brandName: "Tutorspie",
    tagline: "Expert Academic Writing Support",
    
    contact: {
      phone: "+1 (800) 555-0199",
      phoneHref: "tel:+18005550199",
      email: "support@tutorspie.com",
      emailHref: "mailto:support@tutorspie.com",
      address: "123 Academic Ave, Education City, EC 12345",
    },

    branding: {
      logo: "/images/logo.png",
      logoWhite: "/images/logotutorspiewhite.png",
      favicon: "/favicon.ico",
      primaryColor: "#16a34a",
      secondaryColor: "#15803d",
    },

    header: {
      showPhone: true,
      showEmail: true,
      ctaText: "Place Order",
      ctaLink: "/order",
    },

    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Tutorspie. All Rights Reserved.`,
      showSocialMedia: true,
      socialLinks: {
        facebook: "https://facebook.com/tutorspie",
        twitter: "https://twitter.com/tutorspie",
        instagram: "https://instagram.com/tutorspie",
      },
    },

    navigation: {
      main: [
        { href: "/", label: "Home" },
        { href: "/#about", label: "About" },
        { href: "/#services_section", label: "Services" },
        { href: "/#faq", label: "FAQs" },
        { href: "/contact", label: "Contact" },
      ],
      footer: [
        { href: "/", label: "Home" },
        { href: "/#benefits", label: "Benefits" },
        { href: "/#process", label: "Process" },
        { href: "/#testimonials", label: "Testimonials" },
        { href: "/#comparison", label: "Comparison" },
        { href: "/#faq", label: "FAQs" },
        { href: "/#about", label: "About Us" },
        { href: "/terms", label: "Terms and Conditions" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/contact", label: "Contact" },
      ],
    },

    seo: {
      titleTemplate: "%s | Tutorspie - Expert Academic Writing",
      defaultTitle: "Tutorspie - Expert Academic Writing Support",
      description: "Get expert academic writing support from qualified professionals. High-quality essays, research papers, and more.",
      keywords: "academic writing, essay help, research papers, tutoring",
    },

    features: {
      showReviews: true,
      reviewCount: "2,340+",
      rating: "4.9",
      studentCount: "10,000+",
      trustBadges: true,
    },
  },

  demo: {
    variant: "demo",
    name: "TutorsPie Demo",
    brandName: "Tutorspie Demo",
    tagline: "Alternative Design Demo",
    
    contact: {
      phone: "+1 (999) 123-4567",
      phoneHref: "tel:+18881234567",
      email: "demo@tutorspie.com",
      emailHref: "mailto:demo@tutorspie.com",
      address: "456 Learning Lane, Knowledge City, KC 67890",
    },

    branding: {
      logo: "/images/logo-demo.png",
      logoWhite: "/images/logo-demo-white.png",
      favicon: "/favicon-demo.ico",
      primaryColor: "#2563eb",
      secondaryColor: "#1d4ed8",
    },

    header: {
      showPhone: true,
      showEmail: true,
      ctaText: "Get Started",
      ctaLink: "/order",
    },

    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Tutorspie Demo. All Rights Reserved.`,
      showSocialMedia: true,
      socialLinks: {
        facebook: "https://facebook.com/tutorspie",
        twitter: "https://twitter.com/tutorspie",
        linkedin: "https://linkedin.com/company/tutorspie",
      },
    },

    navigation: {
      main: [
        { href: "/", label: "Home" },
        { href: "/#about", label: "About Us" },
        { href: "/#services", label: "Our Services" },
        { href: "/#how-it-works", label: "How It Works" },
        { href: "/#pricing", label: "Pricing" },
        { href: "/contact", label: "Contact" },
      ],
      footer: [
        { href: "/", label: "Home" },
        { href: "/#about", label: "About Us" },
        { href: "/#services", label: "Services" },
        { href: "/#testimonials", label: "Testimonials" },
        { href: "/#faq", label: "FAQs" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/contact", label: "Contact Us" },
      ],
    },

    seo: {
      titleTemplate: "%s | Tutorspie Demo - Academic Success",
      defaultTitle: "Tutorspie Demo - Alternative Design",
      description: "Navigate your academic journey with expert tutoring and writing assistance. Achieve excellence with Tutorspie.",
      keywords: "tutoring, academic support, online learning, essay writing",
    },

    features: {
      showReviews: true,
      reviewCount: "5,000+",
      rating: "4.8",
      studentCount: "15,000+",
      trustBadges: true,
    },
  },
};

export default siteConfigs;
