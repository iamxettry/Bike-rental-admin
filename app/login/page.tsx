import { loginImage, SignUpBg } from "@/assets";
import Image from "next/image";
import React from "react";
import Layout from "@/components/Layout";
import LoginPorvider from "@/Auth/Components/LoginPorvider";

const LoginPage = async () => {
  return (
    <div className="relative h-screen ">
      <div className=" h-screen w-full overflow-hidden">
        <Image src={SignUpBg} className="  w-full h-full object-cover" alt="" />
      </div>
      <div className=" w-full h-full absolute top-0">
        <Layout className={"h-full"}>
          {/* Register */}
          <div className="flex justify-center items-center h-full ">
            <div className="flex gap-4  w-fit md:max-w-3xl  mx-auto h-96   bg-pink-100 p-6 rounded-xl">
              <div className="flex-1 hidden md:flex   justify-center items-center border-r-2 border-orange-500">
                <Image
                  src={loginImage}
                  className="  w-full h-full object-cover mr-4"
                  alt=""
                />
              </div>
              <div className="flex-1  flex flex-col justify-center ">
                <p className="text-center text-gray-800 text-2xl font-semibold">
                  Login to your account
                </p>
                <LoginPorvider />
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default LoginPage;
