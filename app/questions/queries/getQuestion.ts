import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestion = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetQuestion), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const question = await db.question.findFirst({
    where: { id },
    include: {
      Question_version: {
        orderBy: {
          effective: "desc",
        },
        take: 1,
        select: { choices: true },
      },
    },
  })

  // Flatten the selected version of question
  // with the static table data
  const { Question_version, ...q } = question
  const questionFlattend = {
    ...q,
    choices: Question_version[0]?.choices,
  }

  if (!question) throw new NotFoundError()

  return questionFlattend
})
