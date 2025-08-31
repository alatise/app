export interface User {
  email: string;
  phone: string;
  password: string;
  status: "active" | "inactive" | "pending";
  role: "user" | "admin" | "manager";
  name?: string;
}

export interface CommonState {
  message: string;
  status: number;
  timestamp: string;
}

export interface Slide {
  id: number;
  title: string;
  description: string;
  image_url: string;
}
export interface WelcomeSlides extends CommonState {
  data: {
    slides: Slide[];
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends CommonState {
  data: {
    email: string;
    token: string;
    expires_in: string;
    token_type: string;
    user_id: number;
    name: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
  otp_type?: string;
}

export interface ForgotPasswordResponse extends CommonState {
  data: {
    message: string;
    otp_sent: string;
  };
}

export interface OtpConfirmationRequest {
  email: string;
  otp: string;
  otp_type: string;
}

export interface ResetPasswordRequest {
  new_password: string;
  confirm_password: string;
  email?: string;
  otp?: string;
}

export interface ChangePasswordRequest {
  new_password: string;
  current_password: string;
}

export interface authRefreshRequest {
  user_id: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  product_count: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

export interface CategoryResponse {
  data: {
    categories: Category[];
  };
}

export interface HomeResponse {
  data: {
    featured_categories: Category[];
    featured_products: Product[];
  };
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  image_url: string;
  gallery_images: [];
  rating: number;
  rating_count: number;
  category_id: number;
  category_name: string;
  stock_status: string;
  in_stock: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  attributes: {
    pa_sets: {};
  };
  variations: Variations;
}

export interface ProductParam {
  id?: number;
  page: number;
  per_page: number;
}

interface Variations {
  attributes: {
    attribute_pa_sets: string;
  };
  availability_html: string;
  backorders_allowed: boolean;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  dimensions_html: string;
  display_price: number;
  display_regular_price: number;
  image: {
    title: string;
    caption: string;
    url: string;
    alt: string;
    src: string;
    srcset: string;
    sizes: string;
    full_src: string;
    full_src_w: number;
    full_src_h: number;
    gallery_thumbnail_src: string;
    gallery_thumbnail_src_w: number;
    gallery_thumbnail_src_h: number;
    thumb_src: string;
    thumb_src_w: number;
    thumb_src_h: number;
    src_w: number;
    src_h: number;
  };
  image_id: number;
  is_downloadable: boolean;
  is_in_stock: boolean;
  is_purchasable: boolean;
  is_sold_individually: string;
  is_virtual: boolean;
  max_qty: string;
  min_qty: number;
  price_html: string;
  variation_description: string;
  variation_id: number;
  variation_is_active: boolean;
  variation_is_visible: boolean;
  weight: string;
  weight_html: string;
}

export interface CategoryProducts {
  data: {
    category_id: 38;
    category_name: "Grillz";
    category_description: "";
    products: Product[];
    pagination: {
      current_page: number;
      per_page: 10;
      total_pages: number;
    };
  };
}

// Pagination
export interface Pagination {
  currentPage: number;
  hasMore: boolean;
  isLoadingMore: boolean;
}

// Cart

export interface CartResponse {
  data: {
    items: CartItem[];
    item_count: number;
    subtotal: number;
    subtotal_tax: number;
    shipping_total: number;
    shipping_tax: number;
    discount_total: number;
    discount_tax: number;
    fee_total: number;
    total: number;
    total_tax: number;
    currency: string;
    currency_symbol: string;
    shipping_methods: [];
    needs_shipping: boolean;
    needs_payment: boolean;
    coupons_enabled: boolean;
    applied_coupons: [];
  };
}

export interface AddCartResponse extends CommonState {
  data: {
    message: string;
    cart_item_key: string;
    product_id: number;
    product_name: string;
    quantity: number;
    cart_total_items: number;
    cart_total: number;
    currency: string;
  };
}

export interface CartItem {
  cart_item_key: string;
  product_id: number;
  variation_id: 0;
  name: string;
  price: number;
  quantity: number;
  line_total: number;
  line_subtotal: number;
  image_url: string;
  category_name: string;
  stock_status: string;
  in_stock: true;
  variation_data: [];
}

export interface DeliveryAddressRequest {
  street: string;
  city: string;
  state: string;
  zip: string;
  type?: string;
}

export interface Address {
  id: string;
  type: string;
  label: string;
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
  is_default: boolean;
  created_at: string;
}

export interface DeliveryAddressResponse {
  data: {
    addresses: Address[];
  };
}

export interface AddCardRequest {
  card_number: string;
  expiry: string;
  cvv: string;
  cardholder_name: string;
}

export interface AddedCartItems {
  product_id: string | number;
  quantity: number;
  name: string;
  price: number
}

export interface CheckoutRequest {
  cart_items: AddedCartItems[];
  delivery_address: { street: string; city: string; zip: string };
}

export interface OrderStuff {
  order_id: number;
  order_number: string;
  status: string;
  total_amount: number;
  currency: string;
  estimated_delivery: string;
  payment_required: boolean;
  payment_method: string;
  order_date: string;
  items_count: number;
  delivery_address: Address;
}

export interface CheckoutResponse extends CommonState {
  data: OrderStuff;
}
