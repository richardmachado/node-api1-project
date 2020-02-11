

import React from "react";
import {  useForm} from "react-hook-form";
import axios from 'axios'

import {  Login, 
          Container, 
          Button, 
         
          Body, 
          Formgroup, 
          Styledform, 
          Labels, 
          Inputs  
} from "./Styles"




export default function LoginForm(props) {
    const { register, handleSubmit, errors } = useForm();
  
  
    const onSubmit = data => {
     
  axios.post("http://localhost:5000/api/users", data)
  
        .then(res => {
          
          props.history.push("/");
        })
        .catch(err => {
          alert((err.message = "Request failed"));
          console.log(err.response);
        });
    };
  
  
  return (
    <Container>
      <Login>Add a User</Login>
   
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styledform>
          <Formgroup>
  
 
            <Labels htmlFor='username'>
              Name
              <Inputs
                type='text'
                name='name'
                placeholder='name'
                ref={register({ required: true, minLength: 1, maxLength: 15 })}
              />
            </Labels>
            {errors.name && errors.name.type === "required" && (
              <span>Please enter your name</span>
            )}
            {errors.name && errors.name.type === "minLength" && (
              <span>name is too short</span>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <span>name is too long</span>
            )}
  
  
    
            <Labels htmlFor='bio'>
              
              Bio
            </Labels>
            <Inputs
              type="text"
              placeholder="bio"
              name="bio"
              ref={register({ required: true, minLength: 5 })}
            />
  
            {errors.password && errors.password.type === "required" && (
              <span>Password is required</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span>Password is too short - 5 characters</span>
            )}
      
          </Formgroup>
  
          <div className="footer">
            <Button>Submit</Button>
          </div>
  
        </Styledform>
      </form>
    </Container>
  );
  }