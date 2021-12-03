import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateQuestion_version = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateQuestion_version),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question_version = await db.question_version.create({ data: input })

    return question_version
  }
)
