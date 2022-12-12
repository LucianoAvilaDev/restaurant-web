import MaterialTable from "material-table";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BodyCard } from "../../components/cards/BodyCard";
import { SimpleCard } from "../../components/cards/SimpleCard";
import { ButtonSolid } from "../../components/input/ButtonSolid";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";

const index = () => {
  const router = useRouter();

  const newButton: JSX.Element = (
    <div className={`flex p-2`}>
      <ButtonSolid
        id={"newMeal"}
        label={"Nova"}
        color={"primary"}
        onClick={() => {
          router.push("meals/create");
        }}
      />
    </div>
  );

  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
    },
    {
      name: "Year",
      selector: (row: any) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <Navigation>
      <div className={`px-3 w-full`}>
        <BodyCard title={`Refeições`} newButton={newButton}>
          <div className="px-2 py-4">
            <SimpleTable columns={columns} data={data} />
          </div>
        </BodyCard>
      </div>
    </Navigation>
  );
};

export default index;
