import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ディレクトリのパスを取得する
// process.cwdで絶対パスにpostsを追加
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  // 引数に入れたパスの直下のファイルやディレクトリが配列で帰ってくる
  const fileNames = fs.readdirSync(postsDirectory)
  console.log('fileNames', fileNames)
  const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    // ファイルの中身を読む
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data
    }
  })
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}