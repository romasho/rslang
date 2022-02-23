import { Container, Typography } from "@mui/material";
import React from "react";
import { IAggregatedWords, IWordAggr } from "../../interfaces/requestsInterfaces";
import { getUserAggregatedWords } from "../../utils/services";
import { loadState } from "../../utils/state";
import DictWord from "./DictWord";

function Dictionary() {
  const flag = true;
  const [data, setData] = React.useState<null | IWordAggr[]>(null)
  const userId = loadState().auth?.id as string;

  React.useEffect(() => {
    setData(null)
    const filter = '{"$and":[{"userWord.difficulty":"hard"}]}'

    getUserAggregatedWords({ id: userId, filter, wordsPerPage: 200 }).then(res => {
      if (!res) return;
      const { paginatedResults } = res[0] as IAggregatedWords;

      setData(paginatedResults)
    })
  }, [flag])

  return data ? (
    <Container>
      {data.length > 0 ?
        (<div>
          {data.map((item) => (
            <DictWord data={item} key={item.word} />
          ))}
        </div>) : (
          <Typography>Dictionary is emty</Typography>
        )
      }

    </Container>
  ) : (
    <p>loading...</p>
  )

}

export default Dictionary;