import { useState, useCallback } from "react";
import FleetCard from "./FleetCard";

const AdminDashboard = () =>{
    const [fleet, setFleet] = useState([]);
    const [form, setForm] = useState({regNo:'',category:'Car',driverName:'',status:'Available'});

    const addFleet = (e) =>{
        e.preventDefault();
        if(!form.regNo || !form.driverName)
            return alert ("Fields cannot be empty");
        setFleet([...fleet,{...form,id:Date.now()}]);
        setForm({regNo:'',category:'Car',driverName:'',status:'Available'});
    };

    const UpdateDriver = useCallback((id)=>{
        const newName = prompt("Enter new driver name:");
        if (newName && newName.trim()!==""){
            setFleet(prev=>prev.map(v=>v.id===id?{...v,driverName:newName}:v));
        };
    },[]);

    const toggleStatus = useCallback((id)=>{
        setFleet(prev=>prev.map(v=>v.id===id?{...v, status:v.status==='Available'?'Unavailable':'Available'}:v));
    },[]);

    const deleteVehicle = useCallback((id)=>{
        if(window.confirm("Are you sure?")){
            setFleet(prev=>prev.filter(v=>v.id!==id));
        }
    },[]);

    return(
        <div style={{display:'flex'}}>
            {/*Sidebar:Form*/}
            <div style={{width:'250px',padding:'20px',borderRight:'1px solid #ddd'}}>
                <h3>Add Fleet</h3>
                <form onSubmit={addFleet}>
                    <input type="text" placeholder="Reg No" value={form.regNo} onChange={e=>setForm({...form, regNo:e.target.value})}/>
                    <br/>
                    <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                        <option>Auto</option>
                        <option>Car</option>
                        <option>Truck</option>
                        <option>Bus</option>
                    </select><br/>
                    <input type="text" placeholder="Driver Name" value={form.driverName} onChange={e=>setForm({...form,driverName:e.target.value})}/><br/>
                    <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                        <option>Available</option>
                        <option>Unavailable</option>
                    </select><br/>
                    <button type="submit">Add Fleet</button>
                </form>
            </div>
            {/* Main Content: Fleet Cards */}
            <div style={{flex:1, padding:'20px'}}>
                <h2>Fleet Cards</h2>
                <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap:'10px'}}>
                    {fleet.map(vehicle=>(
                        <FleetCard key={vehicle.id} 
                        vehicle={vehicle}
                        onUpdateDriver={UpdateDriver}
                        onChangeStatus={toggleStatus}
                        onDelete={deleteVehicle}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;