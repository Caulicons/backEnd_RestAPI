import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const movies = [
  {
    title: 'test',
    description: 'test',
    url: 'test',
    categories: [{ id: '1' }],
    free: true,
  },
  {
    title: 'The Godfather',
    description:
      'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    free: true,
  },
  {
    title: 'The Godfather: Part II',
    description: 'The early life and career of Vito Corleone in 1920s New York City.',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    free: true,
  },
  {
    title: 'The Godfather: Part III',
    description:
      "When realisation strikes Micheal Corleone, he takes a tough call and decides to end his family's criminal empire. He chooses his nephew as his successor, however, the mob refuses to let him go.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    free: true,
  },
  {
    title: 'Moonlight',
    description:
      "Chiron, a young African-American boy, finds guidance in Juan, a drug dealer, who teaches him to carve his own path. As he grows up in Miami, Juan's advice leaves a lasting impression on him.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    free: true,
  },
  {
    title: 'Roma',
    description:
      "Cleo is one of two domestic workers who help Antonio and Sofía take care of their four children in 1970s Mexico City. Complications soon arise when Antonio suddenly runs away with his mistress and Cleo finds out that she's pregnant. When Sofía decides to take the kids on vacation, she invites Cleo for a much-needed getaway to clear her mind and bond with the family.",
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    free: true,
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
    categories: [{ name: 'Horror' }],
  },

  {
    title: 'Her',
    description:
      "After a bear kills Kenai's older brother, he impulsively kills the bear to take revenge. As a punishment, he gets transformed into a bear and the only way out is to befriend a bear cub named Koda.",
    url: 'https://www.google.com/search?cs=1&sxsrf=APwXEddsCZFGrWGeJf6KoGwVotXHwScV1A:1685976261972&q=Brother+Bear&stick=H4sIAAAAAAAAAONgFuLUz9U3MLRISbJQgjCrSgostCSyk630C1LzC3JSgVRRcX6eVW5-WWZq8SJWHqei_JKM1CIFp9TEIgCsMynMQQAAAA&sa=X&ved=2ahUKEwiT28WBr6z_AhV1rpUCHVOWB0UQ9OUBegQIAxAX',
    categories: [{ id: '1' }],
  },
  //add more Joaquin Phonix movies below
  {
    title: 'You Were Never Really Here',
    description:
      'When a teenage girl goes missing, a jaded, brutal enforcer attempts a rescue mission. He uncovers corruption and abuse of power along his way and will use any means necessary to save the girl.',
    url: 'https://www.google.com/search?sxsrf=APwXEddiBhdBGbh4Utj9XBBRNuokq6Rpfg:1686071926033&q=You+Were+Never+Really+Here&stick=H4sIAAAAAAAAAONgFuLUz9U3MLRISbJQ4tVP1zc0TDY1sizIyI3XkshOttIvSM0vyEkFUkXF-XlWufllmanFi1ilIvNLFcJTi1IV_FLLUosUglITc3IqFTyAIgBiSnQDUwAAAA&sa=X&ved=2ahUKEwjv4N2xk6__AhXSqpUCHQ41AukQ9OUBegQIIBAZ',
    categories: [{ id: '1' }],
  },
  {
    title: 'Walk the Line',
    description:
      "Johnny Cash, an aspiring musician, receives a golden opportunity to tour with the famous June Carter. As Johnny's musical career takes a flight, his marriage with Vivian starts falling apart",
    url: 'https://www.google.com/search?sxsrf=APwXEddiBhdBGbh4Utj9XBBRNuokq6Rpfg:1686071926033&q=Walk+the+Line&stick=H4sIAAAAAAAAAONgFuLUz9U3MLRISbJQAjNNs6pKjLUkspOt9AtS8wtyUoFUUXF-nlVufllmavEiVt7wxJxshZKMVAWfzLxUAAarfBdCAAAA&sa=X&ved=2ahUKEwjv4N2xk6__AhXSqpUCHQ41AukQ9OUBegQIIBAN',
    categories: [{ id: '1' }],
  },
  {
    title: 'Gladiator',
    description:
      'Commodus takes over power and demotes Maximus, one of the preferred generals of his father, Emperor Marcus Aurelius. As a result, Maximus is relegated to fighting till death as a gladiator',
    url: 'https://www.google.com/search?sxsrf=APwXEddiBhdBGbh4Utj9XBBRNuokq6Rpfg:1686071926033&q=Gladiator&stick=H4sIAAAAAAAAAONgFuLUz9U3MLRISbJQAjMtC03LjbQkspOt9AtS8wtyUoFUUXF-nlVufllmavEiVk73nMSUzMSS_CIAlyrGMD4AAAA&sa=X&ved=2ahUKEwjv4N2xk6__AhXSqpUCHQ41AukQ9OUBegQIIBAJ',
    categories: [{ id: '1' }],
  },
  {
    title: 'Joker',
    description:
      'Arthur Fleck, a party clown, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos',
    url: 'https://www.google.com/search?sxsrf=APwXEddiBhdBGbh4Utj9XBBRNuokq6Rpfg:1686071926033&q=Joker&stick=H4sIAAAAAAAAAONgFuLUz9U3MLRISbJQ4tVP1zc0TEsuKSwotzDVkshOttIvSM0vyEkFUkXF-XlWufllmanFi1hZvfKzU4sA7y32FT4AAAA&sa=X&ved=2ahUKEwjv4N2xk6__AhXSqpUCHQ41AukQ9OUBegQIIBAD',
    categories: [{ id: '1' }],
  },
  {
    title: 'Pulp Fiction',
    description:
      "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals",
    url: 'https://www.google.com/search?sxsrf=APwXEdcTu9Wem3D-rV5ng5c39gntLJjxtQ:1686072367247&q=Pulp+Fiction&stick=H4sIAAAAAAAAAONgFuLQz9U3MLM0zlECs9JM4nO0JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIlaegNKcAgW3zOSSzPy8HayMABDeM5xCAAAA&sa=X&ved=2ahUKEwj2sI-Ela__AhUFp5UCHU5HCQEQgOQBegQILBAE',
    categories: [{ id: '1' }],
  },
  {
    title: 'Once Upon a Time... in Hollywood',
    description:
      'Rick, a washed-out actor, and Cliff, his stunt double, struggle to recapture fame and success in 1960s Los Angeles. In their mission, they must tackle several twists and turns.',
    url: 'https://www.google.com/search?sxsrf=APwXEdcTu9Wem3D-rV5ng5c39gntLJjxtQ:1686072367247&q=Once+Upon+a+Time...+in+Hollywood&stick=H4sIAAAAAAAAAONgFuLQz9U3MLM0zlHi1U_XNzRMMylKya0ozNOSyE620i9IzS_ISQVSRcX5eVa5-WWZqcWLWBX885JTFUIL8vMUEhVCMnNT9fT0FDLzFDzyc3Iqy_PzU3awMgIAevZ1hlsAAAA&sa=X&ved=2ahUKEwj2sI-Ela__AhUFp5UCHU5HCQEQgOQBegQILBAG',
    categories: [{ id: '1' }],
  },
  {
    title: 'Inglourious Basterds',
    description:
      'A few Jewish soldiers are on an undercover mission to bring down the Nazi government and put an end to the war. Meanwhile, a woman wants to avenge the death of her family from a German officer',
    url: 'https://www.google.com/search?sxsrf=APwXEdcTu9Wem3D-rV5ng5c39gntLJjxtQ:1686072367247&q=Inglourious+Basterds&stick=H4sIAAAAAAAAAONgFuLQz9U3MLM0zlHiBLGMKsuSS7QkspOt9AtS8wtyUoFUUXF-nlVufllmavEiVhHPvPSc_NKizPzSYgWnxOKS1KKU4h2sjAAQYbAcSwAAAA&sa=X&ved=2ahUKEwj2sI-Ela__AhUFp5UCHU5HCQEQgOQBegQILBAI',
    categories: [{ id: '1' }],
  },
  {
    title: 'Django Unchained',
    description:
      'When Django, a slave, is freed, he joins forces with a bounty hunter to rescue his wife, who has been enslaved by Calvin, a hard-hearted plantation owner.',
    url: 'https://www.google.com/search?sxsrf=APwXEdcTu9Wem3D-rV5ng5c39gntLJjxtQ:1686072367247&q=Django+Unchained&stick=H4sIAAAAAAAAAONgFuLQz9U3MLM0zlHiArHSy7PKDZK1JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIlYBl6zEvPR8hdC85IzEzLzUlB2sjABpZ99pSAAAAA&sa=X&ved=2ahUKEwj2sI-Ela__AhUFp5UCHU5HCQEQgOQBegQILBAK',
    categories: [{ id: '1' }],
  },
  {
    title: 'The Hateful Eight',
    description:
      'A bounty hunter and his captured fugitive are caught in the middle of a snowstorm. They seek refuge at a small lodge and encounter a twisted turn of events there.',
    url: 'https://www.google.com/search?sxsrf=APwXEdcTu9Wem3D-rV5ng5c39gntLJjxtQ:1686072367247&q=Reservoir+Dogs&stick=H4sIAAAAAAAAAONgFuLQz9U3MLM0zlHiArGMMkzMTC20JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIla-oNTi1KKy_MwiBZf89OIdrIwAwr8LL0YAAAA&sa=X&ved=2ahUKEwj2sI-Ela__AhUFp5UCHU5HCQEQgOQBegQILBAO',
    categories: [{ id: '1' }],
  },
  {
    title: 'Reservoir Dogs',
    description:
      "Six criminals, hired to steal diamonds, do not know each other's true identity. While attempting the heist, the police ambushes them, leading them to believe that one of them is an undercover officer.",
    url: '',
    categories: [{ id: '1' }],
  },
  {
    title: 'In the Mood for Love',
    description:
      "In 1962, journalist Chow Mo-wan (Tony Leung Chiu Wai) and his wife move into a Hong Kong apartment, but Chow's spouse is often away on business. Before long, the lonely Chow makes the acquaintance of the alluring Su Li-zhen (Maggie Cheung Man-yuk), whose own significant other also seems preoccupied with work. As the two friends realize their respective partners are cheating on them, they begin to fall for one another; however, neither wants to stoop to the level of the unfaithful spouse",
    url: 'https://www.google.com/search?sa=X&biw=1600&bih=827&sxsrf=APwXEdclmx45w5OXG98jXeUNKWKFv3EN9g:1686072866594&q=In+the+Mood+for+Love&stick=H4sIAAAAAAAAAONgFuLUz9U3MEwzL4tXgjItTLO1JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIlYRzzyFkoxUBd_8_BSFtPwiBZ_8stQdrIwAY2xnHEwAAAA&ved=2ahUKEwiJi53ylq__AhVmt5UCHYdlA_8QgOQBegQILhAE',
    categories: [{ id: '1' }],
  },
  {
    title: 'Chungking Express',
    description:
      "Every day, Cop 223 (Takeshi Kaneshiro) buys a can of pineapple with an expiration date of May 1, symbolizing the day he'll get over his lost love. He's also got his eye on a mysterious woman in a blond wig (Brigitte Lin), oblivious of the fact she's a drug dealer. Cop 663 (Tony Leung Chiu Wai) is distraught with heartbreak over a breakup. But when his ex drops a spare set of his keys at a local cafe, a waitress (Faye Wong) lets herself into his apartment and spruces up his life",
    url: 'https://www.google.com/search?sa=X&biw=1600&bih=827&sxsrf=APwXEdclmx45w5OXG98jXeUNKWKFv3EN9g:1686072866594&q=Chungking+Express&stick=H4sIAAAAAAAAAONgFuLUz9U3MEwzL4tXgjIt0qu0JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIlZB54zSvPTszLx0BdeKgqLU4uIdrIwAN9bg-kkAAAA&ved=2ahUKEwiJi53ylq__AhVmt5UCHYdlA_8QgOQBegQILhAG',
    categories: [{ id: '1' }],
  },
  {
    title: 'Fallen Angels',
    description:
      'An assassin, his boss, an entrepreneur and two women cross paths in Hong Kong as their professional and love lives collide and influence each other, mostly without their knowledge.',
    url: 'https://www.google.com/search?sa=X&biw=1600&bih=827&sxsrf=APwXEdclmx45w5OXG98jXeUNKWKFv3EN9g:1686072866594&q=Fallen+Angels+1995&stick=H4sIAAAAAAAAAONgFuLUz9U3MEwzL4tXAjONKipMirUkspOt9AtS8wtyUoFUUXF-nlVufllmavEiViG3xJyc1DwFx7z01JxiBUNLS9MdrIwA_nAvhEoAAAA&ved=2ahUKEwiJi53ylq__AhVmt5UCHYdlA_8QgOQBegQILhAI',
    categories: [{ id: '1' }],
  },
  {
    title: 'The Wind Rises',
    description:
      'A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane',
    url: 'https://www.google.com/search?sa=X&biw=1600&bih=827&sxsrf=APwXEdf0qtapGHEaHxv1-JNHXswzV1Hjiw:1686073039754&q=The+Wind+Rises&stick=H4sIAAAAAAAAAONgFuLUz9U3MDQ2yE5W4gIx89LKDcpztNQ88tPLM3NSAoryU0qTSzLz85zzcwsS8zJTi90yc3KLQ_LB1CJWvpCMVIXwzLwUhaDM4tTiHayME9gYAVmwE8pYAAAA&lei=z25_ZJjTLevu1sQPt6aLwAg',
    categories: [{ id: '1' }],
  },
  {
    title: 'Grave of the Fireflies',
    description:
      'A devastating meditation on the human cost of war, this animated tale follows Seita (Tsutomu Tatsumi), a teenager charged with the care of his younger sister, Setsuko (Ayano Shiraishi), after an American firebombing during World War II separates the two children from their parents. Their tale of survival is as heartbreaking as it is true to life. The siblings rely completely on each other and struggle against all odds to stay together and stay alive.',
    url: 'https://www.google.com/search?sa=X&biw=1600&bih=827&sxsrf=APwXEdf0qtapGHEaHxv1-JNHXswzV1Hjiw:1686073039754&q=Grave+of+the+Fireflies&stick=H4sIAAAAAAAAAONgFuLUz9U3MDQ2yE5WgjAtyovLtdQ88tPLM3NSAoryU0qTSzLz85zzcwsS8zJTi90yc3KLQ_LB1CJWMfeixLJUhfw0hZKMVAW3zKLUtBygoh2sjBPYGAE0C04kXwAAAA&lei=025_ZOjPNr7U1sQPu5CNmAg',
    categories: [{ id: '1' }],
  },
]

export default class VideoSeeder extends PrismaSeederBase {
  public static developmentOnly = true

  public async run() {
    const promises = movies.map(async (movie) => {
      return prisma.movie.upsert({
        where: { title: movie.title },
        update: {},
        create: {
          title: movie.title,
          description: movie.description,
          url: movie.url,
          free: movie.free,
          categories: { connect: movie.categories },
        },
      })
    })

    await Promise.all(promises)

    await prisma.movie.update({
      where: { title: 'The Godfather' },
      data: { id: '1' },
    })
  }
}
