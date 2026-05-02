// Description Generator Utility
// Generates detailed, rich product descriptions based on category and product data

const descriptionTemplates = {
    'Women Ethnic': {
        intro: [
            "Elevate your ethnic wardrobe with this exquisite {title}.",
            "Discover the perfect blend of tradition and style with this stunning {title}.",
            "Add a touch of elegance to your collection with this beautiful {title}.",
            "Experience the charm of traditional wear with this graceful {title}."
        ],
        body: [
            "Crafted from premium quality {material}, this piece offers exceptional comfort and breathability throughout the day. The intricate design and vibrant colors make it perfect for {occasions}. The attention to detail in the craftsmanship ensures that this piece stands out in any gathering.",
            "Made with care using high-quality {material}, this ethnic wear combines comfort with style effortlessly. Whether you're attending {occasions} or simply want to embrace traditional aesthetics, this piece is your perfect companion. The beautiful patterns and rich colors add a festive touch to your wardrobe.",
            "This carefully designed piece features premium {material} that feels soft against the skin while maintaining its elegant drape. Ideal for {occasions}, it showcases traditional artistry at its finest. The timeless design ensures you'll treasure this piece for years to come."
        ],
        features: [
            "Premium quality fabric for all-day comfort",
            "Vibrant, fade-resistant colors",
            "Traditional design with modern appeal",
            "Perfect fit with flattering silhouette",
            "Suitable for various occasions",
            "Easy to maintain and care for",
            "Durable stitching and quality finish"
        ],
        occasions: ["weddings", "festivals", "family gatherings", "special celebrations", "traditional events"],
        materials: ["cotton", "silk blend", "georgette", "chiffon", "chanderi silk", "rayon"],
        careInstructions: "Hand wash in cold water with mild detergent or dry clean for best results. Iron on medium heat. Store in a cool, dry place.",
        conclusion: [
            "Perfect for women who appreciate the perfect blend of traditional aesthetics with modern comfort.",
            "An essential addition to every woman's ethnic wear collection.",
            "Ideal for those who value quality, comfort, and timeless style."
        ]
    },
    'Women Western': {
        intro: [
            "Step up your style game with this trendy {title}.",
            "Make a fashion statement with this contemporary {title}.",
            "Discover modern elegance with this stylish {title}.",
            "Embrace effortless style with this chic {title}."
        ],
        body: [
            "Designed for the modern woman, this piece combines style with functionality. Made from high-quality {material}, it offers comfort without compromising on looks. Whether you're heading to {occasions}, this versatile piece adapts to your lifestyle seamlessly.",
            "This fashion-forward piece is crafted from premium {material} that provides exceptional comfort and durability. The contemporary design makes it perfect for {occasions}, while the quality construction ensures it remains a wardrobe staple season after season.",
            "Featuring a modern silhouette and quality {material}, this piece is designed to keep you comfortable and stylish throughout the day. Ideal for {occasions}, it pairs beautifully with your favorite accessories to create endless outfit possibilities."
        ],
        features: [
            "Premium quality fabric",
            "Modern, versatile design",
            "Comfortable all-day wear",
            "Easy to style and accessorize",
            "Durable and long-lasting",
            "Machine washable for convenience",
            "True to size fit"
        ],
        occasions: ["office wear", "casual outings", "weekend brunches", "evening parties", "everyday styling"],
        materials: ["cotton blend", "denim", "polyester", "viscose", "jersey knit", "linen blend"],
        careInstructions: "Machine wash cold with similar colors. Tumble dry low or  hang to dry. Iron on low heat if needed.",
        conclusion: [
            "A must-have for every fashion-conscious woman's wardrobe.",
            "Perfect for creating versatile, stylish looks for any occasion.",
            "Ideal for women who value both comfort and contemporary style."
        ]
    },
    'Men Fashion': {
        intro: [
            "Upgrade your wardrobe with this sophisticated {title}.",
            "Experience premium quality and style with this elegant {title}.",
            "Make an impression with this refined {title}.",
            "Discover the perfect balance of comfort and style with this {title}."
        ],
        body: [
            "Tailored from high-quality {material}, this piece offers the perfect combination of comfort and professional appearance. Ideal for {occasions}, it features quality construction and attention to detail that sets it apart. The timeless design ensures versatility across various settings.",
            "Crafted with precision using premium {material}, this piece delivers on both style and functionality. Whether you're dressing for {occasions}, this versatile addition to your wardrobe ensures you always look your best. The superior fabric quality promises long-lasting wear.",
            "This meticulously designed piece features excellent {material} that provides comfort without sacrificing style. Perfect for {occasions}, it showcases quality craftsmanship in every detail. The classic yet modern design makes it a wardrobe essential."
        ],
        features: [
            "Premium quality fabric",
            "Professional, polished look",
            "Comfortable fit for all-day wear",
            "Durable construction",
            "Easy to care for and maintain",
            "Versatile styling options",
            "Consistent sizing"
        ],
        occasions: ["office meetings", "business events", "casual outings", "weekend wear", "formal occasions"],
        materials: ["cotton", "cotton blend", "linen", "poly-cotton", "twill", "denim"],
        careInstructions: "Machine wash cold with like colors. Use mild detergent. Tumble dry on low or hang to dry. Iron on appropriate heat setting for fabric type.",
        conclusion: [
            "Essential for the modern man who values quality and style.",
            "A versatile addition that complements any wardrobe.",
            "Perfect for men who demand both comfort and sophistication."
        ]
    },
    'Kids': {
        intro: [
            "Give your little one the comfort they deserve with this adorable {title}.",
            "Make playtime more fun with this comfortable and cute {title}.",
            "Let your child express their personality with this charming {title}.",
            "Treat your child to quality and comfort with this delightful {title}."
        ],
        body: [
            "Specially designed for active kids, this piece is made from soft, breathable {material} that's gentle on sensitive skin. Perfect for {occasions}, it allows freedom of movement while keeping your child comfortable all day. The durable construction withstands energetic play and frequent washing.",
            "Crafted with children's comfort in mind, this piece features high-quality {material} that's both soft and durable. Whether for {occasions}, your child will love wearing this comfortable piece. The playful design and quality materials ensure it becomes a favorite in their wardrobe.",
            "This thoughtfully designed piece uses premium {material} that prioritizes your child's comfort and safety. Ideal for {occasions}, it combines fun colors and patterns with practical functionality. The easy-care fabric makes it perfect for busy parents."
        ],
        features: [
            "Soft, skin-friendly fabric",
            "Durable and long-lasting",
            "Fun, age-appropriate design",
            "Easy to wear and remove",
            "Machine washable",
            "Comfortable for active play",
            "Quality stitching for durability"
        ],
        occasions: ["daily wear", "playtime", "school", "parties", "family outings"],
        materials: ["100% cotton", "soft cotton blend", "breathable fabric", "jersey cotton", "organic cotton"],
        careInstructions: "Machine wash in cold water with mild, child-safe detergent. Avoid bleach. Tumble dry low or air dry. Iron on low heat if needed.",
        conclusion: [
            "Perfect for parents who refuse to compromise on quality and comfort.",
            "A delightful addition to your child's wardrobe.",
            "Ideal for kids who deserve the best in comfort and style."
        ]
    },
    'Home & Kitchen': {
        intro: [
            "Transform your kitchen with this essential {title}.",
            "Make cooking and serving easier with this practical {title}.",
            "Upgrade your kitchen essentials with this quality {title}.",
            "Bring functionality and style to your home with this versatile {title}."
        ],
        body: [
            "Designed for modern homes, this {title} combines functionality with aesthetic appeal. Made from durable {material}, it's built to withstand daily use while maintaining its appearance. Whether you're {occasions}, this piece delivers reliable performance you can count on.",
            "This carefully crafted {title} features high-quality {material} that ensures long-lasting durability. Perfect for {occasions}, it makes your daily tasks easier and more efficient. The thoughtful design considers both practicality and visual appeal.",
            "Constructed from premium {material}, this {title} is engineered for everyday use in busy households. Ideal for {occasions}, it combines superior quality with user-friendly design. The easy maintenance ensures it remains a reliable kitchen companion."
        ],
        features: [
            "High-quality, durable materials",
            "Functional and practical design",
            "Easy to clean and maintain",
            "Long-lasting construction",
            "Suitable for daily use",
            "Safe for food contact (where applicable)",
            "Value for money"
        ],
        occasions: ["daily cooking", "meal preparation", "serving guests", "family dinners", "special occasions"],
        materials: ["stainless steel", "ceramic", "food-grade plastic", "glass", "non-stick coating", "aluminum"],
        careInstructions: "Wash with mild soap and water. Avoid abrasive cleaners. Dry thoroughly before storing. Follow specific care instructions for material type.",
        conclusion: [
            "Essential for every modern kitchen.",
            "Perfect for home cooks who value quality and functionality.",
            "A practical addition that makes daily tasks easier."
        ]
    },
    'Beauty': {
        intro: [
            "Pamper yourself with this luxurious {title}.",
            "Reveal your natural beauty with this effective {title}.",
            "Transform your skincare/beauty routine with this premium {title}.",
            "Experience the difference quality makes with this exceptional {title}."
        ],
        body: [
            "Formulated with carefully selected ingredients, this {title} delivers visible results while being gentle on your skin. Suitable for {occasions}, it's designed to {benefits}. The quality formulation ensures effective results without harsh chemicals.",
            "This thoughtfully created {title} combines effective ingredients with a luxurious experience. Perfect for {occasions}, it works to {benefits}. The gentle yet powerful formula makes it suitable for regular use as part of your beauty routine.",
            "Enriched with premium ingredients, this {title} is crafted to {benefits}. Ideal for {occasions}, it provides a spa-like experience at home. The carefully balanced formulation delivers results you can see and feel."
        ],
        features: [
            "Quality ingredients",
            "Suitable for regular use",
            "Visible results with consistent use",
            "Gentle formulation",
            "Pleasant fragrance/texture",
            "Easy to apply",
            "Good value for quantity"
        ],
        occasions: ["daily skincare routine", "special occasions", "self-care days", "beauty regimen", "regular maintenance"],
        benefits: [
            "improve skin texture and tone",
            "provide deep nourishment",
            "enhance natural radiance",
            "address specific skin concerns",
            "maintain healthy appearance"
        ],
        careInstructions: "Store in a cool, dry place away from direct sunlight. Use within recommended period after opening. Perform patch test before first use.",
        conclusion: [
            "Perfect for beauty enthusiasts who value quality and results.",
            "An excellent addition to your beauty arsenal.",
            "Ideal for those committed to looking and feeling their best."
        ]
    },
    'Jewellery': {
        intro: [
            "Add sparkle to your look with this stunning {title}.",
            "Elevate your style quotient with this elegant {title}.",
            "Make a statement with this eye-catching {title}.",
            "Complete your outfit with this beautiful {title}."
        ],
        body: [
            "This exquisite {title} features beautiful craftsmanship and attention to detail. Made with quality {material} and finished with care, it adds a touch of elegance to any outfit. Perfect for {occasions}, it's designed to complement your personal style while making a lasting impression.",
            "Crafted with precision, this {title} showcases excellent design and quality finish. The premium {material} and meticulous plating ensure long-lasting shine and durability. Whether for {occasions}, this piece adds the perfect finishing touch to your ensemble.",
            "This sophisticated {title} combines traditional artistry with modern aesthetics. Featuring quality {material} and expert craftsmanship, it's built to maintain its beauty over time. Ideal for {occasions}, it's a versatile addition to your jewelry collection."
        ],
        features: [
            "Beautiful, eye-catching design",
            "Quality materials and plating",
            "Durable construction",
            "Comfortable to wear",
            "Suitable for various occasions",
            "Easy to style",
            "Great value for money"
        ],
        occasions: ["parties", "weddings", "festivals", "special events", "daily wear"],
        materials: ["gold plated", "silver plated", "alloy with plating", "artificial stones", "premium finish"],
        careInstructions: "Store separately to avoid scratches. Keep away from perfumes, water, and chemicals. Clean gently with soft cloth. Remove before bathing or sleeping.",
        conclusion: [
            "Perfect for women who love to accessorize.",
            "A beautiful piece that enhances any outfit.",
            "Ideal for adding elegance to your everyday or special looks."
        ]
    },
    'Bags': {
        intro: [
            "Carry your essentials in style with this practical {title}.",
            "Stay organized on the go with this spacious {title}.",
            "Make your daily commute easier with this functional {title}.",
            "Express your style while staying practical with this versatile {title}."
        ],
        body: [
            "Designed for modern life, this {title} combines ample storage with stylish design. Crafted from durable {material}, it's built to withstand daily use while keeping your belongings organized and accessible. Perfect for {occasions}, it features multiple compartments for maximum functionality.",
            "This thoughtfully designed {title} features quality {material} and smart organization solutions. Whether you're heading to {occasions}, this bag adapts to your needs. The comfortable design ensures ease of carry even when fully loaded, while the durable construction promises long-term use.",
            "Constructed from premium {material}, this {title} offers the perfect blend of style and practicality. Ideal for {occasions}, it provides generous storage space without compromising on looks. The quality zippers and reinforced stitching ensure it stands up to everyday demands."
        ],
        features: [
            "Spacious main compartment",
            "Multiple organizational pockets",
            "Durable, quality material",
            "Comfortable carrying options",
            "Stylish, versatile design",
            "Strong zippers and hardware",
            "Easy to maintain"
        ],
        occasions: ["daily commute", "work", "college", "travel", "shopping trips"],
        materials: ["synthetic leather", "canvas", "nylon", "polyester", "vegan leather", "fabric"],
        careInstructions: "Wipe clean with damp cloth. Avoid overloading. Store in dust bag when not in use. Keep away from sharp objects.",
        conclusion: [
            "Essential for anyone who values organization and style.",
            "A reliable companion for your daily activities.",
            "Perfect for those who need practical storage solutions without compromising on looks."
        ]
    },
    'Footwear': {
        intro: [
            "Step out in comfort and style with these {title}.",
            "Experience all-day comfort with these quality {title}.",
            "Make every step count with these versatile {title}.",
            "Walk with confidence in these well-crafted {title}."
        ],
        body: [
            "Engineered for comfort and durability, these {title} feature quality {material} and thoughtful construction. The cushioned design ensures all-day comfort, while the reliable grip provides stability with every step. Perfect for {occasions}, these shoes are built to become your go-to footwear choice.",
            "These carefully designed {title} combine style with functionality. Crafted from durable {material}, they offer excellent support and comfort for extended wear. Whether for {occasions}, these shoes deliver the performance and style you need. The quality construction ensures they maintain their appearance and comfort over time.",
            "Featuring premium {material} and expert craftsmanship, these {title} are designed for the demands of modern life. Ideal for {occasions}, they provide superior comfort without sacrificing style. The durable sole and quality materials ensure long-lasting wear and reliable performance."
        ],
        features: [
            "Comfortable cushioned design",
            "Durable, quality materials",
            "Excellent grip and traction",
            "Versatile styling options",
            "True to size fit",
            "Long-lasting construction",
            "Easy to clean and maintain"
        ],
        occasions: ["daily wear", "work", "casual outings", "sports activities", "long walks"],
        materials: ["synthetic leather", "mesh fabric", "rubber sole", "EVA cushioning", "canvas", "breathable material"],
        careInstructions: "Clean with soft brush and mild soap. Air dry away from direct heat or sunlight. Use shoe trees to maintain shape when storing.",
        conclusion: [
            "Perfect for active individuals who value both comfort and style.",
            "A reliable addition to your footwear collection.",
            "Ideal for anyone seeking quality shoes that go the distance."
        ]
    },
    'Electronics': {
        intro: [
            "Experience cutting-edge technology with this advanced {title}.",
            "Upgrade your tech arsenal with this high-performance {title}.",
            "Stay connected and productive with this reliable {title}.",
            "Enjoy superior quality and performance with this innovative {title}."
        ],
        body: [
            "Packed with advanced features, this {title} delivers exceptional performance for {occasions}. Built with quality components and smart technology, it provides reliable functionality that enhances your daily routine. The user-friendly design ensures easy operation, while the durable construction promises long-term value.",
            "This state-of-the-art {title} combines powerful performance with intuitive usability. Perfect for {occasions}, it features cutting-edge technology that makes your life easier and more efficient. The premium build quality and attention to detail ensure consistent, reliable performance day after day.",
            "Engineered for excellence, this {title} offers outstanding performance and versatility. Whether for {occasions}, it delivers the speed, quality, and reliability you need. The thoughtful design and quality construction make it a smart investment in your tech ecosystem."
        ],
        features: [
            "Advanced technology and features",
            "High-quality performance",
            "User-friendly operation",
            "Durable construction",
            "Energy efficient",
            "Comprehensive connectivity options",
            "Comes with necessary accessories"
        ],
        occasions: ["daily use", "work tasks", "entertainment", "communication needs", "productivity"],
        careInstructions: "Handle with care. Keep away from water and extreme temperatures. Clean with soft, dry cloth. Follow user manual for optimal performance and safety.",
        conclusion: [
            "Essential for tech enthusiasts who demand quality and performance.",
            "A smart investment that enhances your digital lifestyle.",
            "Perfect for users who value reliability and cutting-edge features."
        ]
    }
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateDescription(product) {
    const category = product.category;
    const template = descriptionTemplates[category] || descriptionTemplates['Home & Kitchen']; // fallback

    // Build the description
    let description = '';

    // Introduction
    const intro = getRandomElement(template.intro).replace('{title}', product.title.toLowerCase());
    description += intro + '\n\n';

    // Body - select material and occasions
    const material = getRandomElement(template.materials || ['quality material']);
    const occasions = template.occasions || ['various occasions'];
    const selectedOccasions = occasions.slice(0, 3).join(', ');

    let body = getRandomElement(template.body);
    body = body.replace('{material}', material)
        .replace('{occasions}', selectedOccasions);

    // For beauty products, add benefits
    if (category === 'Beauty' && template.benefits) {
        const benefit = getRandomElement(template.benefits);
        body = body.replace('{benefits}', benefit);
    }

    description += body + '\n\n';

    // Features
    description += '**Key Features:**\n';
    const featuresCount = Math.min(template.features.length, 5 + Math.floor(Math.random() * 3)); // 5-7 features
    const selectedFeatures = template.features.slice(0, featuresCount);
    selectedFeatures.forEach(feature => {
        description += `• ${feature}\n`;
    });
    description += '\n';

    // Care Instructions
    if (template.careInstructions) {
        description += `**Care Instructions:** ${template.careInstructions}\n\n`;
    }

    // Conclusion
    const conclusion = getRandomElement(template.conclusion);
    description += conclusion;

    return description;
}

module.exports = { generateDescription };
