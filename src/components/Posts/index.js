import React from "react";
import style from "../Posts/posts.module.css";
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const RenderData = posts.map((post) => {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,

      description,
    } = post;
    return (
      <tr key={post.id}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>

        <td>{description}</td>
      </tr>
    );
  });
  return (
    <table className={style.employee}>
      <tr>
        <th>ID</th>
        <th>firstName</th>
        <th>lastName</th>
        <th>email</th>
        <th>phone</th>

        <th>description</th>
      </tr>
      <tbody>{RenderData}</tbody>
    </table>
  );
};

export default Posts;
