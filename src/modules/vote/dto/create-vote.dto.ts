import { z } from 'zod'

export const createVoteDto = z.object({
    programId: z.coerce.number().nonnegative(),
    planId: z.coerce.number().nonnegative(),
})

export type CreateVoteDto = z.infer<typeof createVoteDto>
