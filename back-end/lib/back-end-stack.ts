import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

export class BackEndStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // API Gateway
    const api = new apigateway.RestApi(this, "rekognition-api", {
      description: "Celebrity Recognition API",
      deployOptions: { stageName: "dev" },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Lambda Function
    const rekognitionLambda = new lambda.Function(this, "rekognition-lambda", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.main",
      code: lambda.Code.fromAsset("src/rekognition"),
      timeout: cdk.Duration.seconds(29),
      initialPolicy: [
        new iam.PolicyStatement({
          actions: ["rekognition:RecognizeCelebrities"],
          resources: ["*"],
        }),
      ],
    });

    // API Route
    api.root
      .addResource("rekognition")
      .addMethod("POST", new apigateway.LambdaIntegration(rekognitionLambda));
  }
}
