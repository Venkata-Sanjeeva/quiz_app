import React from "react";
import styles from "../styles/NotFoundPage.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={styles.NotFoundContainer}>
      <h1 className={styles.Heading}>404</h1>
      <p className={styles.Description}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className={styles.StyledLink}>Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;
