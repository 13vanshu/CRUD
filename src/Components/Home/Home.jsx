import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Home = () => {

    const BASE_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:2000"
            : "https://crud-backend-eight-beta.vercel.app";

    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: ""
    });
    const [bookList, setBookList] = useState([])
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setBookForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.Author || !bookForm.SellingPrice) {
                return toast.error("All Fields Required");
            }

            const url = isUpdating
                ? `${BASE_URL}/books/booklists/${updateId}`
                : `${BASE_URL}/books/addbook`;

            const method = isUpdating ? "PUT" : "POST";

            console.log("Sending to backend ", bookForm);

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookForm)
            });

            const data = await res.json()
            console.log("BACKEND RESPONSE:- ", data);

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            setBookForm({
                BookName: "",
                BookTitle: "",
                Author: "",
                SellingPrice: "",
                PublishDate: ""
            });

            setIsUpdating(false);
            setUpdateId(null);

            fetchBooks();
        } catch (error) {
            toast.error("Server Error");
            console.log("Error", error);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${BASE_URL}/books/booklists`);
            const data = await res.json();
            console.log("Fetched Books 👉", data);
            setBookList(data.BookList)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/books/booklists/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                fetchBooks();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Server not responding");
        }
    };

    const handleUpdate = async (data) => {
        setBookForm({
            BookName: data?.BookName,
            BookTitle: data?.BookTitle,
            Author: data?.Author,
            SellingPrice: data?.SellingPrice,
            PublishDate: data?.PublishDate,
        })
        setUpdateId(data._id);
        setIsUpdating(true);
        toast.info("Edit mode enabled. Now click Submit to update.");
    }

    const handleClear = () => {
        setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: ""
        });

        setIsUpdating(false);
    };

    useEffect(() => {
        fetchBooks();
    }, [])
    return (
        <section className='w-full px-4 sm:px-6 md:px-8 min-h-[calc(100vh-60px)]'>

            {/* FORM */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 my-8'>
                {formFields.map((field, index) => (
                    <div key={index} className='w-full flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={bookForm[field.name]}
                            onChange={handleFormChange}
                            className='w-full border border-gray-300 rounded-sm outline-none h-9 px-2 text-gray-800 text-sm focus:ring-2 focus:ring-gray-400'
                        />
                    </div>
                ))}
            </div>

            {/* BUTTONS */}
            <div className='w-full flex flex-col sm:flex-row justify-end gap-2'>
                <button
                    onClick={handleSubmit}
                    className='bg-gray-700 hover:bg-gray-800 text-white h-9 px-4 rounded-md cursor-pointer text-sm sm:text-base transition'>
                    Submit
                </button>
                <button
                    onClick={handleClear}
                    className='bg-gray-700 hover:bg-gray-800 text-white h-9 px-4 rounded-md cursor-pointer text-sm sm:text-base transition'>
                    Clear
                </button>
            </div>

            {/* TABLE */}
            <div className="w-full mt-10 overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">

                    {/* TABLE HEADER */}
                    <thead className="bg-gray-800 text-white hidden md:table-header-group">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">BOOK NAME</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">BOOK TITLE</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">AUTHOR</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">SELLING PRICE</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">PUBLISH DATE</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">ACTION</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">

                        {bookList.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400 text-lg">
                                    No Books Available
                                </td>
                            </tr>
                        ) : (
                            bookList.map((book) => (
                                <tr
                                    key={book._id}
                                    className="block md:table-row border md:border-0 rounded-lg md:rounded-none mb-4 md:mb-0 shadow md:shadow-none p-4 md:p-0 bg-white md:bg-transparent hover:bg-gray-100 transition"
                                >

                                    {/* BOOK NAME */}
                                    <td className="block md:table-cell px-4 py-2 md:py-4 font-medium text-gray-800 text-sm before:content-['Book_Name:'] before:font-semibold before:block md:before:hidden">
                                        {book.BookName}
                                    </td>

                                    {/* BOOK TITLE */}
                                    <td className="block md:table-cell px-4 py-2 md:py-4 text-gray-600 text-sm before:content-['Book_Title:'] before:font-semibold before:block md:before:hidden">
                                        {book.BookTitle}
                                    </td>

                                    {/* AUTHOR */}
                                    <td className="block md:table-cell px-4 py-2 md:py-4 text-gray-700 text-sm before:content-['Author:'] before:font-semibold before:block md:before:hidden">
                                        {book.Author}
                                    </td>

                                    {/* PRICE */}
                                    <td className="block md:table-cell px-4 py-2 md:py-4 text-green-600 font-semibold text-sm before:content-['Price:'] before:font-semibold before:block md:before:hidden">
                                        ₹ {book.SellingPrice}
                                    </td>

                                    {/* PUBLISH DATE */}
                                    <td className="block md:table-cell px-4 py-2 md:py-4 text-gray-500 text-sm before:content-['Publish_Date:'] before:font-semibold before:block md:before:hidden">
                                        {book.PublishDate}
                                    </td>

                                    {/* ACTION */}
                                    <td className="block md:table-cell px-4 py-3 md:py-4 text-center before:content-['Action:'] before:font-semibold before:block md:before:hidden">
                                        <div className="flex items-center justify-center gap-3 mt-2 md:mt-0">
                                            <button
                                                onClick={() => handleUpdate(book)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-sm transition cursor-pointer">
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-sm transition cursor-pointer">
                                                <MdDelete size={16} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Home

export const formFields = [
    { label: "Book Name", name: "BookName", type: "text", placeholder: "Book Name" },
    { label: "Book Title", name: "BookTitle", type: "text", placeholder: "Book Title" },
    { label: "Author", name: "Author", type: "text", placeholder: "Author Name" },
    { label: "Selling Price", name: "SellingPrice", type: "text", placeholder: "Selling Price" },
    { label: "Publish Date", name: "PublishDate", type: "date", placeholder: "" }
];