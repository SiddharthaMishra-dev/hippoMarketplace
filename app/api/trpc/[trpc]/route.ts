import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    //@ts-expect-error context already passed by express middleware
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
