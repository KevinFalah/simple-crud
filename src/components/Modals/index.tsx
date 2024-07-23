import React from "react";
import Modal from "react-modal";
import { TypeModal } from "../../pages/Task";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

Modal.setAppElement("body");

interface IModal {
  isOpenModal: boolean;
  title: string;
  typeModal: TypeModal | null;
  isLoading: boolean;
  setOpenModal: () => void;
  onSubmit: () => Promise<void>;
  onChangeHandler?: (value: string, name: string) => void;
}

const ModalCustom = ({
  setOpenModal,
  isOpenModal,
  title,
  onSubmit,
  isLoading,
  typeModal,
  onChangeHandler,
}: IModal) => {
  return (
    <div>
      <Modal
        appElement={document.getElementById("app")}
        isOpen={isOpenModal}
        onRequestClose={setOpenModal}
        style={customStyles}
        contentLabel={title}
      >
        <div>
          <h2 className="text-3xl font-bold uppercase text-gray-800 text-center">
            {title}
          </h2>
        </div>

        <div className="w-full px-3 py-6">
          {typeModal === TypeModal.CREATE ? (
            <>
              <div>
                <label className="block font-semibold mb-2">Judul</label>
                <input
                  type="text"
                  name="title"
                  className="border border-black rounded-md p-1 w-full"
                  onChange={(e) =>
                    onChangeHandler(e.target.value, e.target.name)
                  }
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Deskripsi</label>
                <input
                  type="text"
                  name="body"
                  className="border border-black rounded-md p-1 w-full"
                  onChange={(e) =>
                    onChangeHandler(e.target.value, e.target.name)
                  }
                />
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-center">
              Apakah kamu yakin ingin menghapus?
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 pb-1 gap-x-5">
          <button
            onClick={setOpenModal}
            className={`${
              typeModal === TypeModal.DELETE ? "w-full" : "w-32"
            } h-9 bg-red-500 font-semibold rounded-md text-white`}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className={`${
              typeModal === TypeModal.DELETE ? "w-full" : "w-32"
            } h-9 bg-blue-500 font-semibold rounded-md text-white`}
          >
            {isLoading ? "loading..." : "Submit"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCustom;
