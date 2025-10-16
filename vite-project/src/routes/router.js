// File: src/routes/router.js

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/Quote")

                return component.default
            }
        }
    },
    {
        path: "/new-quote",
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/CreateQuote")

                return component.default
            }
        }
    },
    {
        path: "/update-quote/:id", 
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/UpdateQuote")

                return component.default
            }
        }
    },
]);

export default router;