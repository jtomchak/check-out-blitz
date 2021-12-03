import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetQuestion_versionsInput
  extends Pick<Prisma.Question_versionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestion_versionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: question_versions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.question_version.count({ where }),
      query: (paginateArgs) => db.question_version.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      question_versions,
      nextPage,
      hasMore,
      count,
    }
  }
)
