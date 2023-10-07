import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
const Home = () => {
	const url = "http://localhost:3001/api/v1/tasks";
	const [task, setTask] = useState("");
	const [error, setError] = useState("");
	const [allItems, setAllItems] = useState([]);
	const [isChecked, setIsChecked] = useState(false);

	// Check box
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked); // Toggle the checkbox state when it's clicked
	};

	// input form
	const changeHandeler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(url, {
				name: task,
				completed: isChecked,
			});
			setTask("");
		} catch (error) {
			setError(error.response.data.msg.errors.name.message);
			// toast.success("error.response.data.msg.errors.name.message");
		}
	};
	//  get all items from the dataBase using axios
	const getAllItems = async () => {
		const res = await axios.get("http://localhost:3001/api/v1/tasks");
		// console.log(res.data.task);
		setAllItems(res.data.task);
	};
	useEffect(() => {
		getAllItems();
	}, [changeHandeler]);
	// delete single itmes from  from the table
	const removeItemHandler = async (_id) => {
		await axios.delete(`http://localhost:3001/api/v1/tasks/${_id}`);
	};
	// Edit single itmes from  from the table using axios
	const editItemHandler = async ({ _id }) => {
		await axios.patch(`http://localhost:3001/api/v1/tasks/${_id}`);
	};
	return (
		<>
			<div className=" mx-auto max-w-2xl px-12 py-28 mt-32 join bg-white rounded-md shadow-md">
				<form onSubmit={changeHandeler}>
					<h1 className="mx-auto mb-4 text-center text-red-400">
						{error ? error + "😡" : ""}
					</h1>
					<h2 className="mx-auto  mb-4 text-center text-slate-500  tracking-wider text-2xl">
						Task Manager
					</h2>
					<input
						className="ml-3 sm:w-64 md:w-9/12 rounded-l-md w-44 input input-bordered join-item px-4 py-4 bg-slate-100 "
						placeholder="eg.Reading MongoDb"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<button
						className=" btn join-item rounded-r-md bg-purple-500 px-4 py-4 w-24"
						type="submit"
					>
						Submit
					</button>
				</form>
				{allItems.map((item) => {
					const { _id, name } = item;
					return (
						<form onSubmit={() => removeItemHandler(_id)}>
							<div className="mt-7 flex justify-between">
								<div className="flex flex-row gap-4" key={_id}>
									<input
										type="checkbox"
										onChange={handleCheckboxChange}
										checked={isChecked}
									/>
									<h1 className="text-lg tracking-wide">{name}</h1>
								</div>
								<div className="flex flex-row gap-4 text-center text-lg ">
									<FiEdit />
									<button
										className="text-sm bg-black text-white px-1 py-1 rounded-md"
										type="submit"
									>
										delete
									</button>
								</div>
							</div>
						</form>
					);
				})}
			</div>
		</>
	);
};

export default Home;
