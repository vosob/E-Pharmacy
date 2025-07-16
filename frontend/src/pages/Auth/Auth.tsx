import { loginUser, registerUser } from "@/api/auth";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

export const Auth = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isLogin) {
        const response = await loginUser(data);
        login(response.token);
        navigate("/");
      } else {
        await registerUser(data);
      }
      reset();
    } catch (error) {
      console.error(isLogin ? "Login failed" : "Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-6 pt-7">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10 mr-5" />
          <h1 className="text-2xl font-semibold">E-Pharmacy</h1>
        </div>

        <div className="flex mt-[226px]">
          {/* left side */}
          <div className="relative w-[614px] h-[240px] leading-[1.1] font-semibold">
            <h1 className="text-[54px]">
              Your medication, delivered Say goodbye to all
              <span className="text-[#59B17A]"> your healthcare </span>
              worries with us
            </h1>
            <img
              className="absolute top-1/3 left-8/12 -translate-y-full"
              src="/tablet.png"
              alt=""
            />
          </div>

          {/* right side */}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3.5 w-[323px] ml-[130px]"
            >
              <Input
                {...register("email", { required: "Email is required" })}
                type="text"
                placeholder="Email address"
              />
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
              />
              <Button
                type="submit"
                className="bg-[#59B17A] mt-5 cursor-pointer"
              >
                {isLogin ? "Увійти" : "Зареєструватися"}
              </Button>

              {/* Toggle between login and register */}
              <div className="text-center mt-4">
                <span className="text-gray-600">
                  {isLogin ? "Немає акаунту? " : "Уже маєте акаунт? "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#59B17A] font-medium hover:underline cursor-pointer"
                >
                  {isLogin ? "Зареєструватися" : "Увійти"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
