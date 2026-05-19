// Sample products database
const productsDB = [
    {
        id: 1,
        name: 'Bass Guitar',
        category: 'Strings',
        price: 15999 ,
        description: 'se Delivers low, powerful notes that support rhythm and groove.',
        image: "images/Bass.jpg",
        stock: 50,
        rating: 4.5
    },
    {
        id: 2,
        name: 'Electric Guitar',
        category: 'Strings',
        price: 18229.00,
        description: 'Generates amplified tones using pickups and electronic signals.',
        image: "images/electric.jpg",
        stock: 30,
        rating: 4
    },
    {
        id: 3,
        name: 'Acoustic Guitar',
        category: 'Strings',
        price: 6999.00,
        description: 'A warm, rich-sounding guitar perfect for beginners, songwriters, and classic acoustic performances.',
        image: "images/guitar1.jpg",
        stock: 100,
        rating: 5
    },
    {
        id: 4,
        name: 'Violin',
        category: 'Strings',
        price: 23455.50,
        description: 'A beautifully expressive bowed instrument known for its bright tone and wide musical range.',
        image: "images/violin.jpg",
        stock: 45,
        rating: 4.5
    },
    {
        id: 5,
        name: 'Ukulele',
        category: 'Strings',
        price: 10199.99,
        description: 'A small, friendly string instrument with a light, cheerful sound loved by beginners and performers.',
        image: "images/ukulele.jpg",
        stock: 25,
        rating: 4.5
    },
    {
        id: 6,
        name: 'Cello',
        category: 'Strings',
        price: 13745.00,
        description: 'A larger bowed instrument with deep, rich, and resonant tones.',
        image: "images/cello.jpg",
        stock: 40,
        rating: 4
    },
    {
        id: 7,
        name: 'Harp',
        category: 'Strings',
        price: 14344.99,
        description: 'A large, elegant instrument that creates soft, flowing, and angelic tones.',
        image: "images/harp.jpg",
        stock: 160,
        rating: 5
    },
    {
        id: 8,
        name: 'Mandolin',
        category: 'Strings',
        price: 22449.99,
        description: 'A bright, crisp string instrument known for its fast, melodic picking.',
        image: "images/Mandolin.jpg",
        stock: 35,
        rating: 4.6
    },
    {
        id: 9,
        name: 'Flute',
        category: 'Woodwind',
        price: 22449.99,
        description: 'A versatile woodwind that adds airy, melodic tones to any ensemble.',
        image: "images/flute.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 10,
        name: 'Oboe',
        category: 'Woodwind',
        price: 13255.99,
        description: 'Rich and piercing, giving depth to orchestral music.',
        image: "images/oboe-scaled.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 11,
        name: 'Tenor Saxophone',
        category: 'Woodwind',
        price: 24099.99,
        description: 'Bold and dynamic, ideal for jazz, pop, and soulful melodies.',
        image: "images/tenor saxophone.jpg",
        stock: 35,
        rating: 4.6
    },
    {
        id: 12,
        name: 'Recorder',
        category: 'Woodwind',
        price:  32000.99,
        description: 'Simple, sweet, and perfect for beginners and early learners.',
        image: "images/recorder.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 13,
        name: 'Clarinet',
        category: 'Woodwind',
        price:  32000.99,
        description: 'Smooth and expressive, perfect for classical and jazz pieces.',
        image: "images/Clarinet-2.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 14,
        name: 'Alto Saxophone',
        category: 'Woodwind',
        price:  36099.99,
        description: 'Bold and dynamic, ideal for jazz, pop, and soulful melodies.',
        image: "images/Alto-Saxophone.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 13,
        name: 'Trombone',
        category: 'Brass',
        price:  11399.99 ,
        description: 'Smooth and bold, adds depth to any ensemble.',
        image: "images/trombone.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 14,
        name: 'Trumpet',
        category: 'Brass',
        price:  32111.99,
        description: 'Bright and powerful, perfect for lead melodies.',
        image: "images/trumpet.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 15,
        name: 'Euphonium',
        category: 'Brass',
        price:  34551.99,
        description: 'Smooth and lyrical, perfect for rich, melodic lines.',
        image: "images/euphonium.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 16,
        name: 'Tuba',
        category: 'Brass',
        price:  32111.99,
        description: 'Deep and resonant, the foundation of brass sections.',
        image: "images/tuba.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 17,
        name: 'French Horn',
        category: 'Brass',
        price:  32111.99,
        description: 'Warm and rich, ideal for orchestral harmony..',
        image: "images/french.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 19,
        name: 'Bongos',
        category: 'Percussion',
        price:  34777.99,
        description: 'Small hand drums for lively, rhythmic accents.',
        image: "images/bongo.jpg",
        stock: 35,
        rating: 4.6
    }
    ,
     {
        id: 20,
        name: 'Tambourine',
        category: 'Percussion',
        price:  344.99,
        description: 'Jingly percussion to add sparkle to any song.',
        image: "images/tambourine.jpg",
        stock: 35,
        rating: 4.6
    }
    ,
     {
        id: 21,
        name: 'Drum Set',
        category: 'Percussion',
        price:  25699.99,
        description: 'Complete kit for dynamic rhythms and beats.',
        image: "images/drumsets.png",
        stock: 35,
        rating: 4.6
    },
     {
        id: 22,
        name: 'Snare Drum',
        category: 'Percussion',
        price:  24381.99,
        description: 'Crisp and sharp, perfect for marching and studio use.',
        image: "images/snare.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 23,
        name: 'Congas',
        category: 'Percussion',
        price:  4567.99,
        description: 'Tall hand drum with rich, vibrant tones for Latin rhythms.',
        image: "images/conga.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 24,
        name: 'Cajon',
        category: 'Percussion',
        price:  15000.99,
        description: 'Compact box drum delivering deep, earthy tones.',
        image: "images/cajon.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 25,
        name: 'Cornet',
        category: 'Percussion',
        price:  32111.99,
        description: 'Mellow and agile, great for solos and bands.',
        image: "images/cornet.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 26,
        name: 'Digital Organ',
        category: 'Keyboard',
        price:  48000.99,
        description: 'Real piano feel with modern digital features.',
        image: "images/digital.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 27,
        name: 'Synthesizer',
        category: 'Keyboard',
        price:  26700.99,
        description: 'Create endless sounds and electronic textures.',
        image: "images/synthesizer.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 28,
        name: 'Piano',
        category: 'Keyboard',
        price:  45000.99,
        description: 'Classic acoustic instrument with rich, expressive tones.',
        image: "images/piano.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 29,
        name: 'Organ',
        category: 'Keyboard',
        price:  23000.99,
        description: 'Full, resonant tones ideal for traditional and modern music.',
        image: "images/organ.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 30,
        name: 'MIDI Controller',
        category: 'Keyboard',
        price:  45673.99,
        description: 'Control virtual instruments and software with ease.',
        image: "images/midi.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 31,
        name: 'Keyboard',
        category: 'Keyboard',
        price:  32460.99,
        description: 'Versatile and portable for all kinds of music.',
        image: "images/keyboard.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 32,
        name: 'Speakers',
        category: 'Electronics',
        price:  4690.99,
        description: 'Accurate sound for mixing and mastering.',
        image: "images/studio.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 33,
        name: 'Microphones',
        category: 'Electronics',
        price:  2670.99,
        description: 'Capture clear vocals and instruments.',
        image: "images/mic.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 34,
        name: 'Mixers',
        category: 'Electronics',
        price:  4879.99,
        description: 'Balance and control multiple audio sources with ease.',
        image: "images/mixer.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 35,
        name: 'Electric Drum Kits',
        category: 'Electronics',
        price:  47899.99,
        description: 'Play and record drums digitally with versatility',
        image: "images/elecdrum.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 36,
        name: 'Studio Headphones',
        category: 'Electronics',
        price:  579.99,
        description: 'Personal listening with precise sound quality.',
        image: "images/headset.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 37,
        name: 'DJ Controllers',
        category: 'Electronics',
        price:  3202.99,
        description: 'Spin, mix, and create live music effortlessly.',
        image: "images/controller.jpg",
        stock: 35,
        rating: 4.6
    },
     {
        id: 38,
        name: 'Audio Interfaces',
        category: 'Electronics',
        price:  8111.99,
        description: 'Connect instruments and microphones to your computer.',
        image: "images/audio.jpg",
        stock: 35,
        rating: 4.6
    }
];

// Get all products
function getAllProducts() {
    return productsDB;
}

// Get product by ID
function getProductById(id) {
    return productsDB.find(p => p.id === parseInt(id));
}

// Filter products by category
function getProductsByCategory(category) {
    if (!category) return productsDB;
    return productsDB.filter(p => p.category === category);
}

// Search products
function searchProducts(query) {
    if (!query) return productsDB;
    query = query.toLowerCase();
    return productsDB.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
}

// Add product to database
function addProduct(product) {
    product.id = Math.max(...productsDB.map(p => p.id)) + 1;
    productsDB.push(product);
    saveToLocalStorage();
    return product;
}

// Update product
function updateProduct(id, updates) {
    const product = productsDB.find(p => p.id === id);
    if (product) {
        Object.assign(product, updates);
        saveToLocalStorage();
        return product;
    }
    return null;
}

// Delete product
function deleteProduct(id) {
    const index = productsDB.findIndex(p => p.id === id);
    if (index !== -1) {
        productsDB.splice(index, 1);
        saveToLocalStorage();
        return true;
    }
    return false;
}

// Save/Load from localStorage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsDB));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('products');
    if (stored) {
        productsDB = JSON.parse(stored);
    }
}

// Initialize on load
window.addEventListener('load', loadFromLocalStorage);
