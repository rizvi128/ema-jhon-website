import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log('form submitted',data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (

        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.name && <span className="error">Name is required</span>}
            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.email && <span className="error">Email is required</span>}
            <input {...register("Address", { required: true })} />
            {errors.Address && <span className="error">Address is required</span>}

            <input type="submit" />
        </form>

    );
};

export default Shipment;