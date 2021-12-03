import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateQuestion_version = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateQuestion_version),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question_version = await db.question_version.update({ where: { id }, data })

    return question_version
  }
)
