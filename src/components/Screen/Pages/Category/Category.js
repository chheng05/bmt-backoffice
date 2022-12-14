import React, { useEffect, useState, Fragment } from "react";
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Column from "antd/es/table/Column";
import Loading from "../Loading";
import axios from "axios";
import { FiPlus, FiSave } from "react-icons/fi";

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const Category = (props) => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openModalCategory, setOpenModal] = useState(false);
    const [openModalUpdate, setUpdateModal] = useState(false);
    const [cat, setCategoryName] = useState('');
    const [form] = Form.useForm();
    const loadCateogry = async () => {
        try {
            setLoading(true)
            const respone = await fetch(`https://api.escuelajs.co/api/v1/categories`);
            const data = await respone.json();
            setCategory(data)
            console.log(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const handleDeleteCategory = async (record) => {
        let categoryId = record.id;
        console.log(categoryId)
        setLoading(true);
        await axios.delete(`https://api.escuelajs.co/api/v1/categories/${categoryId}`)
            .then(() => {
                setLoading(false);
            }, [])

    }

    const onClickShowModal = () => {
        setOpenModal(true);
    }

    const handleCancelModalCategory = () => {
        setOpenModal(false);
    }

    const updateModalCategory = () => {
        setUpdateModal(true);
    }

    const handleCancelUpdateModal = () => {
        setUpdateModal(false);
    }

    useEffect(() => {
        loadCateogry();
    }, [])

    if (loading) {
        return <Loading />
    }
    const { match } = props;
    return (

        <>
            <Fragment>
                <div className="w-full h-full">
                    <div className="my-4 flex bg-white p-4 ">
                        <div className="flex w-1/2 justify-start items-center">
                            <h2 className="text-sm md:text-xl font-bold">Categories Lists</h2>
                        </div>
                        <div className="md:flex w-1/2 justify-end items-center hidden">
                            {/* <Link to={`${match.path}/create`}> */}
                            <Button type="primary" size="large" onClick={onClickShowModal}>
                                <div className="flex items-center justify-center">
                                    <Space>
                                        <FiPlus className="text-xl"/> Create Category
                                    </Space>
                                </div>
                            </Button>

                            {/* </Link> */}
                        </div>
                        <div className="flex w-1/2 justify-end items-center md:hidden">
                            {/* <Link to={`${match.path}/create`}> */}
                            <Button type="primary" size="small" onClick={onClickShowModal}>
                                <div className="flex items-center justify-center">
                                    <Space>
                                        <FiPlus /> 
                                    </Space>
                                </div>
                            </Button>

                            {/* </Link> */}
                        </div>
                    </div>

                    <Table className="shadow-sm rounded-lg" bordered size={"small"} dataSource={category} onChange={onChange} pagination={6} scroll={{ x: 800 }}>
                        <Column
                            title="Category name"
                            dataIndex="name"
                            key="1"
                            render={(name) => (
                                <>
                                    <span className="bg-gray-400 px-3 rounded-lg text-white py-1">{name}</span>
                                </>
                            )}
                        />
                        <Column
                            title="Slug"
                            dataIndex="name"
                            key="2"
                        />
                        <Column
                            title="Image"
                            dataIndex="image"
                            key="3"
                            width={200}
                            render={(image) => (
                                <>
                                    <img src={image} className="w-16 rounded-lg" />
                                </>
                            )}
                        />
                        <Column
                            title="Action"
                            key="4"
                            width={200}
                            render={(text, record) => (
                                <>
                                    <Space>
                                        <div className="inline-flex items-center rounded-md">
                                            {/* <Link to={`${match.path}/${record.id}/edit`}> */}
                                            <button onClick={updateModalCategory} className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                </span>
                                            </button>
                                            {/* </Link> */}

                                            <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <button onClick={() => handleDeleteCategory(record)} className=" text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </Space>
                                </>
                            )}
                        />
                    </Table>



                </div>
            </Fragment>

            {/* Add Modal Category */}
            <Modal
                title="Add Category"
                open={openModalCategory}
                // onOk={handleOkModalCateogry}
                onCancel={handleCancelModalCategory}
                // width={'50%'}
                footer={[
                    <Button key="back" onClick={handleCancelModalCategory}>
                        Cancel
                    </Button>,
                    <Button type="primary" htmlType="submit">
                        <div className="flex">
                            <Space>
                                <FiSave /> Save & Continue
                            </Space>
                        </div>
                    </Button>
                ]}
            >
                <div>
                    <Form
                        name="Category"
                        layout="vertical"
                        autoComplete="off"
                    >
                        {/* <h1 className="text-xl font-semibold mb-4">Category Info</h1> */}
                        <div>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your category!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Sub-category"
                                name="sub-category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sub-category!',
                                    },
                                ]}
                            >
                                <Select
                                    size={'large'}
                                    defaultValue="Music"
                                    // onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Slug"
                                name="slug"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your slug!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        {/* <div className="mt-3 mb-1 flex justify-end items-center">
                            <Button type="primary" htmlType="submit">
                                <div className="flex">
                                    <Space>
                                        <FiSave /> Save & Continue
                                    </Space>
                                </div>
                            </Button>

                        </div> */}
                    </Form>
                </div>
            </Modal>

            {/* Update Modal Category  */}
            <Modal
                title="Update Category"
                open={openModalUpdate}
                // onOk={handleOkModalCateogry}
                onCancel={handleCancelUpdateModal}
                // width={'50%'}
                footer={[
                    <Button key="back" onClick={handleCancelUpdateModal}>
                        Cancel
                    </Button>,
                    <Button type="primary" htmlType="submit">
                        <div className="flex">
                            <Space>
                                <FiSave /> Update & Continue
                            </Space>
                        </div>
                    </Button>
                ]}
            >
                <div>
                    <Form
                        name="Category"
                        form={form}
                        layout="vertical"

                    >
                        {/* <h1 className="text-xl font-semibold mb-4">Category Info</h1> */}
                        <div>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your category!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Sub-category"
                                name="sub-category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sub-category!',
                                    },
                                ]}
                            >
                                <Select
                                    size={'large'}
                                    defaultValue="Music"
                                    // onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Slug"
                                name="slug"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your slug!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default withRouter(Category);