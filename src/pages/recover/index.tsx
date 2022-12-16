import { NextRouter, useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { SimpleCard } from "../../components/cards/SimpleCard";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import InputEmail from "../../components/input/InputEmail";
import { yupResolver } from "@hookform/resolvers/yup";

import { object, string } from "yup";

export default function index() {
  const router: NextRouter = useRouter();

  const schema = object({
    email: string().required("Campo obrigatório!").email("E-mail inválido"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSendRecoveryEmail = (data: any) => {
    // await signIn(data);
  };

  const handleCancel = () => {
    router.push("login");
  };

  return (
    <div
      className="bg-cover min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_WEB_URL}/foto3.png)`,
      }}
    >
      <div className="flex justify-center transition-all w-full animate-fade">
        <SimpleCard title="Recuperar senha">
          <form
            className="py-4 space-y-4"
            onSubmit={handleSubmit(handleSendRecoveryEmail)}
          >
            <div>
              <InputEmail
                id={"email"}
                register={register("email")}
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
                errorMessage={errors?.email?.message}
              />
            </div>

            <div className="flex space-x-3 py-2 items-center justify-center">
              <ButtonSolid
                id={"save"}
                label={"Enviar"}
                color={"success"}
                type={"submit"}
              />
              <ButtonSolid
                id={"cancel"}
                label={"Cancelar"}
                color={"default"}
                onClick={() => {
                  handleCancel();
                }}
              />
            </div>
          </form>
        </SimpleCard>
      </div>
    </div>
  );
}
