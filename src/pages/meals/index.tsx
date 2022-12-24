import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MealType } from "../../../types/MealType";
import { SelectType } from "../../../types/SelectType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InfoAlert } from "../../components/alerts/InfoAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputSelect from "../../components/input/InputSelect";
import InputText from "../../components/input/InputText";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import FormMeals from "../../components/templates/forms/FormMeals";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { api } from "../../services/api";
import validateAuth from "../../services/validateAuth";
import { FormatMoney } from "../../utils/FormatMoney";

const Index = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealTypes, setMealTypes] = useState<SelectType[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const { register, handleSubmit, setValue } = useForm();

  const getMeals = async () => {
    setPending(true);
    await api.get("meals").then(({ data }: any) => {
      setMeals(data);
      setPending(false);
    });
  };

  const getMealTypes = async () => {
    await api.get("meal-types").then(({ data }: any) => {
      setMealTypes(
        data.map((type: any) => {
          return { value: type.id, label: type.name };
        })
      );
    });
  };

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Tipo",
      selector: (row: any) => row.type,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,

      allowOverflow: true,
    },
  ];

  const data: any[] = meals.map((meal: MealType) => {
    return {
      name: meal.name,
      price: FormatMoney(meal.price),
      type: meal.mealType.name,
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Editar`}
              icon={
                <MdOutlineModeEditOutline
                  className={`filter hover:drop-shadow m-1`}
                  size={18}
                />
              }
              color={"success"}
              onClick={async () => {
                await Promise.resolve(
                  setModalTemplate(
                    <FormMeals
                      id={meal.id}
                      mealTypes={mealTypes}
                      handleClear={handleClear}
                      setModal={setModal}
                    />
                  )
                ).then(() => {
                  setModal(true);
                });
              }}
            />
          </div>
          <div>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                InfoAlert(
                  <>
                    <YesNoTemplate onClickYes={() => handleYes(meal.id)} />
                  </>
                );
              }}
            />
          </div>
        </div>
      ),
    };
  });

  const newButton: JSX.Element = (
    <div className={`flex p-2`}>
      <ButtonSolid
        id={"newMeal"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormMeals
                handleClear={handleClear}
                mealTypes={mealTypes}
                setModal={setModal}
              />
            )
          ).then(() => {
            setModal(true);
          });
        }}
      />
    </div>
  );

  const handleYes = async (id: string) => {
    setIsLoading(true);
    await api
      .delete(`meals/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getMeals();
        setIsLoading(false);
      })
      .catch(({ response }: AxiosError) => {
        ErrorAlert(
          (response?.data as string) ??
            "Houve um erro! Tente novamente mais tarde."
        );
        setIsLoading(false);
      });
  };
  const handleSearch = (data: any) => {
    setPending(true);

    api.post("meals/filters", data).then(({ data }) => {
      setMeals(data);
      setPending(false);
    });
  };

  const handleClear = () => {
    setValue("name", "");
    setValue("type", "");
    (document.getElementById("search") as any).click();

    return;
  };

  useEffect(() => {
    getMeals();
    getMealTypes();
  }, []);

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Refeições`} newButton={newButton}>
            <div className="px-2 pt-2 pb-6">
              <div className={`py-4`}>
                {/* --------------FILTERS ------------------------------ */}
                <form onSubmit={handleSubmit(handleSearch)}>
                  <div className={`grid grid-cols-12 py-4`}>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Pesquise pelo nome... "}
                        label={"Nome"}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("type")}
                        id={`type`}
                        name={"type"}
                        placeholder={"Pesquise pelo tipo..."}
                        label={"Tipo"}
                        options={mealTypes}
                        setValue={undefined}
                      />
                    </div>
                  </div>
                  <div
                    className={`flex w-full space-x-2 items-end justify-end`}
                  >
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"search"}
                        label={"Pesquisar"}
                        color={"secondary"}
                        type={"submit"}
                      />
                    </div>
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"clear"}
                        label={"Limpar"}
                        color={"warning"}
                        onClick={() => handleClear()}
                      />
                    </div>
                  </div>
                </form>
                {/* ----------------------------------------------------- */}
              </div>
              <SimpleTable columns={columns} data={data} pending={pending} />
            </div>
          </BodyCard>
        </div>
      </Navigation>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
