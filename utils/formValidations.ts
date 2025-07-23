import { z } from "zod"

export const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(8, "Mínimo de 8 caracteres"),
  confirmarSenha: z.string(),
  telefone: z.string().optional(),
  nascimento: z.string().optional(),
  genero: z.string().optional(),
  termos: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos",
  }),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
})