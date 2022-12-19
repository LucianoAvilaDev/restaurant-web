import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { OrderItemsSchema } from "../../../schemas/OrderItemsSchema";
import { OrdersSchema } from "../../../schemas/OrdersSchema";
import { api } from "../../../services/api";
import { SanitizeCpf } from "../../../utils/SanitizeCpf";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputText from "../../input/InputText";
import InputTextMasked from "../../input/InputTextMasked";
import Loader from "../../loader/Loader";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
};

export const FormOrderItems = ({ id, handleClear, setModal }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderType, setOrderItem] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(OrderItemsSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`orders/${id}`, { ...data, cpf: SanitizeCpf(data.cpf) })
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch((e: any) => {
          ErrorAlert(e.message);
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    } else {
      api
        .post(`orders`, { ...data, cpf: SanitizeCpf(data.cpf) })
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch((e: any) => {
          ErrorAlert(e.message);
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  const getorder = async (id: string) => {
    await api
      .get(`orders/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setOrderItem(data);

          setValue("name", data.name ?? "");
          setValue("cpf", data.cpf ?? "");
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  const getInitialData = () => {
    if (id) {
      getorder(id);
    }
  };

  useQuery("FormOrderItems", getInitialData);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] max-w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} ordere`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-5 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Digite o nome..."}
                        label={"Nome"}
                        errorMessage={errors?.name?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-5 sm:col-span-6 col-span-12">
                      <InputTextMasked
                        register={register("cpf")}
                        id={"cpf"}
                        name={"cpf"}
                        placeholder={"Digite o CPF..."}
                        label={"CPF"}
                        mask={"000.000.000-00"}
                        errorMessage={errors?.cpf?.message}
                      />
                    </div>
                  </div>
                  <div
                    className={`flex w-full space-x-4 items-end justify-end`}
                  >
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"save"}
                        label={"Salvar"}
                        color={"success"}
                        type={"submit"}
                      />
                    </div>
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"cancel"}
                        label={"Cancelar"}
                        color={"default"}
                        onClick={() => handleCancel()}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </BodyCard>
        </div>
      </div>
    </>
  );
};
