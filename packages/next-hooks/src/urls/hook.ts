export const hookTemp = `
import { useMemo } from "react";
import { Urls } from "./urls.ssr";

export const useUrls = () => useMemo(() => Urls(), []);
`;
