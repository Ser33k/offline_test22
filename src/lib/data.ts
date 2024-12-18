export type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 2999.99,
    description: "Wydajny laptop do pracy i rozrywki",
    image: "/laptop.jpeg"
  },
  {
    id: 2,
    name: "Smartfon",
    price: 1499.99,
    description: "Nowoczesny smartfon z świetnym aparatem",
    image: "/smartfon.jpeg"
  },
  {
    id: 3,
    name: "Słuchawki",
    price: 299.99,
    description: "Bezprzewodowe słuchawki z aktywną redukcją szumów",
    image: "/sluchawki.jpeg"
  }
] 