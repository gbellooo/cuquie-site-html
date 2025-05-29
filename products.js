// Dados dos produtos
const products = [
  {
    id: 1,
    name: "Cookie Tradicional de Chocolate",
    description: "O clássico cookie de chocolate com gotas generosas de chocolate ao leite. Crocante por fora e macio por dentro.",
    price: 8.90,
    image: "images/products/cookie_tradicional.jpeg",
    category: "Tradicionais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, gotas de chocolate ao leite, essência de baunilha, fermento em pó.",
    featured: true
  },
  {
    id: 2,
    name: "Cookie de Chocolate Branco e Cranberry",
    description: "Deliciosa combinação de chocolate branco cremoso e cranberries levemente ácidas para um sabor equilibrado.",
    price: 9.90,
    image: "images/products/cookie_branco_cranberry.jpeg",
    category: "Especiais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, gotas de chocolate branco, cranberries desidratadas, essência de baunilha, fermento em pó.",
    featured: false
  },
  {
    id: 3,
    name: "Cookie Duplo Chocolate",
    description: "Para os verdadeiros amantes de chocolate: massa de chocolate com gotas de chocolate meio amargo.",
    price: 9.50,
    image: "images/products/cookie_duplo_chocolate.webp",
    category: "Tradicionais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, cacau em pó, gotas de chocolate meio amargo, essência de baunilha, fermento em pó.",
    featured: true
  },
  {
    id: 4,
    name: "Cookie de Amendoim",
    description: "Cookie crocante com pedaços de amendoim torrado e um toque de caramelo.",
    price: 8.90,
    image: "images/products/cookie_amendoim.jpg",
    category: "Tradicionais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, amendoim torrado, caramelo, essência de baunilha, fermento em pó.",
    featured: false
  },
  {
    id: 5,
    name: "Cookie Red Velvet",
    description: "Inspirado no famoso bolo, este cookie tem cor vermelha vibrante e gotas de chocolate branco.",
    price: 10.50,
    image: "images/products/cookie_red_velvet.jpg",
    category: "Especiais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, corante alimentício vermelho, cacau em pó, gotas de chocolate branco, essência de baunilha, fermento em pó.",
    featured: true
  },
  {
    id: 6,
    name: "Cookie Sem Glúten de Coco",
    description: "Opção sem glúten com farinha de amêndoas e coco ralado para um sabor tropical.",
    price: 12.90,
    image: "images/products/cookie_sem_gluten_coco.jpg",
    category: "Sem Glúten",
    ingredients: "Farinha de amêndoas, açúcar de coco, óleo de coco, ovos, coco ralado, essência de baunilha, fermento em pó.",
    featured: false
  },
  {
    id: 7,
    name: "Cookie de Limão com Blueberry",
    description: "Refrescante cookie com raspas de limão e blueberries para um toque frutal.",
    price: 10.90,
    image: "images/products/cookie_limao_blueberry.jpg",
    category: "Especiais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, raspas de limão, blueberries, essência de baunilha, fermento em pó.",
    featured: false
  },
  {
    id: 8,
    name: "Cookie de Caramelo Salgado",
    description: "O equilíbrio perfeito entre doce e salgado com pedaços de caramelo e flor de sal.",
    price: 11.50,
    image: "images/products/cookie_caramelo_salgado.jpg",
    category: "Especiais",
    ingredients: "Farinha de trigo, açúcar mascavo, manteiga, ovos, pedaços de caramelo, flor de sal, essência de baunilha, fermento em pó.",
    featured: true
  },
  {
    id: 9,
    name: "Cookie Vegano de Chocolate",
    description: "Versão vegana do nosso cookie de chocolate, igualmente delicioso e sem ingredientes de origem animal.",
    price: 12.90,
    image: "images/products/cookie_vegano_chocolate.jpg",
    category: "Veganos",
    ingredients: "Farinha de trigo, açúcar demerara, óleo de coco, leite vegetal, gotas de chocolate vegano, essência de baunilha, fermento em pó.",
    featured: false
  },
  {
    id: 10,
    name: "Cookie de Matcha",
    description: "Sabor sofisticado de chá verde matcha com chocolate branco para um contraste perfeito.",
    price: 13.50,
    image: "images/products/cookie_matcha.jpg",
    category: "Especiais",
    ingredients: "Farinha de trigo, açúcar, manteiga, ovos, pó de matcha, gotas de chocolate branco, essência de baunilha, fermento em pó.",
    featured: false
  }
];
