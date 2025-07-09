import { Star, Quote } from 'lucide-react';
import { useGoogleTranslate } from '@/hooks/useGoogleTranslate';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: {
    fr: string;
    en: string;
    de: string;
    es: string;
    ar: string;
  };
  vehicle: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Benali",
    location: "Casablanca, Maroc",
    rating: 5,
    comment: {
      fr: "Service exceptionnel ! J'ai reçu ma BMW en parfait état et dans les délais promis. L'équipe d'Auto Germany Export est très professionnelle.",
      en: "Exceptional service! I received my BMW in perfect condition and on time. The Auto Germany Export team is very professional.",
      de: "Außergewöhnlicher Service! Ich habe meinen BMW in perfektem Zustand und pünktlich erhalten. Das Team von Auto Germany Export ist sehr professionell.",
      es: "¡Servicio excepcional! Recibí mi BMW en perfectas condiciones y a tiempo. El equipo de Auto Germany Export es muy profesional.",
      ar: "خدمة استثنائية! استلمت سيارتي BMW في حالة مثالية وفي الوقت المحدد. فريق Auto Germany Export محترف جداً."
    },
    vehicle: "BMW X5 2020",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Fatima El Mansouri",
    location: "Rabat, Maroc",
    rating: 5,
    comment: {
      fr: "Très satisfaite de mon achat ! La Mercedes était exactement comme décrite. Le processus d'importation s'est déroulé sans problème.",
      en: "Very satisfied with my purchase! The Mercedes was exactly as described. The import process went smoothly.",
      de: "Sehr zufrieden mit meinem Kauf! Der Mercedes war genau wie beschrieben. Der Importprozess verlief reibungslos.",
      es: "¡Muy satisfecha con mi compra! El Mercedes era exactamente como se describía. El proceso de importación fue sin problemas.",
      ar: "راضية جداً عن عملية الشراء! كانت سيارة Mercedes تماماً كما وُصفت. تمت عملية الاستيراد بسلاسة."
    },
    vehicle: "Mercedes C-Class 2019",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Youssef Alami",
    location: "Marrakech, Maroc",
    rating: 5,
    comment: {
      fr: "Équipe très réactive et transparente. J'ai été informé à chaque étape. Ma Porsche est arrivée en excellent état. Je recommande vivement !",
      en: "Very responsive and transparent team. I was informed at every step. My Porsche arrived in excellent condition. Highly recommend!",
      de: "Sehr reaktionsschnelles und transparentes Team. Ich wurde bei jedem Schritt informiert. Mein Porsche kam in ausgezeichnetem Zustand an. Sehr empfehlenswert!",
      es: "Equipo muy receptivo y transparente. Fui informado en cada paso. Mi Porsche llegó en excelente estado. ¡Muy recomendable!",
      ar: "فريق سريع الاستجابة وشفاف. تم إبلاغي في كل خطوة. وصلت سيارتي Porsche في حالة ممتازة. أنصح بشدة!"
    },
    vehicle: "Porsche Cayenne 2021",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Khadija Ouali",
    location: "Tanger, Maroc",
    rating: 5,
    comment: {
      fr: "Prix compétitifs et service client remarquable. Mon Audi A4 était moins chère qu'au Maroc avec une qualité supérieure. Merci à toute l'équipe !",
      en: "Competitive prices and remarkable customer service. My Audi A4 was cheaper than in Morocco with superior quality. Thanks to the whole team!",
      de: "Wettbewerbsfähige Preise und bemerkenswerten Kundenservice. Mein Audi A4 war billiger als in Marokko mit überlegener Qualität. Danke an das ganze Team!",
      es: "Precios competitivos y servicio al cliente notable. Mi Audi A4 era más barato que en Marruecos con calidad superior. ¡Gracias a todo el equipo!",
      ar: "أسعار تنافسية وخدمة عملاء رائعة. كانت سيارتي Audi A4 أرخص من المغرب بجودة أعلى. شكراً لكامل الفريق!"
    },
    vehicle: "Audi A4 2018",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

const ClientTestimonials = () => {
  const { currentLang } = useGoogleTranslate();

  const getTranslatedText = (textObj: any, fallback: string = '') => {
    if (typeof textObj === 'object' && textObj !== null) {
      return textObj[currentLang as keyof typeof textObj] || textObj.fr || fallback;
    }
    return textObj || fallback;
  };

  const sectionTitle = {
    fr: "Ce que disent nos clients",
    en: "What our clients say",
    de: "Was unsere Kunden sagen",
    es: "Lo que dicen nuestros clientes",
    ar: "ماذا يقول عملاؤنا"
  };

  const sectionSubtitle = {
    fr: "Des milliers de clients satisfaits nous font confiance pour leurs importations automobiles",
    en: "Thousands of satisfied customers trust us for their automotive imports",
    de: "Tausende zufriedene Kunden vertrauen uns bei ihren Fahrzeugimporten",
    es: "Miles de clientes satisfechos confían en nosotros para sus importaciones automotrices",
    ar: "الآلاف من العملاء الراضين يثقون بنا في واردات السيارات"
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-age">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold mb-6">
            {getTranslatedText(sectionTitle)}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText(sectionSubtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8 relative animate-on-scroll hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-4 right-4 text-age-red/20">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  <p className="text-age-red text-sm font-medium">{testimonial.vehicle}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="text-gray-700 italic leading-relaxed">
                "{getTranslatedText(testimonial.comment)}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;