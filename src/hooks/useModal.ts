import React, { useState, useReducer } from "react";
import { Button, buttons } from "../types/button";
import { ModalProps } from "../components/buttons_modal";

export type ModalSetting = {
  toggleModal: any;
  setModalCallbackOnSubmit: any;
  setModalCloseCallback: any;
  setModalTitle: any;
  setModalPrefillButtons: any;
}

export const useModal = () => {
  const [visible, toggleModal] = useReducer(((m: boolean) => { return !m; }), false);
  const [callbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [callbackOnClose, setModalCloseCallback] = useState(undefined as any)
  const [title, setModalTitle] = useState("")
  const [prefill, setModalPrefillButtons] = useState<Array<Button>>([])

  return [
    { visible, callbackOnSubmit, callbackOnClose, title, prefill } as ModalProps,
    { toggleModal, setModalCallbackOnSubmit, setModalCloseCallback, setModalTitle, setModalPrefillButtons }
  ];
}
