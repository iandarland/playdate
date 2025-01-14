import React, { useState, useEffect, useContext, useRef } from "react";
import {Toast} from "primereact/toast";
import UserContext from "../utils/userContext"
import { useAuth0 } from "@auth0/auth0-react";
import Profileform2 from "../components/Profileform/Profileform2";
import Kids2 from "../components/Kids/Kids2";
import CurrentProfileCard from "../components/CurrentProfileC/CurrentProfileC"
import MiniCardContainer from "../components/MiniCardContainer/MiniCardContainer"
import API from "../utils/API"
import axios from "axios"




function Editprofile(props) {
    const toast = useRef(null);
    const { user } = useAuth0();
    const {dbUser}=useContext(UserContext);
    const [kidInfo, setKidInfo] = useState({
       
        kidname: "",
        kidage: '',
        gender: ""
       });
    const [kidList, setKidList] = useState([])
    const [profileInfo, setProfileInfo] = useState({})

    useEffect(() => {
        setKidList(dbUser.child)
    },[dbUser.child])

    useEffect(() => {
        API.getUserByEmail(user.email)
        .then((res)=> setProfileInfo(res.data))
        // setProfileInfo(dbUser)
    },[dbUser.email])

    function displayKidSuccess(){
            toast.current.show({severity:'success', summary: 'Success!', detail:'Child Added', life: 3000});
            }
        
function handleBtnClick(event) {
    event.preventDefault();
    displayKidSuccess();
    if (kidInfo.kidname && kidInfo.kidage && kidInfo.gender) {
        API.addKidByEmail({
            //GRABBING INFO FROM STATE
            email: user.email,
            push: {child: {
                kidname: kidInfo.kidname,
                kidage: kidInfo.kidage,
                gender: kidInfo.gender
                },
            }})
           
            .then((res) => setKidList(res.data.child))
            // .then(() => showToast)
            // .then(() => window.location.href = "/editprofile")
            .then(setKidInfo({
                kidname: "",
                kidage: '',
                gender: ""
            }))
            .then(console.log(kidList))
            .catch(err => console.log(err));
    }
}


function handleInputChange(event) {
    const { name, value } = event.target
    setKidInfo({ ...kidInfo, [name]: value })
}
///Profile Changes

function saveToDatabase(){
    if (profileInfo.fullname && profileInfo.description) {
        
        API.editUserByEmail({
            //GRABBING INFO FROM STATE
            email: user.email,
            fullname: profileInfo.fullname,
            description: profileInfo.description,
            picture: profileInfo.picture,
            signedUp: true,
            })
            .then(API.getUserByEmail(user.email)
            .then((res)=> setProfileInfo(res.data)))
            // .then(() => window.location.href = "/editprofile")
            .catch(err => console.log(err));
            // window.location.replace('/dashboard')
    }
    props.pullFromDb()
}

function handleProfileBtnClick(event) {
    event.preventDefault();
    displayProfileSuccess()
    console.log(profileInfo.username)
    saveToDatabase();
}

function handleProfileInputChange(event) {
    const { name, value } = event.target
    setProfileInfo({ ...profileInfo, [name]: value })
}

function displayProfileSuccess(){
    toast.current.show({severity:'success', summary: 'Success!', detail:'Profile Saved!', life: 3000});
    }

function imgUpload (event){
    let config = {
        header: {
            Authorization : "Client-ID d5b4e9b98662b1c"
        }
    }
    let data = event.target.value
    const fd = new FormData()
    fd.append("image", event.target.files[0])
    for (var key of fd.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    axios.post("https://api.imgbb.com/1/upload?key=d2fc554ff86b5e358c96965640e8004a", fd)
        .then(res => {
            setProfileInfo({...profileInfo, picture: res.data.data.url})
        })
        .catch(err => console.log(err))
}



    return (
        <div className="container">
        <Toast ref={toast}/>

            <div className="row">
                <div className="col">
                    <Profileform2 handleBtnClick = {handleProfileBtnClick} handleInputChange={handleProfileInputChange} profileInfo={profileInfo} imgUpload = {imgUpload}/>
                </div>
                {/* <div className="col">
                   <CurrentProfileCard user={profileInfo} />
                </div> */}
            </div>
            <div className="row">
                <div className="col">
                    <br />
                        <Kids2 handleChange={handleInputChange} handleBtnClick={handleBtnClick} kidInfo={kidInfo} displaySuccess={displayKidSuccess} handleProfileBtnClick={handleProfileBtnClick}/>
                </div>
                <div id="kid-column" className="col">
                    <div id="kid-card-container">
                        <MiniCardContainer kidList={kidList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Editprofile