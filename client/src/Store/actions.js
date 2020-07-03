export const ActionTypes = {
  Login: Symbol('[AUTH] Login'),
  LoginSuccess: Symbol('[AUTH] Login Success'),
  LoginFailure: Symbol('[AUTH] Login Failure'),

  Register: Symbol('[AUTH] Register'),
  RegisterSuccess: Symbol('[AUTH] Success'),
  RegisterFailure: Symbol('[AUTH] Failure'),

  Logout: Symbol('[AUTH] Logout'),
  LogoutSuccess: Symbol('[AUTH] Logout Success'),
  LogoutFailure: Symbol('[AUTH] Logout Failure'),

  CreateProduct: Symbol('[AUTH] Create Product'),
  CreateProductSuccess: Symbol('[AUTH] Create Product Success'),
  CreateProductFailure: Symbol('[AUTH] Create Product Failure'),

  getProducts: Symbol('[AUTH] Get All Products'),
  getProductsSuccess: Symbol('[AUTH] Get All Products Success'),
  getProductsFailure: Symbol('[AUTH] Get All Products Failure'),
};

export const login = (user) => ({ type: ActionTypes.Login, payload: { user } });
export const loginSuccess = (user) => ({ type: ActionTypes.LoginSuccess, payload: { user }});
export const loginFailure = (error) => ({ type: ActionTypes.LoginFailure, payload: { error }});

export const register = (user) => ({type: ActionTypes.Register, payload: { user }});
export const registerSuccess = (user) => ({type: ActionTypes.RegisterSuccess, payload: { user }});
export const registerFailure = (error) => ({type: ActionTypes.RegisterFailure, payload: { error }});

export const logout = () => ({type: ActionTypes.Logout, payload: undefined});
export const logoutSuccess = () => ({type: ActionTypes.LogoutSuccess, payload: undefined});
export const logoutFailure  = (error) => ({type: ActionTypes.LogoutFailure, payload: { error }});

export const createProduct = (product) => ({ type: ActionTypes.CreateProduct, payload: { product } });
export const createProductSuccess = () => ({ type: ActionTypes.CreateProductSuccess, payload: undefined});
export const createProductFailure = (error) => ({ type: ActionTypes.CreateProductFailure, payload: { error }});

export const getProducts = (products) => ({ type: ActionTypes.CreateProduct, payload: { products } });
export const getProductsSuccess = (products) => ({ type: ActionTypes.CreateProductSuccess, payload: { products }});
export const getProductsFailure = (error) => ({ type: ActionTypes.CreateProductFailure, payload: { error }});