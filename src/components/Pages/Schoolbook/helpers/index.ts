import { IAggregatedWords } from "../../../../interfaces/requestsInterfaces";
import { IBookState } from "../../../../interfaces/schoolbookInterfaces";
import { getUserAggregatedWords, getUserWords } from "../../../../utils/services";
import { loadState } from "../../../../utils/state";

export function getWordsOfUser() {
  const memory = loadState().auth;

  return memory ? getUserWords(memory.id) : null;
}

export async function isLearndedPage(state: IBookState) {
  const { chapter, page, isDict } = state;
  if (isDict) return 0;

  const filter = `{"$and":[{"group": ${chapter}, "page": ${page},"userWord.difficulty":"easy", "userWord.optional.isLearned": true}]}`
  const userId = loadState().auth?.id as string;

  const res = await getUserAggregatedWords({ id: userId, filter })

  if (!res) return false;

  const { totalCount } = res[0] as IAggregatedWords;

  return totalCount[0].count;
}