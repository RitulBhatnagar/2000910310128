import React, { useDebugValue } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectName } from '../../redux/features/auth/authSlice'
import { logoutUser } from '../../services/authServices';
import { SET_LOGIN } from '../../redux/features/auth/authSlice';
const Header = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async ()=>{
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  }
  return (
    <div className="--pad header">
    <div className="--flex-between">
      <h3>
        <span className="--fw-thin">Welcome , </span>
        <span className="--color-danger">{name}</span>
      </h3>
      <button onClick = {logout}  className="--btn --btn-danger">
        Logout
      </button>
    </div>
    <hr />
  </div>
  )
}

export default Header