import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectType } from "../../../../types/SelectType";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputNumber from "../../input/InputNumber";
import InputSelect from "../../input/InputSelect";
import InputText from "../../input/InputText";
import InputTextArea from "../../input/InputTextArea";
import { TablesSchema } from "../../../schemas/TablesSchema";
import { api } from "../../../services/api";
import { Switch } from "../../input/Switch";
import { useQuery } from "react-query";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
};

export const FormTables = ({ id, setModal, handleClear }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [table, setTable] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TablesSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`tables/${id}`, data)
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
        .post(`tables`, data)
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

  const getTable = async (id: string) => {
    await api
      .get(`tables/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setTable(data);

          setValue("number", data.number ?? "");
          setValue("isAvailable", data.is_available ?? "");
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  const getInitialData = () => {
    if (id) {
      getTable(id);
    }
  };

  useQuery("formTables", getInitialData);

  return (
    <>
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] max-w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Mesa`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-8 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("number")}
                        id={`number`}
                        name={"number"}
                        placeholder={"Digite o número..."}
                        label={"Número"}
                        errorMessage={errors?.number?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-3 col-span-12">
                      <Switch
                        register={register("isAvailable")}
                        id={"isAvailable"}
                        name={"isAvailable"}
                        label={"Disponível"}
                        setValue={setValue}
                        top
                        defaultValue={getValues().isAvailable as boolean}
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

export default FormTables;
