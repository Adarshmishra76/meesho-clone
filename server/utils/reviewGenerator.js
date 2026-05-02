// Enhanced Review Generator Utility
// Generates detailed, multi-paragraph product reviews

const detailedReviewTemplates = {
    'Women Ethnic': {
        positive: [
            {
                intro: "I recently purchased this and I'm absolutely delighted with my choice!",
                body: "The fabric quality is outstanding - soft, breathable, and feels premium against the skin. The colors are vibrant and exactly as shown in the pictures. I've worn it to two weddings already and received countless compliments.",
                pros: ["Perfect fit", "Excellent fabric quality", "Beautiful colors", "Great value for money"],
                cons: [],
                conclusion: "Highly recommend this to anyone looking for traditional wear that combines style with comfort. Will definitely order more!"
            },
            {
                intro: "This exceeded my expectations in every way.",
                body: "The stitching is impeccable and the attention to detail in the embroidery work is remarkable. It's comfortable enough for all-day wear yet elegant enough for special occasions. The material doesn't wrinkle easily which is a huge plus.",
                pros: ["Beautiful embroidery", "Comfortable all-day wear", "Wrinkle-resistant", "True to size"],
                cons: ["Slightly longer delivery time"],
                conclusion: "Despite the minor delay in delivery, the product quality makes up for it completely. Worth every penny!"
            },
            {
                intro: "Perfect festive wear! Couldn't be happier.",
                body: "I ordered this for Diwali and it was the perfect choice. The traditional look combined with modern comfort is exactly what I was looking for. My family loved it too! The dupatta that comes with it is beautifully designed and complements the outfit perfectly.",
                pros: ["Perfect for festivals", "Modern yet traditional", "Complete set with dupatta", "Comfortable fit"],
                cons: [],
                conclusion: "This is now my go-to brand for ethnic wear. Excellent quality and great prices!"
            }
        ],
        neutral: [
            {
                intro: "Decent product overall, with some minor issues.",
                body: "The fabric is good and the design is nice, but the color was slightly different from what I saw online - it's a bit lighter in person. Still wearable and I don't regret the purchase, but manage your expectations regarding the exact shade.",
                pros: ["Good fabric", "Nice design", "Reasonable price"],
                cons: ["Color slightly different from image", "Could use better packaging"],
                conclusion: "It's a good buy for the price, just be aware that the actual color might vary slightly."
            },
            {
                intro: "Good value for money but not exceptional.",
                body: "This is a solid everyday ethnic wear option. The material is comfortable and the stitching is decent. However, I wouldn't call it premium quality - it's more of a regular, everyday piece. That said, for the price point, it's fair.",
                pros: ["Affordable", "Comfortable", "Decent stitching"],
                cons: ["Not premium quality", "Basic design"],
                conclusion: "If you're looking for budget-friendly ethnic wear for casual occasions, this works well."
            }
        ],
        negative: [
            {
                intro: "Unfortunately, this didn't meet my expectations.",
                body: "The fabric feels cheaper than expected and started showing signs of wear after just one wash. The color faded noticeably which was disappointing. I expected better quality based on the reviews.",
                pros: ["Fast delivery"],
                cons: ["Poor fabric quality", "Color fades quickly", "Not durable"],
                conclusion: "I can't recommend this product. Would suggest looking for better quality options even if they cost a bit more."
            }
        ]
    },
    'Women Western': {
        positive: [
            {
                intro: "This is exactly what I was looking for!",
                body: "The fit is perfect and the material quality is excellent. I'm a size M and it fits me like a glove. The stitching is professional and the fabric has a nice feel to it. I've already washed it twice and it still looks brand new - no shrinkage or color bleeding.",
                pros: ["Perfect fit", "High-quality material", "True to size", "Maintains shape after washing"],
                cons: [],
                conclusion: "One of my best online purchases! Will definitely buy more from this brand."
            },
            {
                intro: "Stylish, comfortable, and affordable - what more could I ask for?",
                body: "I wear this regularly to my office and it's become one of my favorite pieces. The design is trendy yet professional. The fabric breathes well which is important for all-day wear. It pairs beautifully with both jeans and formal trousers.",
                pros: ["Versatile styling", "Breathable fabric", "Professional look", "Great price"],
                cons: ["Runs slightly large"],
                conclusion: "Just order a size down if you're in between sizes. Otherwise, it's perfect!"
            }
        ],
        neutral: [
            {
                intro: "Decent purchase but has some drawbacks.",
                body: "The style is nice and modern, but the fabric quality could be better. It's not bad, just not as premium as I hoped. The fitting is okay - a bit loose around the waist but manageable. Good for casual wear but I wouldn't wear it to important events.",
                pros: ["Nice design", "Comfortable", "Affordable"],
                cons: ["Fabric could be better", "Slightly loose fit"],
                conclusion: "It's okay for the price. Good for everyday casual wear."
            }
        ],
        negative: [
            {
                intro: "Not satisfied with this purchase.",
                body: "The product looks different from the pictures - the color is off and the material feels cheap. After one wash, it lost its shape completely. The seams started coming apart which shows poor quality control.",
                pros: [],
                cons: ["Looks different from pictures", "Poor quality", "Loses shape after wash"],
                conclusion: "Would not recommend. Better to spend a bit more on quality products."
            }
        ]
    },
    'Men Fashion': {
        positive: [
            {
                intro: "Excellent quality shirt at an amazing price!",
                body: "I've been wearing this regularly for the past month and it still looks brand new. The material is comfortable and doesn't wrinkle easily, which is perfect for office wear. The fit is spot on - not too tight, not too loose. The collar maintains its shape even after multiple washes.",
                pros: ["Excellent fabric", "Professional look", "Easy to maintain", "Great fit"],
                cons: [],
                conclusion: "This is now my go-to brand for formal shirts. Highly recommended!"
            },
            {
                intro: "Great value for money! Very impressed.",
                body: "The quality exceeded my expectations for this price point. The stitching is neat, the buttons are well-attached, and the fabric feels premium. I'm 5'10\" and the large size fits me perfectly. It's comfortable enough for all-day wear without feeling restrictive.",
                pros: ["Premium feel", "Perfect fit", "Durable", "Professional finish"],
                cons: ["Limited color options"],
                conclusion: "Wish they had more colors available, but otherwise, it's perfect!"
            }
        ],
        neutral: [
            {
                intro: "Good product but nothing extraordinary.",
                body: "It's a standard casual wear piece - comfortable and decent looking. The fabric is okay, not premium but not cheap either. Sizing is accurate. It serves its purpose well for everyday casual wear but I wouldn't wear it to formal occasions.",
                pros: ["Comfortable", "True to size", "Decent quality"],
                cons: ["Basic design", "Average fabric"],
                conclusion: "Good for casual daily wear. Don't expect premium quality."
            }
        ],
        negative: [
            {
                intro: "Disappointed with the quality.",
                body: "The size chart is completely inaccurate - I ordered my usual size but it's way too small. The fabric also feels rough and cheap. After just one wear, I noticed loose threads. Not worth the money at all.",
                pros: [],
                cons: ["Inaccurate sizing", "Poor fabric quality", "Loose threads"],
                conclusion: "Would not recommend. Size up if you decide to buy, or better yet, look elsewhere."
            }
        ]
    },
    'Kids': {
        positive: [
            {
                intro: "My daughter absolutely loves this!",
                body: "The fabric is soft and perfect for kids' sensitive skin. The colors are bright and vibrant - even after multiple washes. The size chart was accurate (ordered for a 5-year-old). Most importantly, my daughter finds it comfortable and actually wants to wear it, which says a lot!",
                pros: ["Soft fabric", "Vibrant colors", "Accurate sizing", "Kids love it"],
                cons: [],
                conclusion: "Perfect kids wear! Will definitely order more designs."
            },
            {
                intro: "Excellent quality for kids' clothing!",
                body: "I'm always cautious about what I buy for my son, especially when it comes to fabric quality. This exceeded my expectations - the material is soft, breathable, and the stitching is durable. He's rough with his clothes but this has held up beautifully after several washes.",
                pros: ["Durable", "Soft material", "Good stitching", "Value for money"],
                cons: ["Runs slightly big"],
                conclusion: "Great purchase! Just order the exact age size, don't size up."
            }
        ],
        neutral: [
            {
                intro: "Decent kids wear, nothing exceptional.",
                body: "It's okay for the price. The fabric is acceptable and my kid doesn't complain about wearing it. The design is cute though the quality is average. It's good for home wear or playtime but I wouldn't dress my child in this for special occasions.",
                pros: ["Affordable", "Cute design", "Comfortable"],
                cons: ["Average quality", "Basic finish"],
                conclusion: "Good for everyday wear. Don't expect premium quality."
            }
        ],
        negative: [
            {
                intro: "Not suitable for kids - fabric is too rough.",
                body: "My daughter complained that it was itchy and uncomfortable. The fabric quality is poor and it felt stiff even after washing. Size was also smaller than indicated. Returning this.",
                pros: [],
                cons: ["Rough fabric", "Uncomfortable", "Size runs small"],
                conclusion: "Do not recommend for kids. Look for softer, better quality options."
            }
        ]
    },
    'Home & Kitchen': {
        positive: [
            {
                intro: "Fantastic product! Exactly what I needed.",
                body: "The quality is outstanding for this price range. It's sturdy, well-made, and looks premium. I've been using it daily for the past three weeks and it shows no signs of wear. The finish is smooth and it's easy to clean, which is a huge plus for kitchen items.",
                pros: ["Excellent quality", "Durable", "Easy to maintain", "Great value"],
                cons: [],
                conclusion: "One of the best purchases I've made for my kitchen. Highly recommend!"
            },
            {
                intro: "Exceeded my expectations in every way!",
                body: "I was skeptical about ordering this online, but I'm so glad I did. The packaging was excellent and the product arrived in perfect condition. It's exactly as described and the quality is top-notch. Already recommended it to my friends and family.",
                pros: ["Premium quality", "Perfect packaging", "As described", "Worth the price"],
                cons: ["Delivery took slightly longer"],
                conclusion: "Minor delay in delivery but the product quality makes up for it!"
            }
        ],
        neutral: [
            {
                intro: "Does the job but nothing special.",
                body: "It's a functional product that serves its purpose. The quality is average - not bad but not exceptional either. For the price, it's acceptable. It gets the job done but don't expect it to last for years.",
                pros: ["Functional", "Affordable", "Decent quality"],
                cons: ["Average build quality", "Basic design"],
                conclusion: "Good for budget-conscious buyers. Works well enough for the price."
            }
        ],
        negative: [
            {
                intro: "Poor quality, broke within a week.",
                body: "This is cheaply made and doesn't last at all. I used it normally and it broke after just 5 days. The material is flimsy and the construction is poor. Complete waste of money. Customer service was unhelpful too.",
                pros: [],
                cons: ["Broke quickly", "Cheap material", "Poor construction", "Bad customer service"],
                conclusion: "Save your money and buy something better quality. Not worth it."
            }
        ]
    },
    'Beauty': {
        positive: [
            {
                intro: "This product is amazing! Visible results!",
                body: "I've been using this for about 3 weeks and I can already see noticeable improvements. My skin feels softer and looks more radiant. It's gentle and doesn't cause any irritation, which is important for my sensitive skin. The fragrance is mild and pleasant.",
                pros: ["Visible results", "Gentle on skin", "Pleasant fragrance", "Good value"],
                cons: [],
                conclusion: "This has become a staple in my skincare routine. Definitely repurchasing!"
            },
            {
                intro: "Best beauty purchase I've made in a while!",
                body: "The quality is excellent and a little goes a long way, so the bottle lasts quite long. I love that it's suitable for daily use and doesn't dry out my skin. After two weeks of consistent use, I noticed my skin texture improving. My makeup also applies more smoothly now.",
                pros: ["Long-lasting", "Suitable for daily use", "Improves skin texture", "Makeup-friendly"],
                cons: ["Slightly expensive"],
                conclusion: "Worth every rupee! The results justify the price."
            }
        ],
        neutral: [
            {
                intro: "Decent product but takes time to show results.",
                body: "I've been using it for a month and the results are subtle. It's not a miracle product but it does work slowly. The texture is nice and it doesn't feel heavy on the skin. Just don't expect overnight results.",
                pros: ["Light texture", "No side effects", "Pleasant to use"],
                cons: ["Slow results", "Pricey for the quantity"],
                conclusion: "It works, but you need patience. Results are gradual."
            }
        ],
        negative: [
            {
                intro: "This caused a breakout unfortunately.",
                body: "I was excited to try this based on the reviews, but it didn't work for my skin. After a week of use, I noticed more breakouts and irritation. Had to stop using it. Maybe it works for others but not for everyone.",
                pros: ["Nice packaging"],
                cons: ["Caused breakouts", "Irritation", "Doesn't suit all skin types"],
                conclusion: "Do a patch test first. Didn't work for me but YMMV."
            }
        ]
    },
    'Jewellery': {
        positive: [
            {
                intro: "Absolutely gorgeous! Love the design!",
                body: "This piece is stunning and looks way more expensive than it actually is. The craftsmanship is excellent and the plating is uniform and shiny. I've worn it to three parties already and got so many comp liments. The shine hasn't faded even after wearing it multiple times.",
                pros: ["Beautiful design", "Looks expensive", "Great plating", "Durable"],
                cons: [],
                conclusion: "Amazing value for money! My new favorite accessory."
            },
            {
                intro: "Perfect for weddings and parties!",
                body: "I bought this for my cousin's wedding and it was the perfect choice. The design is elegant and traditional, and it matched beautifully with my outfit. The weight is comfortable - not too heavy but substantial enough to feel premium. Everyone asked me where I got it from!",
                pros: ["Elegant design", "Comfortable weight", "Matches well", "Great compliments"],
                cons: ["Comes without a box"],
                conclusion: "Would've loved if it came in a gift box, but the product itself is excellent!"
            }
        ],
        neutral: [
            {
                intro: "Good for occasional wear.",
                body: "It's a nice piece for the price. The design is pretty but the plating isn't the best quality - you can tell it won't last forever. Good for occasional wear but I wouldn't wear it daily. It serves its purpose for special occasions.",
                pros: ["Nice design", "Affordable", "Good for occasions"],
                cons: ["Plating quality average", "Not for daily wear"],
                conclusion: "Good buy if you need something for occasional use. Don't expect it to last years."
            }
        ],
        negative: [
            {
                intro: "Plating started coming off after first use.",
                body: "Very disappointed. The plating began peeling off after I wore it just once. The quality is very poor and it looks cheap in person. The pictures are misleading - it looked much better online. Definitely not worth the money.",
                pros: [],
                cons: ["Poor plating", "Looks cheap", "Not durable", "Misleading pictures"],
                conclusion: "Would not recommend. Waste of money."
            }
        ]
    },
    'Bags': {
        positive: [
            {
                intro: "Excellent bag! Spacious and stylish!",
                body: "This bag has become my everyday companion. It's surprisingly spacious with multiple compartments that help keep everything organized. The material feels durable and the zippers work smoothly. I can fit my laptop, wallet, water bottle, and more without it looking bulky. The straps are comfortable even when the bag is full.",
                pros: ["Very spacious", "Multiple compartments", "Durable material", "Comfortable straps"],
                cons: [],
                conclusion: "Perfect everyday bag! Worth every rupee. Highly recommended!"
            },
            {
                intro: "Great quality for the price!",
                body: "I needed a new bag for college and this fit all my requirements. The design is modern and stylish, it has enough space for books and laptop, and the quality seems good. I've been using it for a month now and it still looks new. The material is water-resistant which is a huge plus during monsoons.",
                pros: ["Modern design", "Good storage", "Water-resistant", "Value for money"],
                cons: ["Color slightly different from image"],
                conclusion: "Minor color difference but otherwise perfect! Great purchase."
            }
        ],
        neutral: [
            {
                intro: "Decent bag for everyday use.",
                body: "It's a functional bag that does its job. The material is okay - not premium but not cheap either. It has enough pockets for basic organization. The zippers are a bit stiff but they work. Overall, it's acceptable for the price.",
                pros: ["Functional", "Adequate space", "Affordable"],
                cons: ["Average material", "Stiff zippers"],
                conclusion: "Gets the job done. Don't expect premium quality."
            }
        ],
        negative: [
            {
                intro: "Poor quality, stitching came apart quickly.",
                body: "The bag looked good initially but the quality is terrible. The stitching on one of the straps came apart within two weeks of normal use. The material also feels very cheap and thin. The zippers get stuck frequently. Very disappointed.",
                pros: [],
                cons: ["Poor stitching", "Cheap material", "Faulty zippers", "Not durable"],
                conclusion: "Do not buy. Complete waste of money."
            }
        ]
    },
    'Footwear': {
        positive: [
            {
                intro: "Most comfortable shoes I've ever owned!",
                body: "I have a job that requires me to be on my feet all day, and these shoes have been a lifesaver. They're incredibly comfortable with excellent cushioning. No break-in period needed - they felt great from day one. After a month of daily wear, they still look and feel brand new. The grip is also excellent.",
                pros: ["Extremely comfortable", "No break-in needed", "Durable", "Excellent grip"],
                cons: [],
                conclusion: "Best shoe purchase ever! Already ordered another pair in a different color."
            },
            {
                intro: "Perfect fit and great quality!",
                body: "I'm usually hesitant to buy shoes online because of sizing issues, but these fit perfectly. The size chart is accurate - I ordered my usual size and it's spot on. The material is good quality and the finishing is neat. They look stylish and feel comfortable for long wear.",
                pros: ["Perfect fit", "Accurate sizing", "Good material", "Stylish"],
                cons: ["Takes time to ship"],
                conclusion: "Worth the wait! Excellent shoes at a great price."
            }
        ],
        neutral: [
            {
                intro: "Comfortable but needs breaking in.",
                body: "These shoes are decent but they definitely need a break-in period. They felt stiff for the first few wears but are getting more comfortable now. The quality is okay for the price. Good for casual wear but I wouldn't recommend for long walks initially.",
                pros: ["Decent quality", "Affordable", "Good for casual wear"],
                cons: ["Needs breaking in", "Stiff initially"],
                conclusion: "Good buy if you're willing to break them in. Comfort improves with use."
            }
        ],
        negative: [
            {
                intro: "Very uncomfortable and poor quality.",
                body: "These shoes hurt my feet terribly. The sizing is way off - they're much smaller than indicated. The material also feels cheap and started peeling after just two wears. The sole has no proper cushioning. Completely regret this purchase.",
                pros: [],
                cons: ["Very uncomfortable", "Size runs small", "Poor material", "No cushioning"],
                conclusion: "Do not recommend. Terrible quality and fit."
            }
        ]
    },
    'Electronics': {
        positive: [
            {
                intro: "Excellent product! Works flawlessly!",
                body: "I've been using this for over a month now and I'm thoroughly impressed. The performance is excellent and it delivers exactly what it promises. The build quality feels premium and it's obvious that good materials were used. Battery life is impressive and charging is fast. The sound/picture quality (depending on product) is crystal clear.",
                pros: ["Excellent performance", "Premium build", "Long battery life", "Great value"],
                cons: [],
                conclusion: "One of the best electronics purchases I've made. Highly recommend!"
            },
            {
                intro: "Amazing quality for this price point!",
                body: "I did a lot of research before buying and I'm glad I chose this. It outperforms many products that cost twice as much. The features are intuitive and easy to use. Connectivity is stable and fast. It comes well-packaged with all necessary accessories. Customer support was also helpful when I had a question.",
                pros: ["Great performance", "Easy to use", "Good packaging", "Helpful support"],
                cons: ["Manual could be clearer"],
                conclusion: "Minor issue with documentation but the product itself is fantastic!"
            }
        ],
        neutral: [
            {
                intro: "Decent product but battery life disappoints.",
                body: "The product works as advertised for the most part. Performance is okay and it gets the job done. However, the battery life is not as long as claimed. I need to charge it more frequently than expected. Build quality is acceptable but feels a bit plasticky.",
                pros: ["Works as advertised", "Decent performance", "Affordable"],
                cons: ["Battery life not as claimed", "Feels plasticky"],
                conclusion: "It's okay for the price. Just manage your expectations on battery life."
            }
        ],
        negative: [
            {
                intro: "Stopped working after two weeks.",
                body: "This product failed completely after just 14 days of normal use. It won't charge or turn on anymore. The build quality was questionable from the start - felt cheap and flimsy. Customer service has been unresponsive to my requests for replacement. Very frustrated.",
                pros: [],
                cons: ["Stopped working", "Poor build", "Unresponsive support", "Not reliable"],
                conclusion: "Terrible experience. Do not waste your money on this."
            }
        ]
    }
};

const defaultDetailedTemplates = {
    positive: [
        {
            intro: "Very satisfied with this purchase!",
            body: "The product quality is excellent and it works exactly as described. I've been using it regularly and haven't faced any issues. The packaging was good and delivery was on time. Overall, a great shopping experience.",
            pros: ["Good quality", "Works well", "Timely delivery"],
            cons: [],
            conclusion: "Would definitely recommend to others. Great value for money!"
        }
    ],
    neutral: [
        {
            intro: "Acceptable product for the price.",
            body: "It's a decent product that serves its basic purpose. The quality is average - neither great nor poor. It does what it's supposed to do but don't expect premium features or exceptional durability.",
            pros: ["Functional", "Affordable"],
            cons: ["Average quality"],
            conclusion: "Good enough if you're on a budget."
        }
    ],
    negative: [
        {
            intro: "Not satisfied with this purchase.",
            body: "The product quality is below expectations. It doesn't work as well as advertised and feels cheaply made. I expected better based on the description and price.",
            pros: [],
            cons: ["Poor quality", "Not as advertised"],
            conclusion: "Would not recommend. Look for better alternatives."
        }
    ]
};

function generateDetailedReview(category, rating) {
    const templates = detailedReviewTemplates[category] || defaultDetailedTemplates;
    let reviewType;

    if (rating >= 4) {
        reviewType = 'positive';
    } else if (rating === 3) {
        reviewType = 'neutral';
    } else {
        reviewType = 'negative';
    }

    const templateOptions = templates[reviewType] || defaultDetailedTemplates[reviewType];
    const template = templateOptions[Math.floor(Math.random() * templateOptions.length)];

    // Build the review comment
    let comment = template.intro + " " + template.body;

    // Add pros/cons if they exist
    if (template.pros && template.pros.length > 0) {
        comment += "\n\nPros:\n" + template.pros.map(pro => `• ${pro}`).join("\n");
    }

    if (template.cons && template.cons.length > 0) {
        comment += "\n\nCons:\n" + template.cons.map(con => `• ${con}`).join("\n");
    }

    comment += "\n\n" + template.conclusion;

    return {
        title: template.intro,
        comment: comment
    };
}

// Rest of the original code with modifications
const reviewerNames = [
    'Priya Sharma', 'Amit Kumar', 'Sneha Patel', 'Rahul Singh', 'Neha Gupta',
    'Vijay Mehta', 'Pooja Reddy', 'Arjun Verma', 'Kavya Iyer', 'Rohan Das',
    'Anjali Joshi', 'Sanjay Nair', 'Divya Rao', 'Karan Chopra', 'Ritu Agarwal',
    'Manish Kulkarni', 'Shreya Malhotra', 'Aditya Shah', 'Megha Desai', 'Varun Saxena',
    'Sakshi Bansal', 'Nikhil Pandey', 'Isha Kapoor', 'Harsh Tiwari', 'Ananya Roy',
    'Deepak Gupta', 'Simran Kaur', 'Vivek Sharma', 'Nisha Reddy', 'Rajesh Kumar',
    'Tanvi Mehta', 'Siddharth Roy', 'Preeti Jain', 'Akash Verma', 'Madhuri Deshmukh'
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateReviewRating(productRating) {
    const ratings = [1, 2, 3, 4, 5];
    const weights = ratings.map(r => {
        const distance = Math.abs(r - productRating);
        if (distance === 0) return 40;
        if (distance === 1) return 25;
        if (distance === 2) return 10;
        return 5;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < ratings.length; i++) {
        random -= weights[i];
        if (random <= 0) return ratings[i];
    }

    return Math.round(productRating);
}

function generateReviews(product) {
    const numReviews = product.numReviews || getRandomInt(100, 800);
    const reviewsToGenerate = Math.min(numReviews, getRandomInt(30, 50)); // Generate 30-50 actual review objects
    const reviews = [];

    for (let i = 0; i < reviewsToGenerate; i++) {
        const rating = generateReviewRating(product.rating);
        const daysAgo = getRandomInt(1, 365);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        const reviewContent = generateDetailedReview(product.category, rating);

        reviews.push({
            reviewId: `${product._id}-review-${i}`,
            userName: getRandomElement(reviewerNames),
            rating: rating,
            title: reviewContent.title,
            comment: reviewContent.comment,
            helpful: getRandomInt(0, 120),
            verified: Math.random() > 0.25, // 75% verified purchases
            date: date.toISOString().split('T')[0]
        });
    }

    // Sort by most helpful first, then by date
    reviews.sort((a, b) => {
        if (b.helpful !== a.helpful) {
            return b.helpful - a.helpful;
        }
        return new Date(b.date) - new Date(a.date);
    });

    // Generate review distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    const avgRating = product.rating;
    if (avgRating >= 4.5) {
        distribution[5] = Math.round(numReviews * 0.65);
        distribution[4] = Math.round(numReviews * 0.25);
        distribution[3] = Math.round(numReviews * 0.07);
        distribution[2] = Math.round(numReviews * 0.02);
        distribution[1] = Math.round(numReviews * 0.01);
    } else if (avgRating >= 4.0) {
        distribution[5] = Math.round(numReviews * 0.50);
        distribution[4] = Math.round(numReviews * 0.30);
        distribution[3] = Math.round(numReviews * 0.15);
        distribution[2] = Math.round(numReviews * 0.03);
        distribution[1] = Math.round(numReviews * 0.02);
    } else if (avgRating >= 3.5) {
        distribution[5] = Math.round(numReviews * 0.35);
        distribution[4] = Math.round(numReviews * 0.35);
        distribution[3] = Math.round(numReviews * 0.20);
        distribution[2] = Math.round(numReviews * 0.07);
        distribution[1] = Math.round(numReviews * 0.03);
    } else {
        distribution[5] = Math.round(numReviews * 0.20);
        distribution[4] = Math.round(numReviews * 0.25);
        distribution[3] = Math.round(numReviews * 0.30);
        distribution[2] = Math.round(numReviews * 0.15);
        distribution[1] = Math.round(numReviews * 0.10);
    }

    return {
        reviews,
        reviewStats: {
            average: product.rating,
            total: numReviews,
            distribution
        }
    };
}

module.exports = { generateReviews };
