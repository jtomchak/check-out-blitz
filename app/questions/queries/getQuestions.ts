import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetQuestionsInput
  extends Pick<Prisma.Question_versionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.question.count({ where }),
      query: (paginateArgs) =>
        db.question.findMany({
          ...paginateArgs,
          where,
          include: {
            Question_version: {
              orderBy: {
                effective: "desc",
              },
              take: 1,
              select: { choices: true },
            },
          },
        }),
    })
    // Flatten the selected version of question
    // with the static table data
    const questions = items.map((q) => {
      const { Question_version } = q
      return {
        ...q,
        choices: Question_version[0]?.choices,
      }
    })
    return {
      questions,
      nextPage,
      hasMore,
      count,
    }
  }
)
