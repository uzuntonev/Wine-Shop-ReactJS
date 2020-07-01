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
};

export const login = (user) => ({ type: ActionTypes.Login, payload: { user } });
export const loginSuccess = (user) => ({ type: ActionTypes.LoginSuccess, payload: { user }});
export const loginFailure = (error) => ({ type: ActionTypes.LoginFailure, payload: { error }});

export const register = (user) => ({type: ActionTypes.Register, payload: { user }});
export const registerSuccess = (user) => ({type: ActionTypes.RegisterSuccess, payload: { user }});
export const registerFailure = (error) => ({type: ActionTypes.RegisterFailure, payload: { error }});

export const logout = () => ({type: ActionTypes.Logout, payload: undefined});
export const logoutSuccess = () => ({type: ActionTypes.LogoutSuccess, payload: undefined});
export const logoutFailure  = (error) => ({type: ActionTypes.LoginFailure, payload: { error }});