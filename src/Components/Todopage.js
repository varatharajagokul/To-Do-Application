import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Todopage() {
    const [list, setList] = useState([]);
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            list: '',
        },
        validate: (values) => {
            const errors = {}
            if (!values.list) {
                errors.list = "Required";
            }
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                    await axios.post('http://localhost:8100/createList', values, {
                    headers: {
                        Authorization: window.localStorage.getItem('myapptoken'),
                    },
                });
                fetchAll();
                resetForm({ values: '' });
            } catch (error) {
                alert('Something went wrong');
            }
        },
    });
    async function fetchAll() {
        try {
            let listData = await axios.get('http://localhost:8100/getList', {
                headers: {
                    Authorization: window.localStorage.getItem('myapptoken'),
                },
            });
            setList(listData.data);
        } catch (error) {
            alert('Something went wrong');
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);



    let handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8100/deleteList/${id}`, {
                headers: {
                    Authorization: window.localStorage.getItem('myapptoken'),
                },
            });
            fetchAll();
        } catch (error) {
            alert('Something went wrong');
        }
    };

    let handleLogout = () => {
        window.localStorage.removeItem('myapptoken');
        navigate('/');
    };
     
    return (
        <div className="container-fluid">
        <div className="TodoWrapper">
            <div className="todo-list">
                <form className="list-action" onSubmit={formik.handleSubmit}>
                    <div className="d-flex justify-content-between">
                        <h1 >To-Do List !!</h1>
                        <div className="logout">
                            <button onClick={handleLogout} className="btn btn-danger position-absolute top-0 end-0">
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                        <input type="text" class="todo-input" name="list" value={formik.values.list} onChange={formik.handleChange} placeholder="What is the Task Today?" />
                        <div>
                            <button type="submit" className="todo-btn">Add Task</button>
                        </div>
                    </div>
                    <div className="list-content">
                                {
                                    list.map((lists) => {
                                        return (
                                            <tr>
                                                <td ><input type="checkbox" id="cbox"/> <label for="cbox" className='text-light'>{lists.list}</label></td>
                                                <td>
                                                    <button 
                                                    onClick={() => handleDelete(lists._id)} 
                                                    className="remove-btn" style={{marginLeft:"180%"}}>
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                    </div>
                </form>
            </div>
        </div>

    </div>
)
}
export default Todopage