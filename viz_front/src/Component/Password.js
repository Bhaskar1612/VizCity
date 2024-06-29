import axios from "axios";
import { useState } from "react"
import './Password.css'

const Password = ({setCreatedMember}) => {
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    const handlePassword = async () => {
         try {
            await axios.post(`http://localhost:8000/Member_Password?username=${name}&pwd=${password}`);
            console.log("Password_created");
            setCreatedMember(null);
         } catch(error){
            console.error("error crrating password",error.reponse);
         }
    }   
    return (
      <div className="password-form-container">
      <h2>Create Password</h2>
      <div className="input-container">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handlePassword}>Create Password</button>
    </div>
    )

}

export default Password;