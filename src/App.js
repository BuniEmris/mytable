import React, { useState, useEffect, useRef } from "react";
//import axios from "axios";

import Posts from "./components/Posts/index";
import style from "./App.module.css";
import Pagination from "./components/Pagination/index";
import Modal from "./components/Modal";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(3);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(
        `http://www.filltext.com/?rows=32&id=${query}%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchData();
  }, [query]);

  const onHandle = (e) => {
    setSearch(e.target.value);
    console.log("press");
  };

  const onSearch = (e) => {
    console.log("send");
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  // getting current page
  const indexofLastPost = currentPage * dataPerPage;
  const indexofFirstPost = indexofLastPost - dataPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);

  const onFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const onSave = (e) => {
    console.log("server info", posts.length);
    setPosts(...posts, firstName);
    console.log("server info 2", posts.length);
  };

  // moving among pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //modal
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  return (
    <div className={style.main}>
      <h1 className="text-primary mb-3">My Table</h1>
      <form onSubmit={onSearch} className={style.SearchForm}>
        <input
          className={style.Searchbar}
          type="text"
          value={search}
          onChange={onHandle}
          placeholder="enter id"
        />
        <button type="submit" className={style.Button}>
          Найти
        </button>
      </form>

      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        dataPerPage={dataPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <button type="button" class="btn btn-primary" onClick={openModal}>
        Add Row
      </button>

      <Modal ref={modalRef}>
        <h1>Add Employee to the row</h1>
        <form>
          <label>firstName</label>
          <br />

          <input type="text" onChange={onFirstName} />
          <br />
          <label>lastName</label>
          <br />
          <input type="text" onChange={() => setLastName.value} />
          <br />
          <label>email</label>
          <br />
          <input type="text" onChange={() => setEmail.value} />
          <br />
          <label>phone</label>
          <br />
          <input type="text" onChange={() => setPhone.value} />
          <br />
          <label>address</label>
          <br />
          <input type="text" onChange={() => setAddress.value} />
        </form>
        <br />
        <div class="row justify-content-between">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => modalRef.current.close()}
          >
            Close
          </button>
          <button type="button" class="btn btn-success" onClick={onSave}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
