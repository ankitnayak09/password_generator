import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
	const [length, setLength] = useState(8);
	const [isNumberAllowed, setIsNumberAllowed] = useState(false);
	const [isCharAllowed, setIsCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordRef = useRef(null);

	const passwordGenerator = useCallback(
		function () {
			let pass = "";
			let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

			if (isNumberAllowed) str += "0123456789";
			if (isCharAllowed) str += "!@#$%^&*-_+=[]{}~`";

			for (let i = 1; i <= length; i++) {
				let char = Math.floor(Math.random() * str.length + 1);
				pass += str.charAt(char);
			}

			setPassword(pass);
		},
		[length, isNumberAllowed, isCharAllowed]
	);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		// passwordRef.current?.setSelectionRange(0, 999);
		window.navigator.clipboard.writeText(password);
		toast.success("Password Copied to Clipboard");
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);
	return (
		<>
			<Toaster />
			<h1 className="text-4xl my-4">Password Generator</h1>
			<div className="flex shadow rounded-lg overflow-hidden mb-4">
				<input
					type="text"
					value={password}
					className="outline-none w-full py-1 px-3 text-black"
					placeholder="Password"
					readOnly
					ref={passwordRef}
				/>
				<button
					onClick={copyPasswordToClipboard}
					className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600"
				>
					Copy
				</button>
			</div>
			<div className="flex text-sm gap-x-2">
				<div className="flex items-center gap-x-1">
					<input
						type="range"
						min={6}
						max={100}
						value={length}
						className="cursor-pointer"
						onChange={(e) => {
							setLength(e.target.value);
						}}
						id="length"
					/>
					<label htmlFor="length">Length: {length}</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={isNumberAllowed}
						id="numberInput"
						onChange={() => {
							setIsNumberAllowed((prev) => !prev);
						}}
					/>
					<label htmlFor="numberInput">Numbers</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						defaultChecked={isCharAllowed}
						id="charInput"
						onChange={() => {
							setIsCharAllowed((prev) => !prev);
						}}
					/>
					<label htmlFor="charInput">Characters</label>
				</div>
			</div>
			<footer className="absolute bottom-2 flex items-center gap-2">
				Developed By:{" "}
				<a
					href="https://www.linkedin.com/in/ankitnayak09/"
					target="_blank"
					className="text-lg hover:text-gray-400"
					rel="noreferrer"
				>
					Ankit Kumar Nayak
				</a>
			</footer>
		</>
	);
}

export default App;
