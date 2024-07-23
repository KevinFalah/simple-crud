import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { columns } from "./columns";
import ModalCustom from "../../components/Modals";

export enum TypeModal {
  EDIT = "EDIT",
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Task = () => {
  const [isOpenModal, setIsOpenModal] = useState<TypeModal | null>(null);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          const dataJson = json?.slice(0, 20);
          setData(dataJson);
        });
    } catch (error) {
      console.log('error fetch data => ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const { title, body } = form;
      let result;
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId: getRandomInt(1, 100),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => (result = json));
      if (result) {
        await fetchData();
        setIsOpenModal(null);
      }
    } catch (error) {
      console.log("error create => ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${idUser}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log("error delete => ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (type: TypeModal, id: number | null) => {
    if (isOpenModal === type) {
      setIsOpenModal(null);
      setIdUser(null);
    } else {
      setIdUser(id);
      setIsOpenModal(type);
    }
  };

  const handleChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-6 h-52">
      <div className="flex justify-end">
        <button
          className="w-32 h-9 bg-blue-500 font-semibold rounded-md text-white"
          onClick={() => handleOpenModal(TypeModal.CREATE, null)}
        >
          Buat Data
        </button>
      </div>
      <Table
        columns={columns({ handleOpenModal })}
        data={data || []}
        loading={isLoading}
        paginate
        limit={20}
      />
      <ModalCustom
        isOpenModal={isOpenModal === TypeModal.DELETE}
        setOpenModal={() => handleOpenModal(TypeModal.DELETE, null)}
        onSubmit={handleDelete}
        typeModal={isOpenModal}
        isLoading={isLoading}
        title="Hapus Data"
      />
      <ModalCustom
        isOpenModal={isOpenModal === TypeModal.CREATE}
        setOpenModal={() => handleOpenModal(TypeModal.CREATE, null)}
        onSubmit={handleCreate}
        typeModal={isOpenModal}
        isLoading={isLoading}
        onChangeHandler={(value, name) => handleChange(value, name)}
        title="Buat Data"
      />
    </div>
  );
};

export default Task;
