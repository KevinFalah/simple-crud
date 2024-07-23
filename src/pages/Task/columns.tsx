import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TypeModal } from ".";

interface IColumns {
  handleOpenModal?: (key: TypeModal, id: number) => void;
}

export const columns = ({ handleOpenModal }: IColumns) => [
  {
    Header: "No",
    accessor: "No",
    Cell: ({ row }) => {
      return (
        <div className="font-medium text-black flex items-center gap-x-2 text-base">
          {row?.index + 1}
        </div>
      );
    },
  },
  {
    Header: "Judul",
    accessor: "title",
    Cell: ({ value }) => {
      return (
        <div className="font-medium text-black flex items-center gap-x-2 text-base">
          {/* <BiSolidUserCircle className="text-2xl" /> */}
          {value ?? "-"}
        </div>
      );
    },
  },
  {
    Header: "Deskripsi",
    accessor: "body",
    Cell: ({ value }) => {
      return (
        <div className="font-medium text-black flex items-center gap-x-2 text-base">
          {/* <BiSolidUserCircle className="text-2xl" /> */}
          {value ?? "-"}
        </div>
      );
    },
  },
  {
    Header: "Hapus",
    Cell: ({ row }) => {
      const id = row?.original?.id;
      return (
        <div
          className="line-clamp-1 font-medium text-xl cursor-pointer transition-all duration-200"
          onClick={() => handleOpenModal(TypeModal.DELETE, id)}
        >
          <MdDelete className="mx-auto text-red-500" />
        </div>
      );
    },
  },
];
