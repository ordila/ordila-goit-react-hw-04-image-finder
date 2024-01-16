import { requestPosts } from "../helpers/api";

import { Modal } from "./Modal/Modal";

import React, { FC, useEffect, useState } from "react";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";

import { SearchBar } from "./Searchbar/SearchBar";
import { Loader } from "./Loader/Loader";
import { IPost } from "@/types/app/app.types";

export const ModalDataContext = React.createContext(""); //USING ONLY FOR PRACTICE !

export const App: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const onModalOpen = (imageUrl: string) => {
    setModalOpen(true);
    setModalData(imageUrl);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      return;
    }
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const response = await requestPosts(inputValue, page);

        setPosts((prevState: IPost[]) => [...prevState, ...response.hits]);

        setShowBtn(page < Math.ceil(response.totalHits / 12));
      } catch (er) {
        if (er instanceof Error) {
          setError(er.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [inputValue, page]);

  const onFormSubmit = (inputValue: string) => {
    setInputValue(inputValue);
    setPage(1);
    setPosts([]);
  };

  const onButtonClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <SearchBar onFormSubmit={onFormSubmit} />

      <ImageGallery onModalOpen={onModalOpen} posts={posts} />

      {isLoading && <Loader isLoading={isLoading} />}

      {showBtn && <Button onButtonClick={onButtonClick} />}

      {error && <div>Error: {error}</div>}

      {modalOpen && (
        //USING ONLY FOR PRACTICE !
        <ModalDataContext.Provider value={modalData}>
          <Modal onClose={onModalClose} />
        </ModalDataContext.Provider>
      )}
    </div>
  );
};
