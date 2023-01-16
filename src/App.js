import {useEffect,useState} from 'react';

import axios from 'axios';

import './App.css';



function App() {

   const [name,setName]=useState("");

   const [inc,setInc]=useState(5);

   const [data,setData]=useState([]);

   const [singleData,setSingleData]=useState({});

   const [formData,setFormData]=useState({

    id:"",

    productName:"",

    Price:"",

    Discount:""

   });



   const fetchData = async ()=>{

    const response= await axios.get('http://localhost:3000/posts');

    setData(response.data);

   }



  useEffect(()=>{

   fetchData();

  },[])

 

  const handleChange = e =>{

    setFormData({

     ...formData,

     [e.target.name]:e.target.value



    });

  }

 

  const handleClick = () =>{

     setInc(inc+1);

  }



const getUser = id =>{

  const fetchUser = async ()=>{

    const response= await axios('http://localhost:3000/posts/'+id);

    setSingleData(response.data);

   }

   fetchUser();

  }



  const deleteUser = id =>{

    const deleteUser = async ()=>{

      const response= await axios.delete('http://localhost:3000/posts/'+id);

      fetchData();

     }

     deleteUser();

  }



  const handleSubmit = e =>{

    e.preventDefault();

   // const postData = async ()=>{

    //  const response= await axios.post('http://localhost:3000/posts',formData);

     // fetchData();

    // }

   //  postData();



   const patchData = async ()=>{

    const id= formData.id;

      const response= await axios.patch('http://localhost:3000/posts/'+id,formData);

     fetchData();

     }

     patchData();

  }



  const editUser =user=>{

    setFormData(user);



  }



  return (

    <div className="App">

      <form onSubmit={handleSubmit}>

      <input name="id" value={formData.id} placeholder='id' type="text" onChange={handleChange}/><br/>

      <input name="productName" value={formData.productName} placeholder='productName' type="text" onChange={handleChange}/><br/>

      <input name="Price" value={formData.Price} type="number" placeholder='Price' onChange={handleChange}/><br/>

      <input name="Discount" value={formData.Discount} type="number" placeholder='Discount' onChange={handleChange}/><br/>

      <input type="submit" value="save"/>

      </form>

      {/* <input value={name} onChange={handleChange} /> */}

      {/* <button onClick={handleClick}>{inc}</button> */}

      <ul>

      {

        data.map(user=>(

         // <li key={user.id} onClick={()=>getUser(user.id)}>{user.productName}</li>

         // <li key={user.id} onClick={()=>deleteUser(user.id)}>{user.productName}</li>

          <li key={user.id} onClick={()=>editUser(user)}>{user.productName}</li>

        ))

      }

      </ul>

      <div>

        {

          JSON.stringify(singleData,null,2)

        }

      </div>

     

    </div>

  );

}



export default App;