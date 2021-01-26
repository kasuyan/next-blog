import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import {GetStaticProps} from 'next'


export default function Home({
  allPostsData
}:{
  allPostsData:{
    date: string;
    title: string;
    id: string;
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>My first blog :D</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
        <ul>
          <li><Link href="/static-page/">Static page</Link></li>
          <li>Static Side Generation
            <ul>
              <li><Link href="/static-side-generation/star">Generation1</Link></li>
              <li><Link href="/static-side-generation/2">Generation2</Link></li>
              <li><Link href="/static-side-generation/3">Generation3</Link></li>
              <li><Link href="/static-side-generation/4">Generation4</Link></li>
              <li><Link href="/static-side-generation/5">Generation5</Link></li>
            </ul>
          </li>
          <li><Link href="/server-side-rendering/">ServerSideRenderingPage</Link></li>
        </ul>
      </section>
    </Layout>
  )
}

// プリレンダリング
// サーバーサイドでしか実行されない
// pagesでしか使えない
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}