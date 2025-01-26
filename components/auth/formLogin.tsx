"use client";
import React, { useEffect, useState } from "react";
import { Card, Spacer, Button, Input, Image } from "@nextui-org/react";
import axios from "axios";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //   const handleLogin = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/api/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();

  //         console.log(data.token);
  //         // simpan ke localStorage
  //         localStorage.setItem("token", data.token);

  //         console.log("Login successful", data);

  //         window.location.href = "/";
  //       } else {
  //         try {
  //           const errorData = await response.json();
  //           console.error("Login error", errorData);
  //         } catch (error) {
  //           const errorText = await response.text();
  //           console.error("Login error", response.statusText, errorText);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Login error", (error as Error).message);
  //     }
  //   };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        // simpan ke localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");
        console.log("Login successful", response);
        window.location.href = "/";
      } else {
        console.log("email atau password salah palenggg");
      }
    } catch (error) {
      // if(error.response){
      //     console.log(error.response.data);
      // }
      console.log("Error ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
      <div className="w-[700px] bg-white shadow-2xl flex flex-wrap rounded overflow-hidden">
        <div className="w-[320px] bg-blue-600">
          <Image
            width={320}
            height={320}
            src="/img/image-login.jpg"
            alt="ini image"
            className="rounded-none"
          />
        </div>
        <div className="flex flex-col items-center w-[370px] p-5">
          <h1 className=" text-center text-blue-600 font-bold text-3xl mb-5 w-full">
            Login
          </h1>
          <Input
            label="email"
            name="email"
            variant="bordered"
            size="sm"
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Spacer y={3} />
          <Input
            type="password"
            label="password"
            name="password"
            variant="bordered"
            size="sm"
            color="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={10} />
          <Button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white rounded"
          >
            Login
          </Button>
        </div>
      </div>
    </div>

    // <div className="bg-blue-600 h-screen">
    //   <div className="flex items-center justify-center min-h-full">
    //     <div className="p-7 bg-white w-96 rounded-md">
    //       <h1 className="text-3xl font-bold text-center mb-5">LOGIN</h1>
    //       <Input
    //         label="email"
    //         name="email"
    //         variant="bordered"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       <Spacer y={3} />
    //       <Input
    //         label="Password"
    //         name="password"
    //         type="password"
    //         variant="bordered"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <Spacer y={10} />
    //       <Button
    //         onClick={handleLogin}
    //         className="w-full bg-blue-500 text-white "
    //       >
    //         Sign in
    //       </Button>
    //       {/* <a href="" className="text-center">
    //       You Not Acount ?
    //     </a> */}
    //     </div>
    //   </div>
    // </div>
  );
}
