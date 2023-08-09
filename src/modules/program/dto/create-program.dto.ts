import { z } from 'zod'

export const createProgramDto = z.object({
    planId: z.coerce.number(),
    title: z.string().nonempty(),
    description: z.string().optional()
})

export type CreateProgramDto = z.infer<typeof createProgramDto>
