import React, {useContext} from "react";
import UserContext from "../../utils/userContext"
import './Currentprofilecard.css'

function Dynamicprofile() {

    const {dbUser}=useContext(UserContext);
    
    return(
        <div className="card mb-3 dynamic-profile-card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Full Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
          {dbUser.fullname}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.email}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">City</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.city}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">State</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.unitedState}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Zipcode</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.zip}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Bio</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.description}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Address</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {dbUser.address}
            </div>
          </div>
          <hr/>
        </div>
      </div>
    )

}


export default Dynamicprofile;