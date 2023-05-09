'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from 'axios';

import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../Button";
import { BASEAPIURL } from "@/config";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    try {
      setIsLoading(true);

      const response = await axios.get(`${BASEAPIURL}/user/me`);

    } catch (error) {
      
    } finally {
      setIsLoading(true);
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
  }, [loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>Pertama kali menggunakan yodi ?
          <span
            onClick={onToggle}
            className="
              text-blue-800
              cursor-pointer 
              hover:underline
            "
          > Download apps</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
