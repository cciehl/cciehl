import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export async function callOpenAI(prompt: string): Promise<string> {
  const resp = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt,
    temperature: 0.2,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  return resp.data.choices[0].text || '';
}
