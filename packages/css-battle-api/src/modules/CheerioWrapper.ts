import axios from 'axios'
import https from 'https'
import cheerio from 'cheerio'

class CheerioWrapper {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public async load(path: string): Promise<cheerio.Root> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/${path}`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      })

      return cheerio.load(data)
    } catch (error) {
      console.error('ERROR-CHEERIO ->', error.message)
      throw new Error(error)
    }
  }
}

export { CheerioWrapper }
