import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./components/Posts/index";
import style from "./App.module.css";
import Pagination from "./components/Pagination/index";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(3);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        setLoading(true);
        const response = await axios.get(
          `http://www.filltext.com/?rows=32&id=${query}%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`
        );

        setPosts(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [query]);

  const onHandle = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  // getting current page
  const indexofLastPost = currentPage * dataPerPage;
  const indexofFirstPost = indexofLastPost - dataPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);

  // moving among pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={style.main}>
      <h1 className="text-primary mb-3">My Table</h1>
      <form //onSubmit={SearchButton}
        className={style.SearchForm}
      >
        <input
          className={style.Searchbar}
          type="text"
          value={search}
          onChange={onHandle}
          placeholder="enter text"
        />
        <button type="submit" className={style.Button} onSubmit={onSearch}>
          Найти
        </button>
      </form>

      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        dataPerPage={dataPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
