import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteQuestion_version = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteQuestion_version),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question_version = await db.question_version.deleteMany({ where: { id } })

    return question_version
  }
)
