import axios from 'axios'
import https from 'https'
import cheerio from 'cheerio'

export async function loadCheerio(path: string): Promise<cheerio.Root> {
  const { data }: TResponseOK<string | Buffer> = await axios.get(path, {
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  })

  if (data) return cheerio.load(data)
  else throw 'Could not be accessed the CSS Battle page'
}
