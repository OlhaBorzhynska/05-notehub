import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByQuery, setSortByQuery] = useState("");

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(searchQuery, currentPage, sortByQuery),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}
      </header>
    </div>
  );
}
