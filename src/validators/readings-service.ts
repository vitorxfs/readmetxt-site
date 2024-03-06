import { z } from 'zod';

export const readingsSchema = z.object({
  results: z.array(z.object({
    archived: z.boolean(),
    properties: z.object({
      "Quantidade de dias para leitura": z.object({
        formula: z.object({ number: z.number() })
      }),
      'Link da Amazon para Compra': z.object({
        url: z.string().url(),
      }),
      'Capa': z.object({
        files: z.array(z.object({
          file: z.object({
            url: z.string().url(),
          }),
        })),
      }),
      'Data de Início': z.object({
        date: z.object({
          start: z.string().regex(/^\d\d\d\d-\d\d-\d\d$/),
        }),
      }),
      'Progresso': z.object({
        formula: z.object({
          number: z.number()
        }),
      }),
      'Avaliação': z.object({
        select: z.object({
          name: z.string(),
        })
      }),
      'Páginas por dia': z.object({
        formula: z.object({
          number: z.number()
        }),
      }),
      'Data de Término': z.object({
        date: z.object({
          start: z.string().regex(/^\d\d\d\d-\d\d-\d\d$/),
        }),
      }),
      'Status': z.object({
        select: z.object({
          name: z.union([z.literal('Lendo'), z.literal('Lido'), z.literal('Na fila'), z.literal('Lista de desejos')]),
        })
      }),
      'Preço*': z.object({
        number: z.number(),
      }),
      'Autor': z.object({
        'rich_text': z.array(z.object({ 'plain_text': z.string() }))
      }),
      'Páginas Totais': z.object({
        number: z.number(),
      }),
      'Reunião do Grupo': z.object({
        'rich_text': z.array(z.object({ 'plain_text': z.string() }))
      }),
      'Páginas Lidas': z.object({
        number: z.number(),
      }),
      'Título do Livro': z.object({
        title: z.array(z.object({ 'plain_text': z.string() }))
      }),
    })
  }))
})
