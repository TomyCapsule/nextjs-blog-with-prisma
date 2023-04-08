// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import Link from 'next/link';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try{
        const body = { title, content }
        await fetch('/api/post', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(body)
        });
        await Router.push('/drafts');
    }catch(error){
        console.error(error)
    }
  };

  return (
    <Layout>
      <div style={styles.page}>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
            style={styles.textArea}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
            style={styles.textArea}
          />
          <input disabled={!content || !title} type="submit" value="Create" style={styles.inputSubmit}/>
          <Link style={styles.back} href="/">
            or Cancel
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;

const styles = {
    page: {
        background: "white",
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textArea: {
        width: "100%",
        padding: "0.5rem",
        margin: "0.5rem 0",
        borderRadius: "0.25rem",
        border: "0.125rem solid rgba(0, 0, 0, 0.2)"
    },
    inputSubmit: {
        background: "#ececec",
        border: "0",
        padding: "1rem 2rem"
    },
    back: {
        marginLeft: "1rem"
    }

}