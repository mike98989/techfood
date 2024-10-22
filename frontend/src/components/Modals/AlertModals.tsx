import React, { useEffect, useState, lazy, Suspense } from "react";
import { Button, Modal } from "flowbite-react";
import SpinnerObject from "../../components/Spinner/Spinner";
import { ReusableMethods } from "../../methods/ReusableMethods";
import { httpRequest } from "../../methods/Requests";
import DynamicComponentLoader from "../Misc/DynamicComponent";

interface modalQueryDataType {
  modalType: string;
  modalData: Object;
  modalSize: string;
  // title: string;
  // endPoint: string;
  // action: "GET" | "POST" | "PUT" | "DELETE";
  // token: string;
  // data: any;
  // index: number;
  // setData: Function;
}
const AlertModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalQueryData, setModalQueryData] = useState<modalQueryDataType>({});
  const { isLoading, setIsLoading, Spinner } = SpinnerObject();
  const { allRequest } = ReusableMethods();
  const [returnData, setReturnData] = useState([]);
  const { fetchApi } = httpRequest();

  const ModalUIComponent = () => {
    return (
      <Modal
        show={openModal}
        size={modalQueryData.modalSize || "sm"}
        onClose={() => setOpenModal(false)}
        className="custom-overlay pt-30"
        position="center"
        dismissible
        //style={{ backgroundColor: "transparent" }}
      >
        <div
          className="bg-black opacity-50" // Full-screen black overlay with opacity
          onClick={() => setOpenModal(false)} // Close modal on backdrop click
        />
        {/* <Modal.Header className="p-2 border-0"></Modal.Header> */}
        <Modal.Body>
          <>
            {modalQueryData.modalType == "delete" && (
              <div className="text-center">
                <h3 className="mb-5 text-md italic font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this record{" "}
                  {modalQueryData.modalData.title + " "}?{" "}
                </h3>

                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={() => {
                      setIsLoading(true);
                      fetchApi({
                        url: modalQueryData.modalData.endPoint, // End Point
                        method: modalQueryData.modalData.action, // Method
                        formData: null,
                        contentType: "application/json", //Content Type
                        authentication: modalQueryData.modalData.token,
                      }).then((response: any) => {
                        setIsLoading(false);
                        if (response.status == "1") {
                          setOpenModal(false);
                          modalQueryData.modalData.setData((data: any) =>
                            data.filter(
                              (value: any, i: any) =>
                                i !== modalQueryData.modalData.index
                            )
                          );
                        }
                      });
                    }}
                  >
                    <Spinner /> {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            )}

            {modalQueryData.modalType == "form" && (
              <div>
                <DynamicComponentLoader
                  componentData={modalQueryData.modalData.data}
                  componentPath={modalQueryData.modalData.form}
                />
              </div>
            )}
          </>
        </Modal.Body>
      </Modal>
    );
  };

  return { ModalUIComponent, setOpenModal, setModalQueryData };
};
export default AlertModal;
