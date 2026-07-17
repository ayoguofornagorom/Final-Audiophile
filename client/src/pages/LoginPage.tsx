import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";

const authIMG =
  "https://res.cloudinary.com/drdr9gib1/image/upload/v1782738722/181_frame_hht6ym.png";
const blackLogo =
  "https://res.cloudinary.com/drdr9gib1/image/upload/v1782738732/black_logo_mb4shd.png";

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    if (success) {
      return navigate(from, { replace: true });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] grid grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-116.75">
          <div className="flex items-center justify-center mb-16">
            <Link to="/">
              <img src={blackLogo} alt="" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-0">
            <h1 className="font-bold text-[28px] tracking-[-3%] uppercase text-black mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-black/50 mb-8 md:text-[18px]">
              Your sound. Your space. Pick up right where you left off.
            </p>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-xs font-bold tracking-[-0.21px] text-black"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 w-full border border-[#CFCFCF] rounded-lg px-6 py-4 transition-colors focus-within:border-[#D87D4A] ">
                  <FiMail className="text-black/30 text-base shrink-0" />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(event) => {
                      return setEmail(event.target.value);
                    }}
                    placeholder="samueliketina@gmail.com"
                    required
                    className="flex-1 text-sm font-bold text-black placeholder:text-black/40 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-xs font-bold tracking-[-0.21px] text-black"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 w-full border border-[#CFCFCF] rounded-lg px-6 py-4 transition-colors focus-within:border-[#D87D4A] ">
                  <FiMail className="text-black/30 text-base shrink-0" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      return setPassword(event.target.value);
                    }}
                    placeholder="Enter your password"
                    required
                    className="flex-1 text-sm font-bold text-black placeholder:text-black/40 outline-none bg-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-black/30 hover:text-[#D87D4A] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-base" />
                    ) : (
                      <FiEye className="text-base" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D87D4A] text-white font-bold text-[13px] uppercase tracking-[1px] hover:bg-[#FBAF87] transition-colors duration-200 cursor-pointer py-4 px-8 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-black/50 mt-6">
              New to the sound?{" "}
              <Link
                to="/register"
                className="text-[#D87D4A] font-bold hover:text-[#FBAF85] transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-sm text-black/50 hover:text-[#D87D4A] transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* ================= */}
      <div className="hidden md:flex justify-end">
        <img src={authIMG} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
