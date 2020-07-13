import React, { useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../Store/Store';
const Toast = () => {
  const { state, dispatch } = useContext(StoreContext);
  useEffect(() => {
    if (!state.toast.status) {
      return;
    }
    const { status, message } = state.toast;
    toast[status](message)
  },[state.toast.message]);
  return <ToastContainer />;
};

export default Toast;
