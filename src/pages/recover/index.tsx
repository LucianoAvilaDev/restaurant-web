import { yupResolver } from "@hookform/resolvers/yup";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { SimpleCard } from "../../components/cards/SimpleCard";
import InputEmail from "../../components/input/InputEmail";

import { object, string } from "yup";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import Loader from "../../components/loader/Loader";
import { api } from "../../services/api";

export default function Index() {
  const router: NextRouter = useRouter();

  const schema = object({
    email: string().required("Campo obrigatório!").email("E-mail inválido"),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSendRecoveryEmail = (data: any) => {
    api.post("recovery", data).then(() => {
      SuccessAlert("E-mail enviado com sucesso!");
      setIsLoading(false);
      router.push("../login");
      return;
    });
  };

  const handleCancel = () => {
    router.push("../login");
  };

  return (
    <>
      {isLoading && <Loader />}

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
    </>
  );
}
