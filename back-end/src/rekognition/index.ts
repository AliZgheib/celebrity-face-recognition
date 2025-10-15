import {
  RekognitionClient,
  RecognizeCelebritiesCommand,
} from "@aws-sdk/client-rekognition";
import { APIGatewayProxyEvent } from "aws-lambda";

const baseHandler = async (event: APIGatewayProxyEvent) => {
  try {
    if (!event.body) {
      return new Error("body is required");
    }

    const { imageBase64 } = JSON.parse(event.body);

    console.log("imageBase64", imageBase64);

    if (!imageBase64) {
      return new Error("imageBase64 is a required");
    }
    const rekognitionClient = new RekognitionClient({});

    const command = new RecognizeCelebritiesCommand({
      Image: { Bytes: Uint8Array.from(Buffer.from(imageBase64, "base64")) },
    });

    const response = await rekognitionClient.send(command);

    const { CelebrityFaces, UnrecognizedFaces } = response;

    return {
      celebrityFaces: CelebrityFaces ? CelebrityFaces : [],
      unrecognizedFaces: UnrecognizedFaces ? UnrecognizedFaces : [],
    };
  } catch (error) {
    console.log(error);

    return new Error("Something went wrong");
  }
};

const main = async (event: any) => {
  const response = await baseHandler(event);

  if (response instanceof Error) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: response.message,
      }),
      statusCode: 400,
    };
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(response),
    statusCode: 200,
  };
};

module.exports = { main };
