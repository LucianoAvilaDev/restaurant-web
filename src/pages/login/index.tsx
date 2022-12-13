import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import InputEmail from "../../components/input/InputEmail";
import InputPassword from "../../components/input/InputPassword";
import { Switch } from "../../components/input/Switch";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { SimpleCard } from "../../components/cards/SimpleCard";
import { Link } from "../../components/input/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

export default function index() {
  const { signIn } = useContext(AuthContext);

  const schema = object({
    email: string().required("Campo obrigatório!").email("E-mail inválido"),
    password: string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function handleSignIn(data: any) {
    await signIn(data);
  }

  return (
    <div
      className="bg-cover min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_WEB_URL}/foto3.png)`,
      }}
    >
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center transition-all w-full animate-fade">
        <SimpleCard title="Realizar Login">
          <form
            className="pt-6 pb-2 space-y-4"
            onSubmit={handleSubmit(handleSignIn)}
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
            <div>
              <InputPassword
                id={"password"}
                register={register("password")}
                name={"password"}
                placeholder={"Digite a senha"}
                label={"Senha"}
                errorMessage={errors?.password?.message}
              />
            </div>

            <div className="flex flex-col space-y-4 py-3 items-center justify-center">
              <ButtonSolid
                id={"save"}
                label={"Entrar"}
                color={"success"}
                type={"submit"}
              />
              <Link url="recover" text="Esqueceu sua senha?" />
            </div>
          </form>
        </SimpleCard>
      </div>
    </div>
  );
}
