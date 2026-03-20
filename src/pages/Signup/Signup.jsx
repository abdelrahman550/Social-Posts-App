import { AtSign, Calendar, KeyRound, User, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import AboutUsPart from "../../components/AboutUsPart/AboutUsPart";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import * as z from "zod";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import InputErrorMessage from "../../components/InputErrorMessage/InputErrorMessage";
import { authContext } from "../../Context/AuthContextProvider";

// Validation Schema using Zod
const schema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required.")
      .min(2, "Name must be at least 2 characters.")
      .max(20, "Name must be at Most 20 characters."),
    username: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[A-Za-z0-9_]{3,30}$/.test(val),
        "Username must be 3-30 chars (a-z, 0-9, _).",
      ),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    gender: z.enum(["male", "female"], "Gender is required."),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required.")
      .refine((val) => {
        const date = new Date(val);
        return date <= new Date();
      }, "Date of birth cannot be in the future."),
    password: z
      .string()
      .min(1, "Password is required.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character.",
      ),
    rePassword: z.string().min(1, "Please confirm your password."),
  })
  .refine(
    (values) => {
      if (values.password === values.rePassword) {
        return true;
      }
      return false;
    },
    {
      message: "Passwords do not match.",
      path: ["rePassword"],
    },
  );

export default function Signup() {
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
      name: "",
      username: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
    },
    mode: "all",
  });

  // Hooks

  // Routing Hook
  const router = useNavigate();

  // Token Authentication Hook
  const { setToken } = useContext(authContext);

  async function sendDataToRegister(inputValues) {
    if (!inputValues.username) {
      inputValues.username = inputValues.name
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
    }

    // Clear Previous Errors
    setFormError(null);

    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
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
      console.log("🚀 ~ sendDataToRegister ~ errorMessage:", errorMessage);
    }
  }
  return (
    <>

      <div className="flex w-full justify-center bg-gray-100 px-4 py-12">
        <div className="order-0 flex basis-6xl flex-col items-center justify-between gap-16 lg:order-2 lg:flex-row lg:gap-7">
          <AboutUsPart />

          <div className="right-part h-fit w-[90%] rounded-2xl bg-white p-4 sm:w-md sm:p-6 lg:basis-107.5">
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
              Create a new account
            </h2>

            <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>

            <form
              onSubmit={handleSubmit(sendDataToRegister)}
              className="mt-5 space-y-3.5"
            >
              {/* Name Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <User size={18} />
                  </span>
                  <input
                    {...register("name")}
                    placeholder="Full name"
                    className={`input-field ${errors?.name && "border-rose-600"}`}
                    type="text"
                  />
                </div>
                <InputErrorMessage message={errors?.name?.message} />
              </div>

              {/* UserName Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <AtSign size={18} />
                  </span>
                  <input
                    {...register("username")}
                    placeholder="Username (optional)"
                    className={`input-field ${errors?.username && "border-rose-600"}`}
                    type="text"
                  />
                </div>
                <InputErrorMessage message={errors?.username?.message} />
              </div>

              {/* Email Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <AtSign size={18} />
                  </span>
                  <input
                    {...register("email")}
                    placeholder="Email address"
                    className={`input-field ${errors?.email && "border-rose-600"}`}
                    type="text"
                  />
                </div>
                <InputErrorMessage message={errors?.email?.message} />
              </div>

              {/* Gender Select */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <Users size={18} />
                  </span>
                  <select
                    {...register("gender")}
                    defaultValue=""
                    className={`input-field ${errors?.gender && "border-rose-600"}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <InputErrorMessage message={errors?.gender?.message} />
              </div>

              {/* Date Of Birth Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <Calendar size={18} />
                  </span>
                  <input
                    {...register("dateOfBirth")}
                    className={`input-field ${errors?.dateOfBirth && "border-rose-600"}`}
                    type="date"
                  />
                </div>
                <InputErrorMessage message={errors?.dateOfBirth?.message} />
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

              {/* Re-Password Input */}
              <div className="mb-3.5">
                <div className="relative">
                  <span className="input-icon">
                    <KeyRound size={18} />
                  </span>
                  <input
                    {...register("rePassword")}
                    placeholder="Confirm password"
                    className={`input-field ${errors?.rePassword && "border-rose-600"}`}
                    type="password"
                  />
                </div>
                <InputErrorMessage message={errors?.rePassword?.message} />
              </div>

              {!isSubmitting && (
                <button className="w-full cursor-pointer rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b] disabled:opacity-60">
                  Create New Account
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

              {formError && <FormErrorMessage message={formError} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
