import React from "react";
import style from "../Posts/posts.module.css";
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={style.employee}>
      <table>
        <tr>
          <th>ID</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>phone</th>

          <th>description</th>
        </tr>
        {posts.map((item) => (
          <tbody key={item.id}>
            <tr>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>

              <td>{item.description}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Posts;
