import {getArticles, getArticle} from '../../utils/contentful-helper'
import {formatPublishedDateForDateTime, formatPublishedDateForDisplay} from '../../utils/date'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export async function getStaticPaths() {
    
    const data = await getArticles();
  
    const paths = data.postCollection.items.map((item) => {
      return { params: { slug: `${item.stackbitUrlPath}` } };
    });
    console.log('paths getStaticPaths = ', paths);

    return {
      paths,
      fallback: true,
    };
  }

export const getStaticProps = async (contex) => {

    console.log('<br><br>CONTEX = ', contex.params);
    const data = await getArticle(contex.params.slug);
  console.log('<br><br>DATA = ', data.postCollection.items[0]);
    return {
      props: {
        article: data.postCollection.items[0]
      },
    };
  }

  export default function Article(props) {

    console.log('<br><br>PROPS = ', props.article);
    const { info } = props.article;
  
    return (
        <div>
          <article className="post post-full">
          <header className="post-header inner-md">
              <div className="post-meta"><time className="published" dateTime={formatPublishedDateForDateTime(props.article.date)}>{formatPublishedDateForDateTime(props.article.date)}</time></div>
              <h1 className="post-title">{props.article.title}</h1>
              <div className="post-subtitle">{props.article.subtitle}</div>
          </header>
          <div className="post-thumbnail">
              <img className="thumbnail" src={props.article.contentImgPath.url} height="540"/></div>
              <div className="post-content inner-md">{props.article.content}</div>
          </article>
          <Link 
              key = {props.article.sys.id}
              className = {styles.card}
              href = {`/`}
            >Back</Link>
        </div>
    );
  }