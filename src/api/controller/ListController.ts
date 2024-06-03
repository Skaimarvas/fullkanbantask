import { listGetType } from "@/interfaces/List";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getListQuery = () =>
  useQuery({
    queryKey: ["list"],
    queryFn: () => getListRequest(),
  });

export const getListRequest = (): Promise<listGetType> =>
  axios.get(`/list`).then((res) => res.data);
