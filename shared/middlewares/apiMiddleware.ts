import ApiKey from "models/writer/ApiKey";

export const apiMiddleware = async (req, res, next) => {
  const key = req.get("API-KEY");
  if (key == null) {
    return res.status(401).send({ error: "No API key provided" });
  }

  const cleanKey = key.trim();
  // const hashedKey = sha1(cleanKey);
  const hashedKey = cleanKey;
  const exists = await ApiKey.exists({ hashedKey });

  if (!exists) {
    return res.status(401).send({ error: "Invalid API key" });
  }

  res.locals.hashedKey = hashedKey;
  next();
};
