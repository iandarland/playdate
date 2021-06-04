import React from "react";

function ActivityCard(props) {

    let activity = props.activity;
    console.log(activity)
    return (

        <div className="row">
            {props.activity.length ? (
                props.activity.map((data) => (
                    <div id="activity-container" className="activity-container shadow">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <h5>Location: {data.location}</h5>
                            </div>
<<<<<<< HEAD
                            <div className="col-4">
                                <h5>{new Date(data.date).toLocaleDateString()}</h5>
=======
                            <div className="col-12">
                                <h5>{activity.date}</h5>
>>>>>>> f127af4d74c1f97f85018a27565c1c0e4928e53c
                            </div>
                            <div className="col-12">
                                <h5>Host: {data.hostName}</h5>
                            </div>
                            <div className="row justify-content-center">
                                <p style={{ textAlign: "center" }}>{data.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                null
            )}

        </div>
    )
}

export default ActivityCard;