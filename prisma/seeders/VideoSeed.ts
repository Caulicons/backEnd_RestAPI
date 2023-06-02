import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const arrayMoviesInfos = [
  {
    title: 'test',
    description: 'test',
    url: 'test',
    categories: [{ id: '1' }],
  },
  {
    title: 'The Godfather',
    description:
      'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'The Godfather: Part II',
    description: 'The early life and career of Vito Corleone in 1920s New York City.',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'The Godfather: Part III',
    description:
      "When realisation strikes Micheal Corleone, he takes a tough call and decides to end his family's criminal empire. He chooses his nephew as his successor, however, the mob refuses to let him go.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'Moonlight',
    description:
      "Chiron, a young African-American boy, finds guidance in Juan, a drug dealer, who teaches him to carve his own path. As he grows up in Miami, Juan's advice leaves a lasting impression on him.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'Roma',
    description:
      "Cleo is one of two domestic workers who help Antonio and Sofía take care of their four children in 1970s Mexico City. Complications soon arise when Antonio suddenly runs away with his mistress and Cleo finds out that she's pregnant. When Sofía decides to take the kids on vacation, she invites Cleo for a much-needed getaway to clear her mind and bond with the family.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'Hereditary',
    description:
      "After her mother passes away, Annie and the rest of the family are grief-stricken. Soon, strange things start occurring and the horrifying truth about Annie's ancestry begins to come to light.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
  },
  {
    title: 'The Witch',
    description:
      'In the New England of the 17th century, a banished Puritan family sets up a farm by the edge of a huge remote forest where no other family lives. Soon, sinister forces then start haunting them.',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    categories: [{ id: '1' }],
  },
]

export default class VideoSeeder extends PrismaSeederBase {
  public static developmentOnly = true

  public async run() {
    const promises = arrayMoviesInfos.map(async (movie) => {
      return prisma.video.upsert({
        where: { title: movie.title },
        update: {},
        create: {
          title: movie.title,
          description: movie.description,
          url: movie.url,
          categories: { connect: movie.categories },
        },
      })
    })

    await Promise.all(promises)

    await prisma.video.update({
      where: { title: 'The Godfather' },
      data: { id: '1' },
    })
  }
}
