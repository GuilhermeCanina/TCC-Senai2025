import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analisarRedacao = async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "Campo 'texto' é obrigatório." });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3n-e2b-it" });

const prompt = `
Você é um corretor oficial do ENEM. 
Avalie a redação do aluno segundo as 5 competências oficiais, atribuindo **notas de 0 a 200, somente em múltiplos de 40 (0, 40, 80, 120, 160, 200)**.  

As 5 competências são:

1. Domínio da escrita formal da Língua Portuguesa.  
2. Compreensão do tema, sem fuga ou desvio do assunto.  
3. Capacidade de argumentação e uso de repertório sociocultural válido.  
4. Coesão e coerência na organização do texto.  
5. Proposta de intervenção clara, detalhada e viável.  

### Regras automáticas de anulação (nota final = 0):  
- Texto com menos de **7 linhas escritas**.  
- Redação **em branco** ou apenas com cópia do texto motivador.  
- Texto totalmente **fora do tema**.  
- Texto que contenha **desrespeito aos direitos humanos**.  
- Redação em formato **poema, lista, bilhete ou outro formato não dissertativo-argumentativo**.  
- Texto ilegível ou **sem estrutura textual mínima**.  

### Regras automáticas de dedução:
- Presença de muitos **erros graves de português** → competência 1 limitada a no máximo 120.  
- Pouca argumentação ou repetição excessiva → competência 3 limitada a no máximo 120.  
- Falta de conclusão ou ausência de proposta de intervenção → competência 5 limitada a no máximo 80.  
- Texto muito curto (entre 7 e 10 linhas) → nota final limitada a no máximo 400.  

### Resposta obrigatória:
Calcule a soma final (0 a 1000) corretamente.  
Responda **somente em JSON válido**, no formato:

{
  "competencia1": 0-200,
  "competencia2": 0-200,
  "competencia3": 0-200,
  "competencia4": 0-200,
  "competencia5": 0-200,
  "notaFinal": 0-1000,
  "comentarios": "feedback explicativo para o aluno"
}

Redação do aluno:
${texto}
`;



    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    let avaliacao;

    if (jsonMatch) {
      try {
        avaliacao = JSON.parse(jsonMatch[0]);
      } catch (err) {
        avaliacao = { raw: responseText, error: "Falha ao converter para JSON" };
      }
    } else {
      avaliacao = { raw: responseText, error: "Nenhum JSON detectado" };
    }

    res.json(avaliacao);
  } catch (error) {
    console.error("Erro na correção da redação:", error);
    res.status(500).json({ error: "Erro ao corrigir redação" });
  }
};
