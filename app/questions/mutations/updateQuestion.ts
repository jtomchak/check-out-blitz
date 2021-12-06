import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateQuestion = z.object({
  id: z.number(),
  text: z.string(),
  choices: z.array(z.object({ text: z.string() })),
})

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    console.log(">>>Question Data", data)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question_version = await db.question_version.create({
      data: { questionId: id, choices: { create: data.choices } },
    })
    const question = await db.question.update({
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
      data: {
        text: data.text,
      },
    })

    // TODO: create new entry to question_version
    // Squish and return.
    return question
  }
)
