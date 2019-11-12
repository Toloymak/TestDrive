import * as React from "react";
import Spinner from "@skbkontur/react-ui/Spinner";

import { Header } from "./Header";
import { Body } from "./Body";

import "../style.css";
import {useState, useEffect, useRef} from "react";
import {createSocket} from "src/utils";
import {SocketHubs} from 'src/enums';

interface LinkModel {
  id: string;
  url: string;
  title: string;
  priority: number;
  blockId: string;
};

export interface AllServicesModel {
  id: string;
  name: string;
  priority: number;
  links: LinkModel[];
};

export const Content: React.FC = () => {
  const socketRef = useRef(createSocket(SocketHubs.frontLinks));

  const [allServices, setAllServices] = useState([]);
  const [showedSpinner, setShowedSpinner] = useState(true);

  useEffect((): void => {
    setShowedSpinner(true);
    socketRef.current.getData(setAllServices);
    setShowedSpinner(false);
  }, []);

  const showSpinner = (): void => {
    setShowedSpinner(true);
  }
  
  const delLink = (id: string): void => {
    const filteredLink = allServices.filter(item => item.id !== id);
    setAllServices(filteredLink);
    socketRef.current.delete(id);
    setShowedSpinner(false);
  }
  
  return (
    <>
      <Header showSpinner={showedSpinner} />
      <Body
        allServices={allServices}
        showSpinner={showSpinner}
        delLink={delLink}
      />
      {showedSpinner && (
        <span className="spinner">
          <span className="block-spinner">
            <Spinner type="big" caption={"Что то происходит"} />
          </span>
        </span>
      )}
    </>
  );
}
