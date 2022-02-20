// import { IAggregatedWords } from "../../../../interfaces/requestsInterfaces";
import { IAggregatedWords } from "../../../../interfaces/requestsInterfaces";
import { getUserAggregatedWords, getUserWords } from "../../../../utils/services";
import { loadState } from "../../../../utils/state";
// import { getUserAggregatedWords } from "../../utils/services";

export function getWordsOfUser() {
  const memory = loadState().auth;

  return memory ? getUserWords(memory.id) : null;
}

export async function isLearndedPage() {
  const filter = '{"$and":[{"userWord.difficulty":"easy", "userWord.optional.isLearned": true}]}'
  const userId = loadState().auth?.id as string;

  const res = await getUserAggregatedWords({ id: userId, filter })

  if (!res) return false;
  const { paginatedResults } = res[0] as IAggregatedWords;

  return paginatedResults.length === 20;
}
// export default getWordsOfUser;