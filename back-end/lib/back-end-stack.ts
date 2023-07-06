import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as path from "path";

import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import { Duration } from "aws-cdk-lib";

export class BackEndStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new apigateway.RestApi(this, "my-api", {
      description: "api gateway",
      deployOptions: {
        stageName: "dev",
      },
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, "apiUrl", { value: api.url });

    // 👇 define the lambda function
    const rekognitionLambda = new lambda.Function(this, "rekognition-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.main",
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/rekognition")),
      timeout: Duration.seconds(10),
    });

    // 👇 create a policy statement
    const rekognitionLambdaPolicy = new iam.PolicyStatement({
      actions: ["rekognition:RecognizeCelebrities"],
      resources: ["*"],
    });

    // 👇 add the policy to the Function's role
    rekognitionLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "rekognition-lambda-policy", {
        statements: [rekognitionLambdaPolicy],
      })
    );

    // 👇 add a /rekognition resource
    const rekognitionResource = api.root.addResource("rekognition");

    // 👇 integrate POST /rekognition with rekognitionLambda
    rekognitionResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(rekognitionLambda, { proxy: true })
    );
  }
}
