import * as React from "react";
import Spinner from "@skbkontur/react-ui/Spinner";


import { Header } from "./Header";
import { Body } from "./Body";

import "../style.css";
import {useState, useEffect} from "react";
import {getData} from "src/utils";

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
  const [allServices, setAllServices] = useState([]);
  const [showedSpinner, setShowedSpinner] = useState(true);
  
  useEffect((): void => {
    setShowedSpinner(true);
    getData(setAllServices, setShowedSpinner);
  }, []);

  const showSpinner = (): void => {
    setShowedSpinner(true);
  }
  
  return (
    <>
      <Header showSpinner={showedSpinner} />
      <Body
        allServices={allServices}
        showSpinner={showSpinner}
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
