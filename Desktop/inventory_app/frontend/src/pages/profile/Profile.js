import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import Card from "../../components/card/Card";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOurUser"
import {SET_NAME, SET_USER} from "../../redux/features/auth/authSlice";
import {getUser} from "../../services/authServices";
import "./Profile.scss"
const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const[profile, setProfile] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
   setIsLoading(true);
   async function getUserData(){
    const data = await getUser();
    console.log(data);
    setProfile(data);
    setIsLoading(false);
    await dispatch(SET_USER(data));
    await dispatch(SET_NAME(data.name))
   }
   getUserData();
  },[dispatch])
  return (
    <div className="profile --my-2">
      {profile === null ?(<p>Something went wrong, please reload the page</p>) : (
        <Card cardClass={"card --flfex-dir-column"}>
          <span className='profile-photo'>
            <img src = {profile?.photo} alt = "profilePic"/>
          </span>
         <span className="profile-data">
          <p>
            <b>Name: </b>{profile?.name}
          </p>
          <p>
            <b>Email: </b>{profile?.email}
          </p>
          <p>
            <b>Phone: </b>{profile?.phone}
          </p>
          <p>
            <b>Bio: </b>{profile?.bio}
          </p>
          <div>
            <Link to = "/edit-profile">
              <button className = "--btn --btn-primary">
                Edit Profile
              </button>
            </Link>
          </div>
         </span>
        </Card>
      )}
    </div>
  )
}

export default Profile