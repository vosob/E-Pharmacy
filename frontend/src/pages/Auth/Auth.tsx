import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export const Auth = () => {
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
            <form className="flex flex-col gap-3.5 w-[323px] ml-[130px]">
              <Input type="text" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Button className="bg-[#59B17A] mt-5">Log in</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
