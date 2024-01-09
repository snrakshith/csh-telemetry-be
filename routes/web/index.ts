import express from "express";
// import sha1 from 'sha1';

import { DocFormat } from "shared/constants/enums";
import { apiLimiter } from "shared/middlewares/apiLimiter";
import { apiMiddleware } from "shared/middlewares/apiMiddleware";

// At the /v1 route
const publicRouter = express.Router();

publicRouter.post("/document", apiLimiter, apiMiddleware, async (req, res) => {
  return res.status(400).send({
    error:
      "The Mintlify API is currently being updated. Please email hi@mintlify for urgent authorization",
  });
  // const { hashedKey } = res.locals;
  // const { code, commented, language, format, context } = req.body;

  // if (!code) {
  //   return res.status(400).send({error: 'No code provided'});
  // }

  // const body = {
  //   code,
  //   languageId: language,
  //   commented: commented || false,
  //   userId: hashedKey,
  //   docStyle: format || 'Auto-detect',
  //   context: context || code,
  //   source: 'api',
  // }

  // try {
  //   const { docstring } = await getDocument(body);
  //   return res.status(200).send({documentation: docstring});
  // } catch {
  //   return res.status(400).send({error: 'Error generating documentation from code'});
  // }
});

publicRouter.get(
  "/list/languages",
  apiLimiter,
  apiMiddleware,
  async (_, res) => {
    const languages = [
      "python",
      "javascript",
      "typescript",
      "javascriptreact",
      "typescriptreact",
      "php",
      "c",
      "cpp",
    ];
    return res.status(200).send({ languages });
  }
);

publicRouter.get("/list/formats", apiLimiter, apiMiddleware, async (_, res) => {
  const formats = [
    {
      id: DocFormat.JSDoc,
      defaultLanguages: [
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact",
      ],
    },
    {
      id: DocFormat.ReST,
      defaultLanguages: ["python"],
    },
    {
      id: DocFormat.DocBlock,
      defaultLanguages: ["php", "c", "cpp"],
    },
    {
      id: DocFormat.Google,
      defaultLanguages: [],
    },
  ];
  return res.status(200).send({ formats });
});

export default publicRouter;
