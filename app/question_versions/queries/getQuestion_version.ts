import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestion_version = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetQuestion_version),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question_version = await db.question_version.findFirst({ where: { id } })

    if (!question_version) throw new NotFoundError()

    return question_version
  }
)
