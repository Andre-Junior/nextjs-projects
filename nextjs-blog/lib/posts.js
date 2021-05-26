import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    //Obter nome dos arquivos em /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        //Remover .md do nome do arquivo para obter o id
        const id = fileName.replace(/\.md$/, '')

        //Ler o markdown como string 
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //Usar o gray-matter para analisar os metadata 
        const matterResult = matter(fileContents)

        //combinando os dados 
        return {
            id,
            ...matterResult.data
        }
    })

    //Classificando por data
    return allPostsData.sort((a, b) => {
        if(a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds () {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //Usar a gray-matter para analisar o metadata
    const matterResult = matter(fileContents)

    //Usar o remark para converter markdown em HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString() 

    //Combinando os dados com id e contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}