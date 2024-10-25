export const MONGO_CONFIG = {
  uri: Deno.env.get("MONGO_URI") || "",
  dbName: Deno.env.get("MONGO_DATABASE") || "",
}

export const AWS_S3_CONFIG = {
  accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
  secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
  region: Deno.env.get("AWS_REGION") || "",
  bucket: Deno.env.get("AWS_BUCKET") || "",
}
