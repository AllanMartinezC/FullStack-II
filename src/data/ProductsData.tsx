import aceiteOliva from "../assets/img/aceite_oliva.jpg";
import naranjas from "../assets/img/naranjas_valencia.jpg";
import platano from "../assets/img/Cavendish_Banannas.jpg";
import zanahoria from "../assets/img/zanahoria.jpg";
import brocoli from "../assets/img/broccoli.jpg";
import miel from "../assets/img/miel-organica.jpg";
import pimientos from "../assets/img/pimientos.jpg";
import manzanaFuji from "../assets/img/manzanasFuji.jpg";
import espinacas from "../assets/img/espinacas.png";


export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
    unit: string;       
  price: number;
  imageSrc: string;
   stock?: string;
}

export const productsData: Product[] = [
  {
    id: 1,
    title: "Manzanas Fuji",
    description: " Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido",
    category: "Frutas",
    price: 1200,
    unit: "Kilo",
    imageSrc: manzanaFuji,
    stock: "150 KL"
  },
  {
    id: 2,
    title: "Naranjas Valencia",
    description: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad",
    category: "Frutas",
    price: 1000,
    unit: "Kilo",
    imageSrc: naranjas,
    stock: "200 KL"
  },
  {
    id: 3,
    title: "Plátanos Cavendish",
    description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
    category: "Frutas",
    price: 800,
    unit: "Kilo",
    imageSrc: platano,
    stock: "250 KL"
  },
  {
    id: 4,
    title: "Zanahorias Orgánicas",
    description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
    category: "Verduras",
    price: 900,
    unit: "Kilo",
    imageSrc: zanahoria,
    stock: "100 KL"
  },

  {
    id: 5,
    title: "Brocoli",
    description: "Brócoli fresco y crujiente, ideal para salteados, sopas o al vapor. Rico en fibra, vitaminas y minerales, este vegetal aporta un toque verde y saludable a tus comidas, fortaleciendo el sistema inmunológico y favoreciendo una alimentación equilibrada",
    category: "Verduras",
    price: 900,
    unit: "Kilo",
    imageSrc: brocoli,
    stock: "150 KL"
  },
  {
    id: 6,
    title: "Miel Orgánica",
    description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
    category: "Verduras",
    price: 5000,
    unit: "Frasco 500g",
    imageSrc: miel,
    stock: "50 Frascos"
  },
  {
    id: 7,
    title: "Pimientos",
    description: " Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.",
    category: "Verduras",
    price: 1500,
    unit: "Kilo",
    imageSrc: pimientos,
    stock: "120 KL"
  },
  {
    id: 8,
    title: "Espinaca",
    description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional",
    category: "Verduras",
    price: 900,
    unit: "Kilo",
    imageSrc: espinacas,
    stock: "150 KL"
  },
  {
    id: 9,
    title: "Aceite de Oliva",
    description: "Aceite de oliva extra virgen de primera calidad, perfecto para aderezos, cocciones y preparaciones gourmet. Con su sabor suave y aroma afrutado, aporta grasas saludables y antioxidantes esenciales, realzando el sabor y el valor nutricional de cada plato.",
    category: "Organico",
    price: 900,
    unit: "Kilo",
    imageSrc: aceiteOliva,
    stock: "150 KL"
  },
];
