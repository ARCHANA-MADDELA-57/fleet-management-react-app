import React from "react";

const FleetCard = React.memo(({vehicle, onUpdateDriver, onChangeStatus, onDelete})=>{
    console.log(`Rendering Card: ${vehicle.regNo}`);
    return(
        <div style={{border:'1px solid #ccc',padding:'10px',margin:'10px',borderRadius:'8px'}}>
            <img src="https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg" alt="vehicle" style={{width:'100%'}}/>
            <h3>{vehicle.category}</h3>
            <p>Reg No: {vehicle.regNo}</p>
            <p>Category:{vehicle.category}</p>
            <p>Driver: {vehicle.driverName}</p>
            <p>Status: {vehicle.status}</p>
            <button onClick={()=>onUpdateDriver(vehicle.id)}>Update Driver</button>
            <button onClick={()=>onChangeStatus(vehicle.id)}>Toggle Status</button>
            <button onClick={()=>onDelete(vehicle.id)} style={{color:'red'}}>Delete</button>
        </div>
    );
});
 export default FleetCard;