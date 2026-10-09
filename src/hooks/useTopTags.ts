import { useQuery } from "@tanstack/react-query";
import { getTopTags } from "../services/lastfm";
import { mapLastFmTopTag } from "../services/mappers";

export function useTopTags() {
  return useQuery<string[]>({
    queryKey: ["topTags"],
    queryFn: async ({ signal }) => {
      const tags = await getTopTags(signal);

      return tags.map(mapLastFmTopTag);
    },
  });
}
