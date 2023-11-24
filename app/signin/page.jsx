'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter(); // Create an instance of useRouter

  const signInUser = async (e) => {
    e.preventDefault();
    setIsError(false); // Reset error state on new submission
    const response = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to the home page if sign-in is successful
      router.push("/");
    } else {
      // Set the message and error state based on the response
      setMessage(data.message);
      setIsError(true);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign In to Your Account
      </h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          className="space-y-6 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"
          onSubmit={signInUser}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>

          {/* Display the message */}
          {message && (
            <div
              className={`mt-3 text-center text-sm font-medium ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
