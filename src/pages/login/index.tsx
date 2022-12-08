import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import InputEmail from "../../components/input/InputEmail";
import { truncate } from "fs";
import InputPassword from "../../components/input/InputPassword";
import { IoRestaurantSharp } from "react-icons/io5";
import { Switch } from "../../components/input/Switch";
import { Button } from "../../components/input/Button";

export default function index() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    console.log(data);
    // await signIn(data);
  }

  return (
    <div
      className="bg-cover min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_WEB_URL}/foto.jpg)`,
      }}
    >
      <Head>
        <title>Login</title>
      </Head>

      <div className="max-w-sm w-full  space-y-8">
        <div className={`flex flex-col items-center justify-center`}>
          <div>
            <img
              className={`w-20 sm:w-32 shadow-lg rounded-full`}
              src="/logo.png"
              alt=""
            />
            {/* <IoRestaurantSharp size={50} /> */}
          </div>
          <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
            Realizar Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-2">
            <div>
              <InputEmail
                id={"email"}
                register={register("email")}
                name={"email"}
                label={"E-mail"}
                placeholder={"Digite seu e-mail"}
                required
              />
            </div>
            <div>
              <InputPassword
                id={"password"}
                register={register("password")}
                name={"password"}
                placeholder={"Digite a senha"}
                label={"Senha"}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Switch
                id={"remember"}
                name={"remember"}
                label={"Lembrar-me"}
                register={register("remember")}
              />
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              id={"save"}
              label={"Entrar"}
              color={"info"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
