import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"


function Register() {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {}
            if (!values.name) {
                errors.name = "Required";
            }
            if (!values.email) {
                errors.email = "Email Missing";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Password  missing";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                let signupData = await axios.post('http://localhost:8100/signup', values);
                if (signupData.data.message === "user added sucessfully") {
                    toast.success("Successfully Registered ")
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    toast.error("Email exists")
                }

            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            }
        },
    })
    return (
        <div className="TodoWrapper mt-5">
            <div className="row">
                <div className="col login">
                    <div className="mt-5">
                        <h1 className="text-center login-head">Register</h1>
                    </div>
                    <div className="mt-5 login-border">
                        <form className="m-6" onSubmit={formik.handleSubmit}>
                            <div class="row-1 login-details">
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                                    <input type="text" class="form-control" name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                                    <input type="email" class="form-control" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
                                </div>
                                <div class="col mt-4">
                                    <span style={{ color: "red" }}>{formik.errors.password}</span>
                                    <input type="password" class="form-control" name="password" placeholder="Create Password" onChange={formik.handleChange} value={formik.values.password} />
                                </div>
                                <div class="col mt-4">
                                    <input type="submit" class="form-control btn btn-success" value={"Create Account"} />
                                </div>
                            </div>
                            <div class="col mt-4 mb-2">
                                    <p className="text-center text-white">------I Already have an Account------</p>
                                    <Link to={'/'}>
                                        <input type="submit" class="form-control btn btn-warning" value={"login"} />
                                    </Link>
                                </div>
                            
                        </form>
                    </div>
                    <div className="mt-5 text-white text-center created">
                        Simple Todo Created by <span className="bg-danger by"> Gokul </span>
                    </div>

                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default Register