import { KeyRound, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import AboutUsPart from "../../components/AboutUsPart/AboutUsPart";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import { authContext } from "../../Context/AuthContextProvider";

// Validation Schema using Zod
const schema = z.object({
  email: z
    .string()
    .min(1, "Email or username is required.")
    .min(3, "Please enter a valid email or username."),
  password: z
    .string()
    .min(1, "Password is required.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character.",
    ),
});

export default function Login() {
  // Initializing States
  const [formError, setFormError] = useState(null);

  // Handling Form Actions And Inputs Using React-Hook-Form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  // Hooks

  // Routing Hook
  const router = useNavigate();

  // Token Authentication Hook
  const { setToken } = useContext(authContext);

  async function sendDataToLogIn(inputValues) {
    // Clear Previous Errors
    setFormError(null);

    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/signin`,
        {
          method: "POST",
          data: inputValues,
        },
      );

      const token = data?.data?.token;

      // Setting Token Value
      setToken(token);
      localStorage.setItem("token", token);

      // Route To Feed Page After Success
      router("/feed");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      setFormError(errorMessage);
    }
  }

  return (
    <>
      <div className="flex min-h-screen w-full justify-center bg-gray-100 px-4 py-12">
        <div className="order-0 flex basis-6xl flex-col items-center justify-between gap-16 lg:order-2 lg:flex-row lg:gap-7">
          <AboutUsPart />

          <div className="right-part h-fit w-[90%] rounded-2xl bg-white p-4 sm:w-md sm:p-6 lg:basis-107.5">
            <div class="mb-4 text-center lg:hidden">
              <h1 class="text-3xl font-extrabold tracking-tight text-[#00298d]">
                Route Posts
              </h1>
              <p class="mt-1 text-base leading-snug font-medium text-slate-700">
                Connect with friends and the world around you on Route Posts.
              </p>
            </div>
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              <NavLink
                to={"/login"}
                className="sign-link rounded-lg py-2 text-center text-sm font-extrabold transition"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="sign-link rounded-lg py-2 text-center text-sm font-extrabold transition"
              >
                Register
              </NavLink>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Log in to Route Posts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Log in and continue your social journey.
            </p>

            <form
              onSubmit={handleSubmit(sendDataToLogIn)}
              className="mt-5 space-y-3.5"
            >
              {/* Email Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <User size={18} />
                  </span>
                  <input
                    {...register("email")}
                    placeholder="Email or username"
                    className={`input-field ${errors?.email && "border-rose-600"}`}
                    type="text"
                  />
                </div>
                <InputErrorMessage message={errors?.email?.message} />
              </div>

              {/* Password Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <KeyRound size={18} />
                  </span>
                  <input
                    {...register("password")}
                    placeholder="Password"
                    className={`input-field ${errors?.password && "border-rose-600"}`}
                    type="password"
                  />
                </div>
                <InputErrorMessage message={errors?.password?.message} />
              </div>

              {!isSubmitting && (
                <button className="w-full cursor-pointer rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b] disabled:opacity-60">
                  Log In
                </button>
              )}
              {isSubmitting && (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b] disabled:opacity-60"
                >
                  Please wait...
                </button>
              )}
              <Link
                to={"/login"}
                className="mx-auto block text-center text-sm font-semibold text-[#00298d] transition hover:underline"
              >
                Forgot password?
              </Link>

              {formError && <FormErrorMessage message={formError} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
