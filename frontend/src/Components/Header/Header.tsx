import { LogOut } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-[#F7F8FA] h-20 w-full pl-5 pr-10 pt-[15px]">
      <div className="flex">
        <img src="/logo.svg" alt="Logo" className="h-10 w-10 mr-5" />
        <div className="flex flex-col pl-10">
          <h1 className="text-2xl font-semibold">Medicine store</h1>
          <p className="text-gray-400">Dashboard | vendor@gmail.com</p>
        </div>
        <LogOut className="ml-auto w-11 h-11 text-white bg-[#59B17A] p-3 rounded-full" />
      </div>
    </header>
  );
};
