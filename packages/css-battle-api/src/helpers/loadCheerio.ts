import axios from 'axios'
import https from 'https'
import cheerio from 'cheerio'

export async function loadCheerio(path: string): Promise<cheerio.Root | null> {
  const { data } = await axios.get(path, {
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  })

  return data ? cheerio.load(data) : null
}
